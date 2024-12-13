import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useUserContext } from '../../context/UserContext';
import AddFieldButton from './AddFieldButton';

export default function ProfilePage() {
  const { userData } = useUserContext();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    color: '#ffffffaa',
    padding: theme.spacing(1),
    textAlign: 'center',
  }));
  return (
    <div className='container mx-auto px-10 md:px-20'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Item>{userData?.name}</Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Item>{userData?.role}</Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Item>{userData?._id}</Item>
        </Grid>
      </Grid>
      <AddFieldButton />
    </div>
  )
}
