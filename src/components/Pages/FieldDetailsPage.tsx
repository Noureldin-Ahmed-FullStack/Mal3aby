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
import { CardBody } from "../ui/3d-card";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Chip } from "@mui/material";
import BookingButton from "./BookingButton";
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
    const [Field, setField] = useState<response | "error">()
    useEffect(() => {
        console.log(data);
        setField(data)
    }, [data])
    if (Field && Field != "error") {
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
                                    <p className="">Address:</p>
                                    <a href={Field.location} target="_blank">{Field.address}<LocationOnIcon /></a>
                                </div>
                                <div className="flex justify-start mt-3">
                                    <p>{Field.note}</p>
                                </div>
                                <div className="mb-4">
                                    <BookingButton _id={Field._id} title={Field.title} price={Field.price} owner={Field.ownedBy}/>
                                </div>
                                <p className="mb-2">Tags:</p>
                                {Field.tags.map((tag, index) => (
                                    <Chip clickable key={index} className="!me-2" color="warning" label={tag} />
                                ))}
                            </Grid>
                        </Grid>

                    </CenteredPage>
                </div>
                <div className="md:hidden grow flex flex-col text-zinc-900 dark:text-zinc-200">

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
                            <BookingButton _id={Field._id} title={Field.title} price={Field.price} owner={Field.ownedBy}/>
                        </div>
                    </CardBody>
                </div>
            </div>)
    } else if (Field == "error") {
        return (
            <CenteredPage>
                <h4 className="text-7xl mb-5 text-center text-red-700 dark:text-red-800 font-medium agu-display">error 404: This Item doesnt exist</h4>
            </CenteredPage>)
    } else {
        return (
            <CenteredPage>
                <h4 className="text-7xl mb-5 text-center text-orange-700 dark:text-zinc-200 font-medium agu-display">Loading</h4>
                <GridLoader size={25} color={theme == 'dark' ? 'white' : 'orange'} />
            </CenteredPage>
        )
    }

}
