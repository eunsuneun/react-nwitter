import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(false);
  const onSocialClick = (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
      signInWithPopup(authService, provider)
        .then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        });
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
      signInWithPopup(authService, provider)
        .then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        });
    };
  }
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <h1 style={{marginBottom:"15px"}}>{newAccount ? "Create Account" : "Log In"}</h1>
      <AuthForm newAccount={newAccount} setNewAccount={setNewAccount} />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;