import NavItem from "./NavItem.jsx";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import UserAvatar from "./UserAvatar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function Nav({user}) {
    const navigate = useNavigate();

    const loginBtnClick = () => {
        navigate("/login");
    }

    const takeATestBtnClick = () => {
        navigate("/take-a-test");
    }

    return (
        <nav className="hidden ml-auto lg:flex gap-8 text-base items-center">
            <NavItem text="More about Skin Cancer" to="https://en.wikipedia.org/wiki/Skin_cancer" serverSideUrl={true}/>
            <NavItem text="Contact Us" to="/contact-us"/>
            <div className="flex gap-4 items-center ml-4">
                {
                    user ? <UserAvatar user={user}/>
                        : <Button text="Login" filled={false} onClick={loginBtnClick} className="py-2 px-5 text-sm"/>
                }
                <ThemeToggle />
                <Button text="Take a Test" onClick={takeATestBtnClick} className="py-2 px-5 text-sm"/>
            </div>
        </nav>
    )
}

export default Nav;