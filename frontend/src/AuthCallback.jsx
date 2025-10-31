import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user-project/userSlice";

import axios from "axios";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔹 1. Récupère le token dans l'URL
    const hash = window.location.hash; 
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const token = params.get("token");

    if (!token) {
      console.error("Aucun token trouvé dans l'URL");
      navigate("/signin");
      return;
    }

    // 🔹 2. Sauvegarde le token JWT dans le localStorage
    localStorage.setItem("auth_token", token);

    // 🔹 3. Appelle /me pour récupérer l'utilisateur connecté
    axios.get(`${import.meta.env.VITE_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        dispatch(setUser(res.data)); // 🔹 Sauvegarde dans Redux
        navigate("/portofolio"); // 🔹 Redirige après connexion réussie
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération du profil :", err);
      navigate("/signin");
    });
  }, [navigate, dispatch]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#333",
        fontFamily: "monospace"
      }}
    >
      <p>Connexion à GitHub en cours...</p>
    </div>
  );
}
