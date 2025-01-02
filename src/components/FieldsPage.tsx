import { useAppContext } from "../context/AppContext";
import { useField } from "../hooks/FetchFields";
import CenteredPage from "./CenteredPage";
import FieldItem from "./ui/FieldItem";
import FieldItemBox from "./ui/FieldItemBox";
import { response } from "../types";
import LoadingPage from "./Pages/LoadingPage";

export default function FieldsPage() {
    const { currentPath } = useAppContext()
    const { data, isLoading } = useField(currentPath as string)
    console.log(data)
    if (isLoading) {
        return (
           <LoadingPage />
        )
    }
    return (
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
    )
}
