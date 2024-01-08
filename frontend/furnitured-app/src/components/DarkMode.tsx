import ThemeSwitch from "./ThemeSwitch"


const DarkMode = () => {

    return (
        <div className="dark:bg-gray-900 h-screen pt-20 flex justify-center">
            <ThemeSwitch></ThemeSwitch>
        </div>
    )
}

export default DarkMode