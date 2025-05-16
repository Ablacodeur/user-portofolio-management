import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Browser() {

  return (
    <div>
      <h1>Bienvenue sur l'application</h1>
      <p>
        <Link to={"/signin"}>Sign in</Link>
      </p>
      <p>
        <Link to={"/signup"}>Register</Link>
      </p>
    </div>
  );
}