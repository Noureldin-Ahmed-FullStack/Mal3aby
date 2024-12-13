import { useField } from "../hooks/FetchFields"

export default function Pool_billiards_page() {
  const { data, isLoading} = useField('')
  console.log(data);
  
  return (
    <div>data</div>
  )
}
