import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // user is signed in.
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
    {init ? <AppRouter isLoggenIn={Boolean(userObj)} userObj={userObj} /> : <h1>Initializing...</h1>}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
