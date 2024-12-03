
interface props{
    children: React.ReactNode
}
export default function BottomedPage(props:props) {
  return (
    <div className='flex grow flex-col justify-end items-center'>
        {props.children}
    </div>
  )
}