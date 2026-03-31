function Page({children, className}) {
    return (
        <div className={`min-h-screen w-full relative overflow-hidden ${className}`}>
            {children}
        </div>
    )
}

export default Page;