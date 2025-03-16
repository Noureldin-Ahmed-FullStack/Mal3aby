import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="w-full bg-slate-900">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 py-5">
            <div className="flex flex-col text-center items-center">
                <strong>Fields</strong>
                <ul>
                    <li><Link to="/soccer">Football Fields</Link> </li>
                    <li><Link to="/pool-billiard">Pool Billiards</Link> </li>
                    <li><Link to="/paddle">Paddle Fields</Link> </li>
                    <li><Link to="/swimming-pool">Swimming pools</Link> </li>
                </ul>
            </div>
            <div className="flex flex-col text-center items-center">
                <strong>Company</strong>
                <ul>
                    <li><Link to="/news">News</Link> </li>
                    <li><Link to="/Social">Social</Link> </li>
                </ul>
            </div>
            <div className="flex flex-col text-center items-center">
                <strong>Resources</strong>
                <ul>
                    <li><Link to="/privacy-policy#contactus">Contact us</Link> </li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link> </li>
                    <li><Link to="/privacy-policy#tos">Terms and conditions</Link> </li>
                </ul>
            </div>
        </div>
            <h3 className="text-center w-full">© Captain Masr 2025 All Rights Reserved.</h3>

        </div>
        
    )
}
