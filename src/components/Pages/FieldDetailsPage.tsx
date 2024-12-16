import { useParams } from "react-router-dom";
import CenteredPage from "../CenteredPage";
import { useFieldDetails } from "../../hooks/FetchFields";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { useThemeStore } from "../../context/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Grid from '@mui/material/Grid2';
import "slick-carousel/slick/slick-theme.css";
import StarRateIcon from '@mui/icons-material/StarRate';
import { response } from "../../types";
import { CardBody} from "../ui/3d-card";
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function FieldDetailsPage() {

    var settings = {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500
    };
    const { fieldID } = useParams();
    const { theme } = useThemeStore();
    const { data } = useFieldDetails(fieldID)
    const [Field, setField] = useState<response>()
    useEffect(() => {
        console.log(data);
        setField(data)
    }, [data])
    if (Field) {
        return (
            <div className="grow flex flex-col">
                <div className="hidden md:block">
                    <CenteredPage className="mt-28 text-zinc-800 dark:text-zinc-100 mx-auto maxWidth75vw transition-all ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border ">
                        <Grid container spacing={2} className="w-full">
                            <Grid size={4}>
                                <div className="carousel-container">
                                    <Slider {...settings}>
                                        {Field.Images.map((img, index) => (
                                            <div key={index} className="carousel-slide">
                                                <img className="carousel-image rounded-lg" src={img} alt={Field.title} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </Grid>
                            <Grid size={8}>
                                <div className="flex justify-between">
                                    <p className="text-4xl">{Field.title}</p>
                                    <p><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /></p>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <p className="">Address</p>
                                    <a href={Field.location} target="_blank">{Field.address}<LocationOnIcon /></a>
                                </div>
                                <div className="flex justify-start mt-3">
                                    <p>{Field.note}</p>
                                </div>
                                <div>
                                    <button className="px-4 py-2 w-full mt-5 rounded-xl hover:text-inherit bg-black dark:bg-white dark:text-black text-white text-xs font-bold">Book</button>
                                </div>
                            </Grid>
                        </Grid>

                    </CenteredPage>
                </div>
                <div className="md:hidden grow flex flex-col">

                    <div className="carousel-container">
                        <Slider {...settings}>
                            {Field.Images.map((img, index) => (
                                <div key={index} className="carousel-slide">
                                    <img className="carousel-image" src={img} alt={Field.title} />
                                </div>
                            ))}
                        </Slider>
                        <div className="h-0">test</div>
                    </div>

                    <CardBody className="w-full grow transition-all rounded-none ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] p-6 border ">
                        <div className="flex justify-between">
                            <p className="text-4xl">{Field.title}</p>
                            <p><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /></p>
                        </div>
                        <div className="flex justify-between mt-3">
                            <p className="">Address</p>
                            <a href={Field.location} target="_blank">{Field.address}<LocationOnIcon /></a>
                        </div>
                        <div className="flex justify-start mt-3">
                            <p>{Field.note}</p>
                        </div>
                        <div>
                            <button className="px-4 py-2 w-full mt-5 rounded-xl hover:text-inherit bg-black dark:bg-white dark:text-black text-white text-xs font-bold">Book</button>
                        </div>
                    </CardBody>
                </div>
            </div>)
    } else {
        return (
            <CenteredPage>
                <h4 className="text-7xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">Loading</h4>
                <GridLoader size={25} color={theme == 'dark' ? 'white' : 'orange'} />
            </CenteredPage>
        )
    }

}