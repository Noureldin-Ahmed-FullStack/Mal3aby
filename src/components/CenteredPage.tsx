
interface props{
    children: React.ReactNode
    className?: String
}
export default function CenteredPage(props:props) {
  const {children , className} = props
  return (
    <div className={'flex grow flex-col justify-center items-center ' + className}>
        {children}
    </div>
  )
}