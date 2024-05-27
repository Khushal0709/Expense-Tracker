import React, { useState } from 'react'
import "./style.css"
import Input from '../input'
import Button from '../Button';
import {  createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import {   provider,db } from "../../firebase";

function SignupSignin() {
    
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [loginform,setloginForm]=useState(true);
    const navigate=useNavigate();

    function signupwithemail(){    
        setLoading(true);
        if(name!="" && email!="" && password!="" && confirmpassword!=""){
           if(password==confirmpassword){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
             // Signed up 
            const user = userCredential.user;
            createDoc(user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            console.log("user ",user);
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            });
           }
           else{
            toast.error("Confirm password needs to be same!");
            setLoading(false);
           }
        }
        else{
           toast.error("All fields are mandatory!");
           setLoading(false);
        }
    }

    function loginWithEmail(){
        setLoading(true);
        if( email!="" && password!="" ){
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toast.success("User Loggedin");
            setLoading(false);
            navigate("/dashboard");
           
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
        }
        else{
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    }

    async function createDoc(user){
        setLoading(true);
        if (!user) return;
 
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
        
        try{
            await setDoc(doc(db,"users",user.uid),{
                name:user.displayName?user.displayName:name,
                email:user.email,
                photoURL:user.photoURL?user.photoURL:"",
                createdAt:new Date(),
            });
            toast.success("Doc created");
            setLoading(false);

        }catch(e){
            toast.error(e.message);
            setLoading(false);
        }
       }
       else{
        toast.error("User already exists");
        setLoading(false);
       }
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          await createDoc(user);
          toast.success("User Authenticated Successfully!");
          setLoading(false);
          navigate("/dashboard");
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
          console.error("Error signing in with Google: ", error.message);
        }
      };

  return (
    <>
    {loginform? 
    (
        <div className='signup-wrapper'>
        <h2 className='title'>
           Login on <span style={{color:"var(--theme)"}}>Financely</span>
        </h2>
        <form>
            <Input
            label={"Email"}
            type={'email'}
            state={email}
            setState={setEmail}
            placeholder={"abc@xyz.com"}
            />
            <Input
            label={"Password"}
            type={'password'}
            state={password}
            setState={setPassword}
            placeholder={"Example123"}
            />
           
            <Button
            disabled={loading}
            text={"Login"}
            onClick={loginWithEmail}
            />
    
             <p className='p-login' onClick={()=>{setloginForm(!loginform)}}>Don't have an account already ? <span style={{color:"var(--theme)"}}>click here</span></p>
        </form>
    </div>
    ):
    <div className='signup-wrapper'>
        <h2 className='title'>
           Sign Up on <span style={{color:"var(--theme)"}}>Financely</span>
        </h2>
        <form>
            <Input
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"John Dusk"}
            />
            <Input
            label={"Email"}
            type={'email'}
            state={email}
            setState={setEmail}
            placeholder={"abc@xyz.com"}
            />
            <Input
            label={"Password"}
            type={'password'}
            state={password}
            setState={setPassword}
            placeholder={"Example123"}
            />
            <Input
            label={"Confirm Password"}
            type={'password'}
            state={confirmpassword}
            setState={setConfirmPassword}
            placeholder={"Example123"}
            />
            <Button
            disabled={loading}
            text={"Sign Up with Email"}
            onClick={signupwithemail}
            />
            <p style={{textAlign:"center"}}>or</p>
             <Button
             onClick={signInWithGoogle}
             disabled={loading}
            text={"Sign Up with Google"}
            blue={true}
            />
            <p className='p-login' onClick={()=>{setloginForm(!loginform)}}>Already have an account? <span style={{color:"var(--theme)"}}>click here</span></p>
        </form>
    </div>
    }
    </>
  )
}

export default SignupSignin