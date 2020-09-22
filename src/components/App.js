import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseConfig";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user); // 로그인한 유저를 객체에 저장
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; Twitter Clone {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
