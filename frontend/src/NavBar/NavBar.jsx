import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/joy";
import { SearchBar } from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", top: 0, position: "sticky"}}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* LOGO */}
          <a className="navbar-brand fw-bold" href="#">
            USM
          </a>

          {/* Bouton hamburger visible sur petits écrans */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenu du menu */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarMenu"
          >
            {/* Barre de recherche */}
            <div className="d-flex align-items-center my-2 my-lg-0">
              <SearchBar />
            </div>

            {/* Boutons */}
            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-3">
              <Button
                onClick={() => navigate("/signin")}
                variant="text"
                sx={{
                  height: "45px",
                  fontWeight: "bold",
                  color: "black",
                  width: { xs: "100%", lg: "auto" },
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                variant="outlined"
                sx={{
                  height: "45px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  width: { xs: "100%", lg: "auto" },
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </Box>
  );
}
