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


const app = express();
const saltRounds = 10;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {  
      maxAge: 1000 * 60 * 60 * 24 // Durée de vie du cookie (1 jour)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/portofolio", (req, res) => {
  console.log(req.user);

  if (req.isAuthenticated()) {
    res.redirect("http://localhost:5173/portofolio");
  } else {
    res.status(401).send("Vous n'êtes pas connecté");
  }
});





// CORS : autoriser le frontend déployé sur Vercel à accéder à l'API
const allowedOrigins = [
  'https://project-list-inky.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,DELETE',
};
app.use(cors(corsOptions));
app.use(express.json());

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
    const checkResult = await pool.query("SELECT * FROM connection WHERE email=$1 ",
      [email]);
      if(checkResult>0){
        res.send('Email already exist.  Try logging in')
      }else{
        // Hash the password
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          const result = await pool.query(
          "INSERT INTO connection (email, password) VALUES($1, $2)",
          [email,hash]);
          console.log("creation reussie");
        });
      }

  } catch (error) {
    console.log(error);
    
  }
});

// ✅ Routes for the logging
app.post("/signin", (req, res, next) => {
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

//copie des  elements du signing ou login dans la strategie
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

passport.serializeUser((user, cb)=> {
  cb(null, user);
});

passport.deserializeUser((user, cb)=> {
  cb(null, user);
});


// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
