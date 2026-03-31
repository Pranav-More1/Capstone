import Page from "../components/Page.jsx";
import loginImg from "../assets/login-bg.jpg";
import TextInput from "../components/TextInput.jsx";
import Button from "../components/Button.jsx";
import {Link, Navigate, useLoaderData, useNavigate} from "react-router-dom";
import LogoAndName from "../components/LogoAndName.jsx";
import {useState, useEffect, useRef} from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import FormError from "../components/FormError.jsx";
import {validateEmail} from "../utils.js";
import axios from "axios";
import {API_BASE_URL, LOGIN_ROUTE, SIGNUP_ROUTE} from "../constants.js";
import gsap from "gsap";

function Login() {
    const navigate = useNavigate();
    const user = useLoaderData();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    
    const formRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(formRef.current,
            { scale: 0.9, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
        gsap.fromTo(formRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
        );
    }, []);

    const handleLoginBtnClick = () => {
        setLoading(true);

        axios.post(API_BASE_URL + LOGIN_ROUTE, {
            email, password
        }, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            withCredentials: true
        }).then(response => {

            if (response.status >= 200 && response.status < 300)
                navigate("/");
            else
                setError(response.data.error);

            setLoading(false);
        }).catch(error => {
            setError(error.response ? error.response.data.error: "Something went wrong");
            setLoading(false);
        })
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <Page className="flex items-center justify-center min-h-screen relative p-6 bg-white dark:bg-black">
            {loading && <LoadingScreen />}
            
            <div ref={formRef} className="w-full max-w-sm p-8 flex flex-col gap-4 items-center justify-center relative z-10">
                <LogoAndName />
                <h1 className="font-semibold text-2xl mt-4 text-center text-black dark:text-white">Welcome back</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">Enter your details to sign in to your account.</p>

                {error && <FormError msg={error} className="self-stretch"/>}

                <div className="w-full flex flex-col gap-1.5">
                    <span className="font-medium text-xs text-gray-700 dark:text-gray-300">Email address</span>
                    <TextInput placeholder="john@doe.com" value={email} type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" maxLength={30} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="w-full flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-xs text-gray-700 dark:text-gray-300">Password</span>
                        <Link to="/forgotpassword" className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Forgot password?</Link>
                    </div>
                    <TextInput type="password" placeholder="••••••••" value={password} minLength={4} maxLength={15} onChange={e => setPassword(e.target.value)}/>
                </div>

                <Button text="Sign in" className="self-stretch mt-4 py-2.5 w-full rounded-md" disabled={!validateEmail(email) || password.trim().length < 4} onClick={handleLoginBtnClick}/>
                
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
                    Don't have an account? <Link to="/signup" className="text-black dark:text-white font-semibold hover:underline ml-1">Sign up</Link>
                </p>
            </div>
        </Page>
    )
}

export default Login;