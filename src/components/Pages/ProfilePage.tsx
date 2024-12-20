import Grid from '@mui/material/Grid2';
import { useUserContext } from '../../context/UserContext';
import AddFieldButton from './AddFieldButton';
import { ReactNode, useState } from 'react';
import { Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import FieldsOfUser from './FieldsOfUser';
import Favouritespage from './Favouritespage';
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
  const Item = ({ children }: { children: ReactNode }) => {
    return (
      <div className='text-zinc-800 dark:text-zinc-100 w-full transition-all ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border '>
        {children}
      </div>
    )
  }
  return (
    <div className='container mx-auto px-3 mt-28'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Item>
            <Grid container spacing={2}>
              <Grid size={3}>
                <img className='rounded' src={userData?.userPFP} alt={userData?.name} />
              </Grid>
              <Grid size={9}>
                <Tooltip title={tooltipText} arrow followCursor>
                <p className='break-all' onClick={() => handleCopy(userData?._id)}>user iD: <span className='mx-2 hover:text-blue-400 transition-all cursor-pointer'>{userData?._id}  <ContentCopy /></span></p>
                 
                </Tooltip>
                <p className='break-all'>username: {userData?.name}</p>
                <p className='break-all'>email: {userData?.email}</p>
                {userData?.role != "user" && <p className='break-all'>Role:  {userData?.role}</p>}
                <p className='break-all'>{userData?.About}</p>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Item>{userData?.role}</Item>
        </Grid>
      {userData?.role == "admin" && <AddFieldButton />}

        <Grid size={12}>
          <Item>{userData?.role != "user" && userData? <FieldsOfUser userID={userData?._id}/> : <Favouritespage />}</Item>
        </Grid>
      </Grid>
    </div>
  )
}
