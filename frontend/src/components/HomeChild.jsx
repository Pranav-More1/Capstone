function HomeChild({children, className}) {
    return (
        <div className={`px-6 md:px-16 lg:px-24 w-full max-w-[1400px] mx-auto flex flex-col items-start grow relative z-10 ${className}`}>
            {children}
        </div>
    )
}

export default HomeChild;