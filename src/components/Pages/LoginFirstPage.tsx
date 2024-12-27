import CenteredPage from '../CenteredPage'
import { Link } from 'react-router-dom'

export default function LoginFirstPage() {
    return <CenteredPage>
        <div className='flex flex-col'>
            <img src="https://ssniper.sirv.com/Mal3aby%20Project/Forgot%20password-rafiki.svg" alt="Login first" />
            <a className="text-sm" href="https://storyset.com/online" target="_blank">illustration by Storyset</a>
            You need to login to access this page
            <Link to={"/sign-up"} className='w-full mt-5 px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:text-white'>Log-in</Link>
        </div>
    </CenteredPage>
}
