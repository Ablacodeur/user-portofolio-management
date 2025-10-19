import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' });
import express from "express";
import cors from "cors";
import pkg from "pg"; 
import bcrypt from 'bcrypt';
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GitHubStrategy from "passport-github2";
import fetch from "node-fetch";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url'; 

// Convertir `import.meta.url` en chemin de fichier
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Variables d'environnement :", process.env);



const app = express();
const saltRounds = 10;
const upload = multer({ dest: "uploads/" }); // Dossier où les fichiers  images  seront stockés
// CORS : autoriser le frontend déployé sur Vercel à accéder à l'API

const allowedOrigins = [
  "http://localhost:5173",
  "https://user-portofolio-management.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  console.log(`Origine de la requête : ${req.headers.origin}`);
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 jour
    httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
    secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
    sameSite: "none" 
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


// Configuration pour servir les fichiers statiques
const uploadsPath = path.resolve(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
  }
}));
console.log("🗂️  Dossier statique servi depuis :", uploadsPath);

app.get("/portofolio", (req, res) => {
  console.log(req.user);

  if (req.isAuthenticated()) {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"; 
    res.redirect(`${frontendUrl}/portofolio`);
  } else {
    res.status(401).send("Vous n'êtes pas connecté");
  }
});
// Route pour rediriger vers GitHub
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

// Route de callback après l'authentification GitHub
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/signin" }),
  (req, res) => {
    console.log("Utilisateur authentifié via GitHub :", req.user);

    // Sauvegarder explicitement la session avant de rediriger
    req.session.save((err) => {
      if (err) {
        console.error("Erreur lors de la sauvegarde de la session :", err);
        return res.status(500).send("Erreur serveur");
      }
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"; // Utilise une variable d'environnement ou une valeur par défaut
      res.redirect(`${frontendUrl}/portofolio`);
    });
  }
);app.get("/me", (req, res) => {
  console.log("Requête reçue pour /me :", req.user);
  console.log("Session actuelle :", req.session);
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: "Non authentifié" });
  }
});

// Connexion PostgreSQL
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
// ✅ Routes for the registration/

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log("Utilisateur connecté :", req.user);

  if (!req.user) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  const userId = req.user.id;
  console.log("ID de l'utilisateur connecté :", userId)

  try {
    // Vérifier si l'utilisateur existe déjà
    const checkResult = await pool.query("SELECT * FROM connection WHERE email=$1", [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists. Try logging in." });
    }

    // Hacher le mot de passe
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Erreur lors du hachage du mot de passe :", err);
        return res.status(500).json({ message: "Erreur serveur lors du hachage du mot de passe." });
      }

      // Insérer l'utilisateur dans la base de données
      const result = await pool.query(
        "INSERT INTO connection (email, password) VALUES($1, $2) RETURNING *",
        [email, hash]
      );
      const user = result.rows[0];

      // Connecter l'utilisateur
      req.login(user, (err) => {
        if (err) {
          console.error("Erreur lors de la connexion de l'utilisateur :", err);
          return res.status(500).json({ message: "Erreur serveur lors de la connexion de l'utilisateur." });
        }

        console.log("Création réussie et utilisateur connecté");
        return res.status(201).json({ message: "User registered and logged in successfully", user });
      });
      });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        return res.status(500).json({ message: "Erreur serveur." });
      }
  });
// ✅ Routes for the logging
app.post("/signin", (req, res, next) => {
  console.log("Requête reçue pour /signin :", req.body);
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.error("Erreur lors de l'authentification :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (!user) {
      console.log("Échec de la connexion");
      return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Erreur lors de la connexion de l'utilisateur :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }
      console.log("Connexion réussie");
      return res.status(200).json({ message: "Connexion réussie", user });
    });
  })(req, res, next);
});
// ✅ Routes for the project

