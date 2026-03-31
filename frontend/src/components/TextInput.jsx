function TextInput(props) {
    return (
        <input {...props} className="self-stretch bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/20 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all duration-300 rounded-lg py-2.5 px-3 invalid:border-red-500 invalid:text-red-600 placeholder:text-gray-400 dark:placeholder:text-gray-600"/>
    )
}

export default TextInput;