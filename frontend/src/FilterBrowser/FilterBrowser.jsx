import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import SearchProfilCard from "../SearchProfilCard/SearchProfilCard";
import { FilterBar } from "../FilterBar/FilterBar";
import { SearchBar } from "../SearchBar/SearchBar";

export default function FilterBrowser() {
  const location = useLocation();
  const profils = useSelector((store) => store.PROFILE.profilList);

  // 👇 récupère le texte envoyé depuis navigate()
  const category = location.state?.category|| "";
  console.log("categorie reçu :", category);
const filterList = profils.filter((profil) =>
  (profil.job || "").toUpperCase().includes(category.trim().toUpperCase())
);

  console.log("Résultats filtrés :", filterList);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f1eded, #767CE8, #e3e5ed)",
        maxHeight: "110vh", 
       
      }}
    >
    <NavBar/>
      <Box sx={{ justifyContent:"center",textAlign:"center",alignItems:'center',height:'85vh' ,flexDirection:'row', display:'flex', gap:'20px' }}>
      {filterList.length === 0 ? (
        <h4>Aucun artiste trouvé pour cette categorie   <Link to="/">Retour à la page d'accueil</Link></h4>
      ) : (
        filterList.map((p) => (
          <SearchProfilCard key={p.id} profil={p} />
        ))
      )}
      </Box>
      <Footer />
    </Box>
  );
}
