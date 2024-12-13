// import Hero from './Hero'
// import { BeamsHero } from './BreamsHero'

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export default function HomePage() {

    return (
        <div className="flex flex-col grow items-center">
            {/* <Hero /> */}
            <div className="flex flex-col w-full grow items-center">
                <div className="mt-24">
                    <div className="container mx-auto px-10 md:px-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                            <div className="relative flex items-center">
                                <a href="/soccer" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/field.jpg" alt="browse soccer fields" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">soccer fields <ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </a>
                            </div>
                            <div className="relative flex items-center">
                                <a href="/paddle" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/paddle.jpg" alt="browse paddle fields" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">paddle fields <ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </a>
                            </div>
                            <div className="relative flex items-center">
                                <a href="/pool-billiard" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/pool.jpg" alt="browse pool Billiards" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">pool Billiards <ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </a>
                            </div>
                            <div className="relative flex items-center">
                                <a href="/swimming-pool" className="fieldBrowser rounded h-full w-full object-cover">
                                    <img className="rounded h-full w-full object-cover" src="https://ssniper.sirv.com/Mal3aby%20Project/swimming_pool.jpg" alt="browse browse swimming pools" />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white fieldBrowserOverlay text-lg font-bold">swimming pools <ArrowCircleRightIcon className="ms-3" fontSize="large" /></span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="my-10 mb-16">
                            <button className="flex  justify-center items-center w-full bg-slate-700 hover:bg-slate-800 transition-all duration-100 ease-in"><EditCalendarIcon /> <p className="ms-3">Bookings</p></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <BeamsHero /> */}
        </div>
    )
}
