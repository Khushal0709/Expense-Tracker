import React, { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import "./style.css"
import { useNavigate } from 'react-router-dom';

function Header() {
    const [user,loading] = useAuthState(auth);
    const navigate = useNavigate();
    function logout() {
      auth.signOut();
      navigate("/");
    }
  
    useEffect(() => {
      if (!user) {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }, [user, loading]);
    
  return (
    <div className='navbar'>
        <p className='logo'>Financely</p>
        {user ? (
        <p className="logo link" onClick={logout}>
          Logout
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Header;