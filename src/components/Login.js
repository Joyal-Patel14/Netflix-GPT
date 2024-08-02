import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants"

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = (e) => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        
        if (message) return;

        // Sign In/Sign up

        if(!isSignInForm) {
            // Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: USER_AVATAR
                }).then(() => {
                    const { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                }).catch((error) => {
                    setErrorMessage(error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage);
            });
        } else {
            // Sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage);
            });
        }
    }

    return (
        <div>
            <Header />

            <div className="absolute">
                <img src={BG_URL} alt="Logo"/>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="absolute p-12 bg-black bg-opacity-70 w-3/12 my-36 mx-auto right-0 left-0 text-white">
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {
                    !isSignInForm && <input ref={name} type="text" placeholder="Name" className="my-4 p-4 w-full bg-black bg-opacity-60 border border-slate-600 rounded" />
                }

                <input ref={email} type="text" placeholder="Email" className="my-4 p-4 w-full bg-black bg-opacity-60 border border-slate-600 rounded" />
                <input ref={password} type="password" placeholder="Password" className="my-4 p-4 w-full bg-black bg-opacity-60 border border-slate-600 rounded" />
                
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

                <button className="py-2 my-6 w-full rounded bg-red-700" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4">
                    {isSignInForm ? "New to Netflix?" : "Already user?"}
                    <span className="font-bold cursor-pointer px-2" onClick={toggleSignInForm}>
                        {isSignInForm ? "Sign Up" : "Sign In"}
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
