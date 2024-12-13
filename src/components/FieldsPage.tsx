import { useField } from "../hooks/FetchFields";
import FieldItem from "./ui/FieldItem";
import FieldItemBox from "./ui/FieldItemBox";
import { useAppContext } from "../context/AppContext";
import CenteredPage from "./CenteredPage";
import { GridLoader } from "react-spinners";
import { useThemeStore } from "../context/ThemeContext";
import '../index.css'

type response = {
    Images: [string],
    tags: [string],
    createdAt: string,
    location: string,
    note: string,
    price: string,
    ownedBy: string,
    type: string,
    title: string,
    _id: string
};
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
        <div className="flex justify-center mt-24 md:mt-4 mb-20">
            <div className="static md:hidden maxWidth75vw">
                {data?.field?.map((item: response) => (
                    <FieldItem key={item._id} className="my-2" Name={item.title} Icon="https://ssniper.sirv.com/Mal3aby%20Project/field.jpg" location={item.location} price={item.price} />
                ))}
            </div>
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-24 maxWidth75vw">
                {data?.field?.map((item: response) => (
                    <FieldItemBox key={item._id} className="my-2" Name={item.title} Icon="https://ssniper.sirv.com/Mal3aby%20Project/field.jpg" location={item.location} price={item.price} />
                ))}
            </div>
        </div>
    )
}
