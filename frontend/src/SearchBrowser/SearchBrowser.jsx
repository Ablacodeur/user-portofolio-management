import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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
    <div>
      <h2>Résultats pour : "{searchText}"</h2>
      {filteredList.length === 0 ? (
        <p>Aucun profil trouvé.</p>
      ) : (
        filteredList.map((p) => (
          <div key={p.id}>
            <h3>{p.sudoname}</h3>
            <p>{p.job}</p>
          </div>
        ))
      )}
    </div>
  );
}
