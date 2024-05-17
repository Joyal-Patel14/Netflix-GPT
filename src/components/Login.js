import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = (e) => {

        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
    }

    return (
        <div>
            <Header />

            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Logo"/>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="absolute p-12 bg-black bg-opacity-70 w-3/12 my-36 mx-auto right-0 left-0 text-white">
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {
                    !isSignInForm && <input type="text" placeholder="Name" className="my-4 p-4 w-full bg-black bg-opacity-60 border border-slate-600 rounded" />
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
