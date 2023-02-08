import React, { Fragment, useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";

const App = () => {
  const [formValidity, setFormValidity] = useState(false);

  function handleFormSubmit(formStatus) {
    setFormValidity(formStatus);
    localStorage.setItem("IS_LOGGED_IN", String(formStatus))
  }

  useEffect(()=>{
    const canLogin = Boolean(localStorage.getItem("IS_LOGGED_IN"))
    setFormValidity(canLogin);
  }, [])

  function handleLogout(){
    setFormValidity(false);
  }

  return (
    <Fragment>
      <Navbar  
        isLoggedIn = {formValidity}
        logout = {handleLogout}
      />
      {formValidity ? (
        <HomePage />
      ) : (
        <LoginForm handleFormSubmit={handleFormSubmit} />
      )}
    </Fragment>
  );
};

export default App;
