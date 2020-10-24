import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../FirebaseConfig";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://logovtor.com/wp-content/uploads/2020/07/discord-logo-vector.png"
          alt=""
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
