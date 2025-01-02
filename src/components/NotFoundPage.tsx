import { useThemeStore } from "../context/ThemeContext";
import '../styles/notFound.css'
export default function NotFoundPage() {
  const { theme } = useThemeStore();
  return (
    <div className="flex flex-col items-center">
      <div className={`background-text ${theme == 'dark' ? 'background-text-dark' : ''}`}>404</div>
      <div className="text-center font-bold text-zinc-900 dark:text-white">Page not found! <a className="font-extrabold" href="/">Get back</a></div>
    </div>
  )
}
