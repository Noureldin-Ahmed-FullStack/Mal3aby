import { useParams } from "react-router-dom";
import CenteredPage from "../CenteredPage";
import { useFieldDetails } from "../../hooks/FetchFields";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Grid from '@mui/material/Grid2';
import "slick-carousel/slick/slick-theme.css";
import { rating, response } from "../../types";
import { CardBody } from "../ui/3d-card";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Chip, Rating } from "@mui/material";
import BookingButton from "./BookingButton";
import LoadingPage from "./LoadingPage";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import OfflineBookingButton from "./OfflineBookingButton";
import DeleteFieldButton from "./DeleteFieldButton";
import ErrorPage from "./ErrorPage";
import FieldEditButton from "./FieldEditButton";
export default function FieldDetailsPage() {
    const [value, setValue] = useState<number | null>(0);
    const [AverageRating, setAverageRating] = useState<number>(0);
    const { userData } = useUserContext();

    const queryClient = useQueryClient();
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const { fieldID } = useParams();
    const { data, isLoading, isError } = useFieldDetails(fieldID)
    if (isError) {
        return <CenteredPage>
            <ErrorPage></ErrorPage>
        </CenteredPage>
    }
    console.log(data);

    const settings = {
        infinite: data != "error" ? data?.Images.length > 1 : false,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };
    const [Field, setField] = useState<response | "error">()
    const updateRating = async (newVal: number | null) => {
        if (!newVal) {
            return
        }
        const response = await axios.put(BaseURL + `rateField/${data._id}`, { userID: userData?._id, rating: newVal });
        console.log(response);

        queryClient.refetchQueries({ queryKey: ['FieldDetails' + fieldID] });
    }
    useEffect(() => {
        console.log(data);
        if (!data) {
            return
        }
        if (data == "error") {
            return
        }
        const foundUserIndex = data.ratings.findIndex((rating: rating) => rating.userId === userData?._id);
        setField(data)

        let totalRatingValue = 0
        for (let i = 0; i < data.ratings.length; i++) {
            totalRatingValue += data.ratings[i].rating
        }
        const avgRating = totalRatingValue / data.ratings.length
        setAverageRating(avgRating | 0)
        if (foundUserIndex != -1) {
            setValue(data.ratings[foundUserIndex].rating)
        } else {
            setValue(avgRating)
        }
    }, [data])
    if (isLoading) {
        return (
            <LoadingPage />
        )
    }
    if (Field && !isLoading && Field != "error") {
        return (
            <div className="grow flex flex-col">
                <div className="hidden md:block">
                    <CenteredPage className="mt-7 text-zinc-800 dark:text-zinc-100 mx-auto maxWidth75vw transition-all ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border ">
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
                                    <p className="text-4xl">{Field.title}
                                    {(userData && (userData?.role == 'admin' || Field.ownedBy == userData?._id)) && <FieldEditButton FieldData={Field} userData={userData} />}

                                    </p>
                                    <div className="flex items-center">
                                        <p className="opacity-55 mt-0 text-sm text-end me-2">{AverageRating + " out of 5 | " + data.ratings.length + " reviews"}</p>
                                        <Rating
                                            name="simple-controlled"
                                            precision={0.5}
                                            value={value}
                                            onChange={(_event, newValue) => {
                                                updateRating(newValue)
                                            }}
                                        /></div>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <p className="">Address:</p>
                                    <a href={Field.location} target="_blank">{Field.address}<LocationOnIcon /></a>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <p className="">Price per hour:</p>
                                    <p>{Field.price}Egp.</p>
                                </div>

                                <div className="flex justify-between mt-3">
                                    <p className="text-zinc-500">The full ticket price is {Field.price + 15}Egp., you pay 15 egp online to book and {Field.price}Egp. cash or via insta-pay to the owner when you arrive.</p>
                                </div>
                                <div className="flex justify-start mt-3">
                                    <p>{Field.note}</p>
                                </div>
                                <div className="mb-4">{
                                    (userData?.role == 'admin' || Field.ownedBy == userData?._id) ? <OfflineBookingButton _id={Field._id} title={Field.title} startTime={Field.startTime} price={Field.price} owner={Field.ownedBy} hourCount={Field.hourCount} /> : <BookingButton _id={Field._id} title={Field.title} startTime={Field.startTime} price={Field.price} owner={Field.ownedBy} hourCount={Field.hourCount} />
                                }</div>
                                <p className="mb-2">Tags:</p>
                                {Field.tags.map((tag, index) => (
                                    <Chip clickable key={index} className="!me-2" color="warning" label={tag} />
                                ))}
                            </Grid>

                            {(userData && (userData?.role == 'admin' || Field.ownedBy == userData?._id)) && <div className="w-full">
                                <DeleteFieldButton FieldData={Field} userdata={userData} />
                            </div>}
                        </Grid>

                    </CenteredPage>
                </div>
                <div className="md:hidden mt-sub-6rem grow flex flex-col text-zinc-900 dark:text-zinc-200">

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
                            <p className="text-4xl">{Field.title}
                                {(userData && (userData?.role == 'admin' || Field.ownedBy == userData?._id)) && <FieldEditButton FieldData={Field} userData={userData} />}

                            </p>
                            <div className="flex flex-col-reverse sm:flex-row items-center">
                                <p className="opacity-55 mt-0 text-sm text-end me-2">{AverageRating + " out of 5 | " + data.ratings.length + " reviews"}</p>
                                <Rating
                                    name="simple-controlled"
                                    precision={0.5}
                                    value={value}
                                    onChange={(_event, newValue) => {
                                        updateRating(newValue)
                                    }}
                                /></div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <p className="">Address</p>
                            <a href={Field.location} target="_blank">{Field.address}<LocationOnIcon /></a>
                        </div>
                        <div className="flex justify-between mt-3">
                            <p className="">Price per hour:</p>
                            <p>{Field.price}Egp.</p>
                        </div>
                        <div className="flex justify-start mt-3">
                            <p>{Field.note}</p>
                        </div>
                        <div className="flex justify-between mt-3">
                            <p className="text-zinc-500">The full ticket price is {Field.price}Egp., you pay 15 egp online to book and the rest you pay cash or via insta-pay to the owner when you arrive.</p>
                        </div>
                        <div>
                            {
                                (userData?.role == 'admin' || Field.ownedBy == userData?._id) ? <OfflineBookingButton _id={Field._id} title={Field.title} startTime={Field.startTime} price={Field.price} owner={Field.ownedBy} hourCount={Field.hourCount} /> : <BookingButton _id={Field._id} title={Field.title} startTime={Field.startTime} price={Field.price} owner={Field.ownedBy} hourCount={Field.hourCount} />
                            }
                        </div>
                        {(userData && (userData?.role == 'admin' || Field.ownedBy == userData?._id)) && <DeleteFieldButton FieldData={Field} userdata={userData} />}
                    </CardBody>
                </div>
            </div>)
    } else if (Field == "error") {
        return (
            <CenteredPage>
                <h4 className="text-7xl mb-5 text-center text-red-700 dark:text-red-800 font-medium agu-display">error 404: This Field doesnt exist</h4>
            </CenteredPage>
        )
    } else {
        return (
            <CenteredPage>
                <h4 className="text-7xl mb-5 text-center text-red-700 dark:text-red-800 font-medium agu-display">error 404: This Field doesnt exist</h4>
            </CenteredPage>
        )
    }

}
