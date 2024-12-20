import Grid from '@mui/material/Grid2';
import { useUserContext } from '../../context/UserContext';
import AddFieldButton from './AddFieldButton';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import FieldsOfUser from './FieldsOfUser';
import Favouritespage from './Favouritespage';
import { NiceDiv } from '../ui/NiceDiv';
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

  return (
    <div className='container mx-auto px-3 mt-28'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <NiceDiv>
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
          </NiceDiv>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <NiceDiv>{userData?.role}</NiceDiv>
        </Grid>
      {userData?.role == "admin" && <AddFieldButton />}

        <Grid size={12}>
          <NiceDiv>{userData?.role != "user" && userData? <FieldsOfUser userID={userData?._id}/> : <Favouritespage />}</NiceDiv>
        </Grid>
      </Grid>
    </div>
  )
}
