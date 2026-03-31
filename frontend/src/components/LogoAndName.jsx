import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

function LogoAndName() {

    return (
        <Link to="/" className="font-medium text-lg lg:text-xl flex gap-1.5 items-center cursor-pointer text-black dark:text-white hover:opacity-70 transition-opacity duration-300">
            <span className="tracking-tight">SkinSafe AI</span>
        </Link>
    )
}

export default LogoAndName;