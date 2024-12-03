import { useThemeStore } from "../context/ThemeContext";
import '../styles/notFound.css'
export default function NotFoundPage() {
  const { theme } = useThemeStore();
  return (
    <div className="dark:bg-gradient-to-t dark:from-cyan-900 dark:via-green-700 dark:to-teal-900 archivo-black-regular dark:bg-zinc-800 w-full flex grow flex-col justify-center items-center bg-gradient-to-tr from-stone-300 from-0% via-amber-100 to-emerald-100">
      <div className={`background-text ${theme == 'dark' ? 'background-text-dark' : ''}`}>404</div>
      <div className="text-center font-bold text-zinc-900 dark:text-white">Page not found! <a className="font-extrabold" href="/">Get back</a></div>
    </div>
  )
}
