import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' });
import express from "express";
import cors from "cors";
import pkg from "pg"; 
const { Pool } = pkg; 
import bcrypt from 'bcrypt';
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GitHubStrategy from "passport-github2";
import fetch from "node-fetch";


const app = express();
const saltRounds = 10;
// CORS : autoriser le frontend déployé sur Vercel à accéder à l'API


const corsOptions = {
  origin: ['http://localhost:5173', 'https://project-list-inky.vercel.app'], // Frontend local et déployé
  credentials: true, // Autoriser les cookies et les sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

app.use(cors(corsOptions));

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: 'GET,POST,DELETE',
//   allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés

// };
// app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 jour
    httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
    secure: false, // Utiliser HTTPS en production
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get("/portofolio", (req, res) => {
  console.log(req.user);

  if (req.isAuthenticated()) {
    res.redirect("http://localhost:5173/portofolio");
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
      res.redirect("http://localhost:5173/portofolio");
    });
  }
);
app.get("/me", (req, res) => {
  console.log("Requête reçue pour /me :", req.user);
  console.log("Session actuelle :", req.session);
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: "Non authentifié" });
  }
});

// Connexion PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// ✅ Routes for the registration/

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

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

app.get("/projects", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM project");
    res.json(result.rows);    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la récupération des tâches");
  }
});

app.post("/projects", async (req, res) => {
  const { id, name, description, status, icon, statusicon } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    const existingTask = await pool.query("SELECT * FROM project WHERE id = $1", [id]);

    if (existingTask.rows.length > 0) {
      const updatedTask = await pool.query(
        `UPDATE project 
         SET name = $1, description = $2, status = $3, icon = $4, statusicon = $5
         WHERE id = $6
         RETURNING *`,
        [name, description, status, icon, statusicon, id]
      );
      return res.status(200).json(updatedTask.rows[0]);
    } else {
      const newTask = await pool.query(
        `INSERT INTO project (name, description, status, icon, statusicon) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, description, status, icon, statusicon]
      );
      return res.status(201).json(newTask.rows[0]);
    }
  } catch (error) {
    console.error("Erreur SQL :", error);
    res.status(500).send("Erreur lors de l'ajout ou de la mise à jour de la tâche.");
  }
});

// app.delete("/projects/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleteResult = await pool.query('DELETE FROM project WHERE id = $1', [id]);
//     if (deleteResult.rowCount === 0) {
//       return res.status(404).json({ error: "Tâche non trouvée" });
//     }
//     res.status(200).json({ message: "Tâche supprimée avec succès" });
//   } catch (error) {
//     console.error("Erreur lors de la suppression :", error);
//     res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
//   }
// });

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
      callbackURL: "http://localhost:5000/auth/github/callback",
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
// passport.serializeUser((user, cb)=> {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb)=> {
//   cb(null, user);
// });
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
