import {useLoaderData} from "react-router-dom";
import LogoAndName from "./LogoAndName.jsx";
import Nav from "./Nav.jsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Header() {
    const user = useLoaderData();
    const headerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(headerRef.current, 
            { y: -100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <div className="fixed top-4 left-0 w-full z-50 px-4 md:px-8 flex justify-center">
            <header ref={headerRef} className="w-full max-w-6xl h-14 px-6 md:px-8 flex items-center justify-between bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-sm border border-black/5 dark:border-white/10">
                <LogoAndName />
                <Nav user={user}/>
            </header>
        </div>
    )
}

export default Header;