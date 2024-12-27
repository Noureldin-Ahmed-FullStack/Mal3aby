import CenteredPage from '../CenteredPage'
import { Link } from 'react-router-dom';

export default function ErrorPage() {

    return (
        <CenteredPage>
            <h4 className="text-6xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">
                An Error has occurred
            </h4>
            <Link to={"/"}>Go back to HomePage</Link>
        </CenteredPage>
    )
}
