import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Grid from '@mui/material/Grid2';
import CustomDialog from '../ui/ModalWithChildren';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import axios from 'axios';
import { Alert, TextField } from '@mui/material';
import FileUpload from '../ui/customFileUpload';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/UserContext';

export default function AddTicketButton() {
    const [pendingRequest, setPendingRequest] = useState(false)
    const { userData } = useUserContext();
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [emptyIndicesState, setEmptyIndicesState] = useState<number[]>([])
    function findEmptyStringIndices(variables: string[]): number[] {
        return variables
            .map((variable, index) => (variable === "" ? index : -1))
            .filter(index => index !== -1);
    }
    const formRef = useRef(null);
    const BaseURL = import.meta.env.VITE_BASE_URL;

    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleConfirmAction = async () => {
        if (!userData) {
            toast.error("Log in first!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        if (formRef.current) {
            var formData = new FormData(formRef.current);
            Array.from(Images).forEach((image) => {
                formData.append('Images', image);  // Append each image under the 'Images' key
            });
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            const strings = [formJson.title, formJson.phone, formJson.content]
            const emptyIndices = findEmptyStringIndices(strings);
            setEmptyIndicesState(findEmptyStringIndices(strings))
            let errorsArray = []
            console.log(emptyIndices); // Output: [1, 3]
            for (let i = 0; i < emptyIndices.length; i++) {
                switch (emptyIndices[i]) {
                    case 0:
                        errorsArray.push("Title is required")
                        break;
                    case 1:
                        errorsArray.push("Phone number is required")
                        break;
                    case 2:
                        errorsArray.push("Complaint is required")
                        break;
                    case 3:
                        errorsArray.push("price is required")
                        break;
                    case 4:
                        errorsArray.push("address is required")
                        break;
                    case 5:
                        errorsArray.push("working hours is required")
                        break;
                    default:
                        break;
                }
                setValidationErrors(errorsArray)
                console.log(errorsArray);
            }
            errorsArray = []
            if (emptyIndices.length != 0) {
                return
            }
            setValidationErrors([])
            setEmptyIndicesState([])
        } else {
            console.log("an error has occured");
            toast.error("an error has occured", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        setPendingRequest(true)
        console.log(formData);

        try {
            const response = await axios.post(BaseURL + "tickets/" + userData?._id, formData);
            queryClient.refetchQueries({ queryKey: ['user-tickets/' + userData?._id] });
            console.log(response);
            setPendingRequest(false)
        } catch (error) {
            console.log(error);
            toast.error("an error has occured", {
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
            handleCloseDialog();
            return
        }

        toast.success("Ticket Created successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        handleCloseDialog();

    };
    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    };
    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    };
    const [Images, setImages] = useState<File[]>([]);
    const handleFileChange = (files: File[]) => {
        setImages(files)
        console.log('Selected files:', files);
    };
    return (
        <>

            <CustomDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                isDisabled={pendingRequest}
                onConfirm={() => handleConfirmAction()}
                title="Create Customer service Ticket"
                confirmColor='primary'
                confirmText={pendingRequest ? "Loading" : "Confirm"}
                cancelText="cancel"
            >
                {validationErrors.map((item, index) => (
                    <Alert className='my-1' key={index} severity="error">{item}.</Alert>
                ))}
                <form className='mt-5' ref={formRef}>
                    <Grid container spacing={2} rowSpacing={1}>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(0)} required fullWidth id="title" name='title' label="Title" variant="outlined" /></Grid>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(1)} required fullWidth id="phone" name='phone' label="phone number" variant="outlined" /></Grid>
                        <Grid size={12}>
                            <TextField
                                error={emptyIndicesState.includes(2)}
                                id="content"
                                required
                                name="content"
                                label="Issue in detail"
                                placeholder={"example: Problem with Booking at field: (link)"}
                                rows={4}
                                className="w-full custom-textfield"
                                multiline
                                InputProps={{
                                    className: 'dark:text-slate-50 dark:placeholder:text-gray-400 ', // Text color and placeholder color
                                    style: { whiteSpace: "pre-line", scrollbarWidth: 'thin' }, // Allow newline in placeholder
                                }}
                                InputLabelProps={{
                                    className: 'dark:!text-white', // Change label color here
                                }}
                            />
                        </Grid>
                    </Grid>


                    <div className="mt-5">
                        <FileUpload onChange={handleFileChange} />
                    </div>
                </form>
            </CustomDialog>
            <button onClick={handleOpenDialog} className="w-full mt-5 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"><SupportAgentIcon className='me-2' />Add Customer Support Ticket!</button>

        </>
    )
}
