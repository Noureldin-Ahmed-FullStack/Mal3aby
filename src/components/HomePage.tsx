// import Hero from './Hero'
// import { BeamsHero } from './BreamsHero'

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useAppContext } from '../context/AppContext';
import { SignInButton } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';
// import WelcomeBack from './ui/WelcomeBack';

export default function HomePage() {

    const { currentDevice } = useAppContext();
    const { userData } = useUserContext();
    const { t, i18n } = useTranslation("global");
  
    const homepageText: string[] = t('homepage', { returnObjects: true }) as string[];
    return (
        <div className="flex flex-col grow items-center">
            {/* <Hero /> */}
            <div className={"flex flex-col w-full grow items-center "+ (i18n.language == 'ar' && "rtl")}>
                {/* <WelcomeBack /> */}
                {currentDevice != "Other" && (
                    userData ? (
                        <div className="text-zinc-900 dark:text-zinc-100 font-bold mt-5">
                            {homepageText[0]} {userData.name} 👋!
                        </div>
                    ) : (
                        <div className="  font-bold mt-5 flex items-center">
                            <div className='me-5 !text-zinc-900 dark:!text-zinc-100'>{homepageText[1]} 👋!</div> <SignInButton />
                        </div>
                    )
                )}
                <div className="mt-3">
                    <div className="container mx-auto maxWidth75vw">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                            <div className="relative flex items-center">
                                <Link to="/soccer" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src={"https://ssniper.sirv.com/Mal3aby%20Project/field.jpg"} alt="browse soccer fields" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">{homepageText[2]}<ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <Link to="/paddle" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/paddle.jpg" alt="browse paddle fields" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">{homepageText[3]}<ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <Link to="/pool-billiard" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/pool.jpg" alt="browse pool Billiards" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">{homepageText[4]}<ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <Link to="/swimming-pool" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/swimming_pool.jpg" alt="browse browse swimming pools" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">{homepageText[5]}<ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="my-10 mb-5">
                            <Link to={"/myBookings"} className="flex p-3 text-zinc-300 rounded hover:text-zinc-200 justify-center items-center w-full bg-slate-700 hover:bg-slate-800 transition-all duration-100 ease-in"><EditCalendarIcon /> <p className="ms-3 text-2xl">{homepageText[6]}</p></Link>
                        </div>
                        {userData?.role == 'admin' && <div className="my-5 mb-16">
                            <Link to={"/manageAllUsers"} className="flex p-3 text-zinc-300 rounded hover:text-zinc-200 justify-center items-center w-full bg-slate-700 hover:bg-slate-800 transition-all duration-100 ease-in"><EditCalendarIcon /> <p className="ms-3 text-2xl">{homepageText[7]}</p></Link>
                        </div>}
                    </div>
                </div>
            </div>
            {/* <BeamsHero /> */}
        </div>
    )
}
