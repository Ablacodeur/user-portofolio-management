import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setError, setUser } from "../store/user-project/userSlice";
import { useDispatch } from "react-redux";

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