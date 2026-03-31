function Button({text, filled = true, className, onClick, disabled = false}) {
    const baseStyle = "relative overflow-hidden font-medium px-5 py-2 text-sm rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group";
    
    // Filled mode: solid black (white in dark mode)
    const filledStyle = "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90";
    
    // Outlined mode: ghost subtle hover
    const outlineStyle = "bg-transparent text-gray-600 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10";

    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${filled ? filledStyle : outlineStyle} ${className}`}>
            <span className="relative z-10 flex items-center justify-center gap-2">{text}</span>
        </button>
    )
}

export default Button;