import { useTheme } from "./Switch";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
        className=" opacity-100 max-h-40 w-[5em] text-9xl backdrop-blur-[0.5rem] border-black border-solid dark:border-white border-2 p-8 flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:text-white text-[#8d8282]"
        onClick={toggleTheme}
    >
        {theme === "light" ? "ON" : "OFF"}
    </button>
  )
}