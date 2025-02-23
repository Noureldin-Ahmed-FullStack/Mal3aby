import { useAppContext } from "../context/AppContext";
import { useField } from "../hooks/FetchFields";
import CenteredPage from "./CenteredPage";
import FieldItem from "./ui/FieldItem";
import FieldItemBox from "./ui/FieldItemBox";
import { response } from "../types";
import Grid from '@mui/material/Grid2';
import LoadingPage from "./Pages/LoadingPage";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

export default function FieldsPage() {
    const { currentPath } = useAppContext()
    const [FieldTitle, setFieldTitle] = useState("undefined")
    const [FieldAddress, setFieldAddress] = useState("undefined")
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const titleValue = (target.elements[0] as HTMLInputElement).value;
        const addressValue = (target.elements[2] as HTMLInputElement).value;
        setFieldTitle(titleValue)
        setFieldAddress(addressValue)

    };
    const { data, isLoading, refetch } = useField(currentPath as string, FieldTitle, FieldAddress)

    // 🔄 Automatically refetch when FieldTitle or FieldAddress changes
    useEffect(() => {
        console.log(FieldTitle, FieldAddress);

        refetch();
    }, [FieldTitle, FieldAddress, refetch]);
    console.log(data)
    if (isLoading) {
        return (
            <LoadingPage />
        )
    }
    return (
        <div className="w-full flex flex-col items-center">
        <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 maxWidth75vw" role="alert">
                <form onSubmit={search}>

                    <p className="font-bold text-lg mb-2">Search Fields</p>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                name="title"
                                fullWidth id="outlined-basic" label="By Name" variant="outlined" />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                name="address"
                                fullWidth id="outlined-basic" label="By Address" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="outlined" className="!mt-2">Search</Button>
                </form>

            </div>
        <div className="flex grow justify-center pt-7 md:pt-4 mb-20">
            
            {data?.field?.length != 0 ? (

                <>

                    <div className="static md:hidden maxWidth75vw">

                        {data?.field?.map((item: response) => (
                            <FieldItem _id={item._id} key={item._id} type={item.type} address={item.address} className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
                        ))}
                    </div>
                    <div className="mt-7">
                        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 container">
                            {data?.field?.map((item: response) => (
                                <FieldItemBox key={item._id} _id={item._id} type={item.type} address={item.address} className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
                            ))}
                        </div>
                    </div>
                </>) : (
                <CenteredPage className="">
                    <h4 className="text-7xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">Coming soon</h4>
                </CenteredPage>
            )}

        </div>
        </div>
    )
}
