import { useUserContext } from "../../context/UserContext";
import { useNewsPosts } from "../../hooks/FetchSocial";
// import { SocialPost } from "../../types";
import AddPost from "../addPost";
import { SinglePost } from "../ui/SinglePost";
import { ScaleLoader } from 'react-spinners'
import { Button } from "@mui/material";
export default function NewsPage() {
  const { userData } = useUserContext()
  // const { data, isLoading } = useSocialPosts(1);
  const { data, isLoading, fetchNextPage,hasNextPage } = useNewsPosts()
  console.log(data);

  return (
    <div className="!relative grow">
      <div className="mt-7 flex justify-center ">
        <div className="flex flex-col maxWidth50vw">
          {userData?.role == "admin" && <AddPost /> }
          {isLoading ? (
            <div className="w-full flex justify-center items-center mt-32">
              <ScaleLoader color="#212121" />
            </div>
          ) : (
            data?.pages.map((item) => (
              item.posts.map((post: any, index: number) => (
                <div className="my-4" key={index}>
                  {post && <SinglePost {...post} />}
                </div>
              ))
            ))
          )}
          {hasNextPage && <Button className="!my-5" variant="outlined" color="inherit" onClick={() => fetchNextPage()}>
            Load more
          </Button>}
        </div>
      </div>
    </div>
  )
}
