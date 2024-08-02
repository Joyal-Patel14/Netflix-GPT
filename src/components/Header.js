import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANG } from "../utils/constants";
import { toogleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector(store => store?.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    };

    const handleGptSearchClick = () => {
        // toggle my gpt search
        dispatch(toogleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        const language = e.target.value;
        dispatch(changeLanguage(language));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // sign in
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                // sign out
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img
                src={LOGO} 
                alt="Logo"
                className="w-44"
            />
            {user && (
                <div className="flex p-2">
                    { showGptSearch && (
                            <select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
                                {
                                    SUPPORTED_LANG.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
                                }
                            </select>
                        )
                    }
                    <button
                        className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? "Home" : "GPT Search"}
                    </button>
                    <img
                        className="w-12 h-12"
                        src={user?.photoURL}
                        alt="usericon"
                    />
                    <button onClick={handleSignOut} className="font-bold text-white p-2">Sign Out</button>
                </div>
            )}
        </div>
    );
}

export default Header;
