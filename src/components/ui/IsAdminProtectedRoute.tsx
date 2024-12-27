import React from 'react'
import { useUserContext } from '../../context/UserContext';
import CenteredPage from '../CenteredPage';

interface props {
    children: React.ReactNode
}
export default function IsAdminProtectedRoute(props: props) {

    const { userData } = useUserContext();
    if (userData?.role == "admin") {
        return (
            <>
                {props.children}
            </>
        )
    }else{
        return (
           <CenteredPage>
               <p className='text-2xl'>You are not Authorized to access this page</p>
           </CenteredPage>
        )
    }

}