app.get("/getproject", async (req, res) => {
  const {user_id}=req.query; //utilsation de point query car je suis dans une requte  GET FIAS QUE JE PREND LE PARAMS
  console.log("User ID reçu :", user_id);
  
  try {
    const result = await pool.query("SELECT * FROM project WHERE user_id = $1", [user_id]);
    res.json(result.rows);    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la récupération des tâches");
  }});

app.post("/projects", upload.single("project_image"), async (req, res) => {
  const { project_name, demo_url, repo_url, description, user_id } = req.body;
  console.log("Requête complète reçue :", req.body);
  console.log("Type de user_id :", typeof req.body.user_id);
  console.log("Valeur brute de user_id :", req.body.user_id);
  // Vérifiez si le fichier a été correctement reçu
  const project_image = req.file ? `/uploads/${req.file.filename}` : null; // Nom du fichier téléchargé

  // if (!project_image) {
  //   console.error("Erreur : Aucun fichier image téléchargé.");
  //   return res.status(400).json({ error: "Aucun fichier image téléchargé. Veuillez ajouter une image." });
  // }

  console.log("Nom du fichier téléchargé :", project_image);

  if (!project_name || !demo_url) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }
  // Convertir `user_id` en entier
  const userId = Array.isArray(user_id) ? parseInt(user_id[0], 10) : parseInt(user_id, 10);
  console.log("ID de l'utilisateur connecté (entier) :", userId);
  try {
    // Vérifiez si un projet avec le même nom existe déjà
    const existingName = await pool.query("SELECT * FROM project WHERE project_name = $1", [project_name]);
    const existingRepo = await pool.query("SELECT * FROM project WHERE repo_url = $1", [repo_url]);

    if (existingName.rows.length > 0 && existingRepo.rows.length > 0) {
      // Mettre à jour le project existant
      const updatedProject = await pool.query(
        `UPDATE project 
         SET demo_url = $1, description = $2, project_image = COALESCE($3, project_image) , repo_url = $5
         WHERE project_name = $4
         RETURNING *`,
        [demo_url, description, project_image, project_name, repo_url]
      );
      console.log("Projet mis à jour :", updatedProject.rows[0]);
      return res.status(200).json(updatedProject.rows[0]); 
    }

    // Insérer un nouveau projet
    const newProject = await pool.query(
      `INSERT INTO project (project_name, demo_url, repo_url, description, project_image, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6)        
       RETURNING *`,
      [project_name, demo_url, repo_url, description, project_image, userId]
    );

    console.log("Nouveau projet ajouté :", newProject.rows[0]);
    return res.status(201).json(newProject.rows[0]);
  } catch (error) {
    console.error("Erreur SQL :", error);
    res.status(500).send("Erreur lors de l'ajout du projet.");
  }
});
//profil routes

app.get("/getprofil", async (req, res) => {
  const {user_id}=req.query; //utilsation de point query car je suis dans une requte  GET FIAS QUE JE PREND LE PARAMS
  console.log("User ID reçu :", user_id);
  
  try {
    const result = await pool.query("SELECT * FROM profils WHERE user_id = $1", [user_id]);
    res.json(result.rows);    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la récupération des tâches");
  }
});

app.post("/profil", upload.single("profil_image"), async (req, res) => {
  const { email, job, sudoname, about_you, user_id } = req.body;
  console.log("ID de l'utilisateur connecté :", user_id);
  const profil_image = req.file ? `/uploads/${req.file.filename}` : null; // URL de l'image
  console.log("Nom du fichier téléchargé :", profil_image);

  if (!sudoname || !about_you) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    // Vérifiez si un profil avec le même email ou sudoname existe déjà
    const existingSudo = await pool.query("SELECT * FROM profils WHERE sudoname = $1", [sudoname]);
    const existingEmail = await pool.query("SELECT * FROM profils WHERE email = $1", [email]);

    if (existingSudo.rows.length > 0 && existingEmail.rows.length > 0) {
      // Mettre à jour le profil existant
      const updatedProfil = await pool.query(
        `UPDATE profils 
         SET job = $1, about_you = $2, profil_image = $3 ,sudoname = $4
         WHERE email = $5 
         RETURNING *`,
        [job, about_you, profil_image, sudoname, email]
      );
      console.log("Profil mis à jour :", updatedProfil.rows[0]);
      return res.status(200).json(updatedProfil.rows[0]);
    }

    // Insérer un nouveau profil si aucun n'existe
    const newProfil = await pool.query(
      `INSERT INTO profils (email, job, sudoname, about_you, profil_image, user_id)   
       VALUES ($1, $2, $3, $4, $5, $6)        
       RETURNING *`,
      [email, job, sudoname, about_you, profil_image, user_id]
    );
    console.log("Nouveau profil ajouté :", newProfil.rows[0]);
    return res.status(201).json(newProfil.rows[0]);
  } catch (error) {
    console.error("Erreur SQL :", error);
    res.status(500).send("Erreur lors de l'ajout ou de la mise à jour du profil.");
  }
});

