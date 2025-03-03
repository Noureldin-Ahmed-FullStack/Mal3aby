import { useTranslation } from "react-i18next";
import { ShootingStars } from "../ui/shooting-stars";
import { StarsBackground } from "../ui/stars-background";

export default function Managment() {
    const { t} = useTranslation("global");
  
    const extrasText: string[] = t('extras', { returnObjects: true }) as string[];
    return (
        <div className="rounded-md bg-neutral-900 flex flex-col items-center justify-center w-full grow fixed h-full">
            
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <span>{extrasText[0]}</span>
            </h2>
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <span>{extrasText[1]}</span>
            </h2>
            <ShootingStars />
            <StarsBackground />
        </div>

    )
}
