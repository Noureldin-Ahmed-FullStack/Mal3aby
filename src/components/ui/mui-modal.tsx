import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogContent } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface props {
  open: boolean; // The state itself
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>; // The setter function
  handleClose: () => void
  Images?: string[]
}
export default function FullScreenDialog(props: props) {
  const {handleClose, open, Images } = props

  return (
    <React.Fragment>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'rgba(25, 30, 39, 0.95)', // Change the background color
            color: 'white', // Optional: Change text color for contrast
          },
        }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'transparent',boxShadow:'none' }}>
          <Toolbar className='justify-end'>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <img className='w-80' src={image} alt="dialogue Image" /> */}
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Images && <img
            src={Images[0]}
            alt="Dialog Image"
            style={{ maxHeight: '100%', width: 'auto' }} // Keeps aspect ratio while limiting height
          />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
