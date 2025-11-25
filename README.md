📁 User Portfolio Management (UPM)

# 📸 Aperçu du Projet

Voici un aperçu visuel de l'application **User Portfolio Management (UPM)** :

<p align="center">
  <img src="https://raw.githubusercontent.com/Ablacodeur/user-portofolio-management/main/frontend/src/assets/resources/readme_img.png" 
       alt="User Portfolio Management Preview" 
       width="800" />
</p>

User Portfolio Management est une application complète permettant aux utilisateurs de créer, gérer et afficher un portfolio professionnel en ligne.
Le projet inclut :

une interface publique (profile page statique personnalisée),

un dashboard utilisateur,

une gestion des projets,

une authentification sécurisée (Google, GitHub, email/password),

l’upload et la compression d’images via Cloudinary.

## 🚀 Fonctionnalités principales
### 🔐 Authentification & Sécurité

Login avec Google OAuth

Login avec GitHub OAuth

Login classique (email + mot de passe)

Sessions sécurisées (httpOnly, secure, sameSite: none)

Cookies de session persistants

### 👤 Gestion des profils

Création et modification du profil

Upload / mise à jour de la photo de profil

Champs personnalisés :

job (Singer, Developer, Designer, Photographer…)

pseudo (sudoname)

bio (about_you)

email

Compression automatique de l’image

### 📁 Gestion des projets

Création d’un projet (image, name, demo URL, repo URL, description)

Modification d’un projet

Suppression d’un projet

Association User → Profil → Projets

API REST complète

### 🌍 Page Portfolio publique

Chaque utilisateur possède une page publique :
/portfolio/:profil_id

Elle affiche :

photo

job

bio (avec bouton Lire plus / Lire moins)

liste filtrée des projets

design moderne entièrement responsive

☁️ Cloudinary

Upload des images (profil + projets)

Compression automatique

Support des URLs sécurisées

Transformation des images selon l'environnement

## 🧱 Stack utilisée
Frontend

React 

Vite

Redux Toolkit

MUI Joy UI

Swiper.js

Axios

React Router DOM

Backend

Node.js + Express

PostgreSQL (Railway)

Multer pour l’upload

Cloudinary SDK

Passport.js (Google & GitHub)

bcrypt pour le hash des mots de passe

Déploiement

💻 Frontend : Vercel

🛠 Backend : Railway

🗄 PostgreSQL : Railway Database

🔧 Installation & Lancement
1️⃣ Clone du repo
git clone https://github.com/ton-repo/user-portfolio-management.git
cd user-portfolio-management

📦 Backend
2️⃣ Installation des dépendances
cd backend
npm install

Variables d’environnement (Backend)

Créer .env :

NODE_ENV=development

DATABASE_URL=postgresql://...
FRONTEND_URL=http://localhost:5173

SESSION_SECRET=TON_SECRET_Ici

GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

3️⃣ Lancer le serveur
npm run dev

🎨 Frontend
4️⃣ Installation des dépendances
cd frontend
npm install

Variables d’environnement (Frontend)

Créer .env :

VITE_API_URL=http://localhost:5000

5️⃣ Lancer le front
npm run dev

This is a solution to:(https:/https://devchallenges.io/challenge/user-portfolio-management). 


## 🧑‍💻 Auteur

Victoire Agboli (Full-Stack Developer)
Projet créé avec passion et perfectionnisme, déployé en production.