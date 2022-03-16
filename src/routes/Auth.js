import { authService } from "fbase";
import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const Auth = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onChangeInput = (event) => {
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    };
  };
  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(authService, email, password);
        console.log('회원가입');
        console.log(data);
      } else {
        // log in
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };
  const toggleAccount = () => {
    return setNewAccount(prev => !prev);
  };
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
    <>
      <h1>{newAccount ? "Create Account" : "Log In"}</h1>
      <form onSubmit={onSubmitForm}>
        <input type="email" name="email" placeholder="email" value={email} onChange={onChangeInput} required />
        <input type="password" name="password" placeholder="password" value={password} onChange={onChangeInput} required/>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
        {error}
      </form>
      <button onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</button>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </>
  )
};

export default Auth;