import Grid from '@mui/material/Grid2';
import { useUserContext } from '../../context/UserContext';
import AddFieldButton from './AddFieldButton';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import FieldsOfUser from './FieldsOfUser';
import Favouritespage from './Favouritespage';
import { NiceDiv } from '../ui/NiceDiv';
import { Link } from 'react-router-dom';
export default function ProfilePage() {
  const { userData } = useUserContext();
  console.log(userData);
  const [tooltipText, setTooltipText] = useState('Click to copy');

  const handleCopy = (text: string | undefined) => {
    if (!text) {
      return
    }
    navigator.clipboard.writeText(text).then(() => {
      setTooltipText('Copied!');
      setTimeout(() => setTooltipText('Click to copy'), 1500); // Reset tooltip text after 1.5s
    });
  };
  interface RoleDivProps {
    role: string | undefined;
  }

  const RoleDiv: React.FC<RoleDivProps> = ({ role }) => {
    switch (role) {
      case "admin":
        return <div className='flex flex-col'>
          <p>Admin Content</p>
          {userData?.role == "admin" && <AddFieldButton />}
          <Link to={"/myBookings"} className='w-full mt-5 px-4 py-3 text-center rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:text-white'>manage Bookings</Link>
        </div>;

      case "user":
        return <div className='flex flex-col'>
          <p>User Content</p>
          <Link to={"/myBookings"} className='w-full mt-5 px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:text-white'>Your Bookings</Link>
        </div>;

      case "owner":
        return <div className='flex flex-col'>
          <p>Owner Content</p>
          <div className="border mt-2 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
          <p>Wallet: {userData?.wallet}Egp.</p>
          </div>
          
          <Link to={"/myBookings"} className='w-full mt-5 px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:text-white'>manage Bookings</Link>
        </div>;

      default:
        return <div className='flex flex-col'>
          <Link to={"/sign-up"} className='w-full mt-5 px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:text-white'>Log-in</Link>
        </div>;
    }
  };
  return (
    <div className='container mx-auto px-3 mt-7'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <NiceDiv className='h-full'>
            <Grid container spacing={2}>
              <Grid size={3}>
                <img className='rounded' src={userData?.userPFP} alt={userData?.name} />
              </Grid>
              <Grid size={9}>
                <div className="flex">
                  <p className='w-2/5'>user iD: </p>
                  <Tooltip title={tooltipText} arrow followCursor>
                    <span onClick={() => handleCopy(userData?._id)} className='mx-2 break-all text-end hover:text-blue-400 transition-all cursor-pointer'>{userData?._id}  <ContentCopy /></span>
                  </Tooltip>
                </div>

                <p className='break-all'>username: {userData?.name}</p>
                <p className='break-all'>email: {userData?.email}</p>
                {userData?.role != "user" && <p className='break-all'>Role:  {userData?.role}</p>}
                <p className='break-all'>{userData?.About}</p>
              </Grid>
            </Grid>
          </NiceDiv>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <NiceDiv className='h-full'>
            <RoleDiv role={userData?.role} />
          </NiceDiv>
        </Grid>

        <Grid size={12}>
          <NiceDiv>{userData?.role != "user" && userData ? <FieldsOfUser userID={userData?._id} /> : <Favouritespage />}</NiceDiv>
        </Grid>
      </Grid>
    </div>
  )
}