app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResult = await pool.query('DELETE FROM project WHERE id = $1', [id]);
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
  }
});

//copie des  elements du signing ou login dans la strategie AKA local strategy
passport.use(new Strategy( async function verify(username,  password, cb){
  console.log("username", username);  
  
  try {
    const result = await pool.query("SELECT * FROM connection WHERE email=$1", 
    [username]);
    if (result.rows.length >0) {
    const user = result.rows[0];
    const storedPassword = user.password;
    
    // Compare the password with the hashed password in the database
    bcrypt.compare(password, storedPassword, async(err, result) => {
      if (err) {
        return cb(err);
      }
       else {
        if (result) {
          console.log("Mot de passe valide");
          return cb(null, user);
          
          } else {
          return cb(null, false);
          }
      }
    }
    );
    } else{
        return cb("User not found");
    } ;   

    } catch (error) {
      return cb(error);
    }

}))

// Configurer la stratégie GitHub
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://user-portofolio-management-production.up.railway.app/auth/github/callback"
    : "http://localhost:5000/auth/github/callback"

    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Récupérer l'email principal si `profile.emails` est vide
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) {
          const emailResponse = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const emails = await emailResponse.json();
          email = emails.find((e) => e.primary && e.verified)?.email || null;
        }

        if (!email) {
          console.error("Aucune adresse e-mail trouvée pour cet utilisateur GitHub.");
          return cb(new Error("Aucune adresse e-mail disponible"), null);
        }

        // Vérifiez si l'utilisateur existe déjà dans la base de données
        const result = await pool.query("SELECT * FROM connection WHERE email=$1", [email]);

        if (result.rows.length > 0) {
          // L'utilisateur existe déjà
          return cb(null, result.rows[0]);
        } else {
          // Insérez un nouvel utilisateur dans la base de données
          const newUser = await pool.query(
            "INSERT INTO connection (email, password) VALUES ($1, $2) RETURNING *",
            [email, null] // Pas de mot de passe pour les utilisateurs GitHub
          );
          return cb(null, newUser.rows[0]);
        }
      } catch (error) {
        console.error("Erreur lors de l'authentification GitHub :", error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Sérialisation de l'utilisateur :", user);
  cb(null, user.id); // Stocke uniquement l'ID utilisateur dans la session
});
passport.deserializeUser(async (id, cb) => {
  console.log("Désérialisation de l'utilisateur avec l'ID :", id);
  try {
    const result = await pool.query("SELECT * FROM connection WHERE id=$1", [id]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log("Utilisateur trouvé :", user);
      cb(null, user); // Passe l'utilisateur désérialisé à Passport
    } else {
      cb(new Error("Utilisateur non trouvé"), null);
    }
  } catch (error) {
    console.error("Erreur lors de la désérialisation :", error);
    cb(error, null);
  }
});
//Logout 
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Erreur lors de la déconnexion :", err);
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la destruction de la session :", err);
        return res.status(500).json({ message: "Erreur lors de la destruction de la session" });
      }
      res.clearCookie("connect.sid"); // Supprime le cookie de session
      return res.status(200).json({ message: "Déconnexion réussie" });
    });
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
