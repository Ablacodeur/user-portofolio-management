import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Browser() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); 
  console.log(user);
  useEffect(() => {
    if (user) {
      console.log(user);
      
      navigate("/portofolio"); 
    }
  }, [user, navigate]);

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
