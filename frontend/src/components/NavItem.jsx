import {Link} from "react-router-dom";

function NavItem({text, to, serverSideUrl = false}) {

    const classList = "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200 py-2 cursor-pointer text-sm font-medium";

    const content = (
        <>{text}</>
    );

    if (serverSideUrl) {
        return (
            <a className={classList} href={to}>
                {content}
            </a>
        )
    }

    return (
        <Link to={to} className={classList}>
            {content}
        </Link>
    )
}

export default NavItem;