import React, { useState } from 'react';
import './UserAuthentication.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Google signin
import { getAuth, sendPasswordResetEmail, updateProfile, signInWithPopup, sendEmailVerification, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// const part 
const provider = new GoogleAuthProvider();


const firebaseConfig = {
    apiKey: "AIzaSyD0yWO3ol8qBjLfsVyCJrucOs10BsSV6nA",
    authDomain: "ezewev-924b8.firebaseapp.com",
    projectId: "ezewev-924b8",
    storageBucket: "ezewev-924b8.appspot.com",
    messagingSenderId: "378853676356",
    appId: "1:378853676356:web:43d2beec8b8516a28bb311"
};
// Initialize Firebase
initializeApp(firebaseConfig);
// google configer 
const UserAuthentication = () => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [error, setError] = useState(" ");
    const [isLogin, setLogin] = useState(false);
    const [name, setName] = useState(" ");

    const auth = getAuth();
    const GoogleRagister = e => {

        console.log()
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
    }
    const handleCreateEmail = e => {
        setEmail(e.target.value);
    }
    const handleCreatePassword = e => {
        setPassword(e.target.value);
    }
    // Registration
    const handleRegistration = e => {
        e.preventDefault()
        if (password.length < 6) {
            setError("password Must be 6 Carrecter")
            return;
        }
        if (isLogin) {
            processLogin(email, password);
        }
        else {
            registerNewUser(email, password)
        }
    }
    const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setError('')
            })
            .catch(error => {
                setError(`${email} This Email Address Not Found`)
            })
    }
    const registerNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setError('')
                verifyEmail()
                setUserName();
            })
            .catch((error) => {
                setError('Usaer already register');
            });
    }
    const toggleLogin = e => {
        setLogin(e.target.checked);
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then((result) => {
                console.log(result);
            });
    }
    const handleresetpassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(result => {
                // Password reset email sent!
                // ..

                setError("Password reset")
            })
            .catch(error => {
                setError("Password reset")
            })
        console.log("Forgate pass")
    };
    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
        .then(result => {
            
        })
    }
    const handleNameChange = e => {
        setName(e.target.value);
    }

    return (
        <div>
            <div className="container">
                <div className="row align-items">
                    <div className="col-lg-6 text-center">
                        <div className="form-main text-center">
                            <div className="form-heading">
                                <h2>Sign in to Account</h2>
                            </div>
                            <div className="login-icon text-center">
                                <button onClick={GoogleRagister}><i className="fab fa-google"></i></button>
                                <p>or use your email account</p>
                            </div>
                            <div className="form-container">
                                <form onSubmit={handleRegistration}>
                                    <div className="mb-3">
                                        <input onBlur={handleCreateEmail} required type="email" className="form-control" placeholder="Email address" />
                                    </div>
                                    {!isLogin &&
                                        <div className="mb-3">
                                            <input onBlur={handleNameChange} htmlFor="inputName" type="text" className="form-control" placeholder="Full Name" />
                                        </div>
                                    }
                                    <div className="mb-3">
                                        <input onBlur={handleCreatePassword} required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        <p className="text-danger">{error}</p>
                                    </div>
                                    <div className="mb-3 form-check check-items ">
                                        <input onChange={toggleLogin} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Already registered</label>
                                    </div>
                                    <button htmlhtmlFor="submit" className="btn btn-primary">{
                                        isLogin ? " Login"
                                            :
                                            "Register"
                                    } </button>
                                    <p className="forgate-password" onClick={handleresetpassword}>Forgate password</p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <div className="">
                            <div className="form-right">
                                <div className="front-right-content">
                                    <h2>Hello, Friend!</h2>
                                    <p>Fill up personal information and
                                        start journey with us.</p>
                                    <input htmlhtmlFor="button" value="Sign Up" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAuthentication;