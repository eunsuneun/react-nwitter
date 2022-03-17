import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from "fbase";

const AuthForm = ({ newAccount, setNewAccount }) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
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
    return setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmitForm} className="container">
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChangeInput}
          required
          className="authInput"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangeInput}
          required
          className="authInput"
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit"/>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;