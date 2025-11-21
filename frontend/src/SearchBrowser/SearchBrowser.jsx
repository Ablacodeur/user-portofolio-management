import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import SearchProfilCard from "../SearchProfilCard/SearchProfilCard";

export default function SearchBrowser() {
  const location = useLocation();
  const profils = useSelector((store) => store.PROFILE.profilList);

  // 👇 récupère le texte envoyé depuis navigate()
  const searchText = location.state?.searchText || "";
  console.log("Texte de recherche reçu :", searchText);
  const filteredList = profils.filter((profil) =>
    profil.sudoname.toUpperCase().includes(searchText.trim().toUpperCase())
  );

  console.log("Résultats filtrés :", filteredList);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f1eded, #767CE8, #e3e5ed)",
        maxHeight: "110vh", 
       
      }}
    >
    <NavBar />
      <Box sx={{ justifyContent:"center",textAlign:"center",alignItems:'center',height:'80vh' ,flexDirection:'row', display:'flex', gap:'20px' }}>
      {filteredList.length === 0 ? (
        <h4>Aucun profil trouvé a ce nom. <Link to="/">Retour à la page d'accueil</Link></h4>
      ) : (
        filteredList.map((p) => (
          <SearchProfilCard key={p.id} profil={p}/>
        ))
      )}
      </Box>
      <Footer />
    </Box>
  );
}
