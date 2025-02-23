import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { response, userType } from '../../types';
import axios from 'axios';
import { toast } from 'react-toastify';
interface props {
    FieldData: response
    userdata: userType
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteFieldButton(props: props) {
    const [open, setOpen] = React.useState(false);
    const [PendingRequest, setPendingRequest] = React.useState(false);
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteField = async () => {
        setPendingRequest(true)
        await axios
            .delete(`${BaseURL}field/${props.FieldData._id}/${props.userdata._id}`)
            .then((response) => {
                console.log(response);
                setPendingRequest(false)
                toast.success("Field Deleted successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                handleClose();
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setPendingRequest(false)
                handleClose();
            });
        setOpen(false);
    };

    return (
        <div className='mt-3'>
            <Button fullWidth variant="outlined" color='error' onClick={handleClickOpen}>
                Delete Field
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="dialog-for-deleting-field"
            >
                <DialogTitle>{"Are you sure you want to delete this Field?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-for-deleting-field">
                        Deleting this field will perminatly remove it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button variant='contained' color='error' disabled={PendingRequest} onClick={deleteField}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}