import { GridLoader } from "react-spinners";
import { useAppContext } from "../context/AppContext";
import { useField } from "../hooks/FetchFields";
import { useThemeStore } from "../context/ThemeContext";
import CenteredPage from "./CenteredPage";
import FieldItem from "./ui/FieldItem";
import FieldItemBox from "./ui/FieldItemBox";
import { response } from "../types";

export default function FieldsPage() {
    const { currentPath } = useAppContext()
    const { data, isLoading } = useField(currentPath as string)
    const { theme } = useThemeStore();
    console.log(data)
    if (isLoading) {
        return (
            <CenteredPage>
                <h4 className="text-7xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">Loading</h4>
                <GridLoader size={25} color={theme == 'dark' ? 'white' : 'orange'} />
            </CenteredPage>
        )
    }
    return (
        <div className="flex grow justify-center pt-24 md:pt-4 mb-20">
            {data?.field?.length != 0 ? (
                <>
                    <div className="static md:hidden maxWidth75vw">
                        {data?.field?.map((item: response) => (
                            <FieldItem _id={item._id} key={item._id} type={item.type} address={item.address} className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
                        ))}
                    </div>
                    <div className="mt-28">
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
