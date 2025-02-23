import React from 'react'
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Grid from '@mui/material/Grid2';
import CustomDialog from '../ui/ModalWithChildren';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Alert, Chip, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
import FileUpload from '../ui/customFileUpload';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';
import { toast } from 'react-toastify';
import { response, userType } from '../../types';

interface props {
    FieldData: response
    userData: userType
}
export default function FieldEditButton(props: props) {
    const [pendingRequest, setPendingRequest] = useState(false)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [emptyIndicesState, setEmptyIndicesState] = useState<number[]>([])
    function findEmptyStringIndices(variables: string[]): number[] {
        return variables
            .map((variable, index) => (variable === "" ? index : -1))
            .filter(index => index !== -1);
    }
    const [fieldType, setFieldType] = useState(props.FieldData.type);
    const [StartTime, setStartTime] = useState(props.FieldData.startTime as string);
    const handleFieldTypeChange = (event: SelectChangeEvent) => {
        setFieldType(event.target.value as string);
    };
    const handleStartTimeChange = (event: SelectChangeEvent) => {
        setStartTime(event.target.value as string);
    };
    const placeholders = [
        "5v5",
        "club",
        "matches",
        "popular",
    ];
    const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const firstInputValue = (form.elements[0] as HTMLInputElement).value;
        setChipData((chips) => [...chips, firstInputValue]);
        console.log(firstInputValue);
    };
    const [chipData, setChipData] = useState<string[]>(props.FieldData.tags);
    const handleChipDelete = (chipToDelete: string) => () => {
        console.log(chipToDelete);
        const data = chipData.filter((chip) => chip !== chipToDelete)
        setChipData(data);
    };
    const formRef = useRef(null);
    const BaseURL = import.meta.env.VITE_BASE_URL;

    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleConfirmAction = async () => {
        if (formRef.current) {

            var formData = new FormData(formRef.current);
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            formData.append("tags", JSON.stringify(chipData))
            Array.from(Images).forEach((image) => {
                formData.append('Images', image);  // Append each image under the 'Images' key
            });
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            console.log(formData);
            const strings = [formJson.title, formJson.ownedBy, formJson.location, formJson.price, formJson.address, formJson.hourCount, formJson.ownerPhone]
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
                        errorsArray.push("Owner is required")
                        break;
                    case 2:
                        errorsArray.push("Location is required")
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
            if (formJson.price < 0) {
                toast.error("price cannot be below zero", {
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
            if (formJson.hourCount < 0 || formJson.hourCount > 24) {
                toast.error("working hours cannot be below zero or above 24!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log("working hours cannot be below zero or above 24!");

                return
            }
            setValidationErrors([])
            setEmptyIndicesState([])
        } else {
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
        try {
            const response = await axios.put(BaseURL + "field/" + props.FieldData._id + "/" + props.userData._id, formData);
            queryClient.refetchQueries({ queryKey: ['FieldDetails' + props.FieldData._id] });
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

        toast.success("Field Data Changed successfully!", {
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
    const validatePhone = (value: string) => {
        const phoneRegex = /^01[0-9]{9}$/; // Adjust regex as needed
        return phoneRegex.test(value);
    };
    const [phone, setPhone] = useState(props.FieldData.ownerPhone || "");
    const [phoneError, setPhoneError] = useState(false);
    const handlephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPhone(value);
        setPhoneError(!validatePhone(value)); // Show error if invalid
    };
    return (
        <>
            <CustomDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                isDisabled={pendingRequest || fieldType == "select_field_type" || StartTime == "select_start_time"}
                onConfirm={() => handleConfirmAction()}
                title="Edit Field info"
                confirmColor='primary'
                confirmText={pendingRequest ? "Loading" : "Confirm"}
                cancelText="cancel"
            >
                {validationErrors.map((item, index) => (
                    <Alert className='my-1' key={index} severity="error">{item}.</Alert>
                ))}
                <form className='mt-5' ref={formRef}>
                    <Grid container spacing={2} rowSpacing={1}>
                        <Grid size={6}><TextField defaultValue={props.FieldData.title} error={emptyIndicesState.includes(0)} required fullWidth id="title" name='title' label="Title" variant="outlined" /></Grid>
                        <Grid size={6}><TextField defaultValue={props.FieldData.ownedBy} error={emptyIndicesState.includes(1)} required fullWidth id="ownedBy" name='ownedBy' label="Owned by" variant="outlined" /></Grid>
                        <Grid size={6}><TextField defaultValue={props.FieldData.price} error={emptyIndicesState.includes(3)} required fullWidth id="price" name='price' label="price" variant="outlined" type='number' inputProps={{ min: 0 }} /></Grid>
                        <Grid size={6}><TextField defaultValue={props.FieldData.address} error={emptyIndicesState.includes(4)} required fullWidth id="address" name='address' label="address" variant="outlined" /></Grid>
                        <Grid size={12}><TextField defaultValue={props.FieldData.location} error={emptyIndicesState.includes(2)} required fullWidth id="location" name='location' label="Google maps Location" variant="outlined" /></Grid>
                        <Grid size={6}>
                            <Select
                                required
                                className="overflow-hidden"
                                labelId="type"
                                id="type"
                                variant='outlined'
                                fullWidth
                                name="type"
                                value={fieldType}
                                label="type"
                                onChange={handleFieldTypeChange}
                            >
                                <MenuItem value={'select_field_type'}>select field type (required*)</MenuItem>
                                <MenuItem value={'soccer'}>Soccer</MenuItem>
                                <MenuItem value={'pool-billiard'}>Pool billiards</MenuItem>
                                <MenuItem value={'swimming-pool'}>Swimming pool</MenuItem>
                                <MenuItem value={'paddle'}>Paddle ball</MenuItem>
                            </Select>
                        </Grid>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(6) || phoneError} type='tel'
                            value={phone}
                            onChange={handlephoneChange}
                            helperText={phoneError ? "Enter a valid phone number (11 digits and starts with 01)" : ""} inputProps={{ min: 0, max: 24 }} required fullWidth id="ownerPhone" name='ownerPhone' label="whatsapp number" variant="outlined" /></Grid>
                        <Grid size={6}>
                            <Select
                                required
                                className="overflow-hidden"
                                labelId="start time"
                                id="start time"
                                variant='outlined'
                                fullWidth
                                name="start time"
                                value={StartTime}
                                label="start time"
                                onChange={handleStartTimeChange}
                            >
                                <MenuItem value={'select_start_time'}>select start time (required*)</MenuItem>
                                <MenuItem value={'12 pm'}>12 pm</MenuItem>
                                <MenuItem value={'1 pm'}>1 pm</MenuItem>
                                <MenuItem value={'2 pm'}>2 pm</MenuItem>
                                <MenuItem value={'3 pm'}>3 pm</MenuItem>
                                <MenuItem value={'4 pm'}>4 pm</MenuItem>
                                <MenuItem value={'5 pm'}>5 pm</MenuItem>
                                <MenuItem value={'6 pm'}>6 pm</MenuItem>
                                <MenuItem value={'7 pm'}>7 pm</MenuItem>
                                <MenuItem value={'8 pm'}>8 pm</MenuItem>
                                <MenuItem value={'9 pm'}>9 pm</MenuItem>
                                <MenuItem value={'10 pm'}>10 pm</MenuItem>
                                <MenuItem value={'11 pm'}>11 pm</MenuItem>
                                <MenuItem value={'12 am'}>12 am</MenuItem>
                                <MenuItem value={'1 am'}>1 am</MenuItem>
                                <MenuItem value={'2 am'}>2 am</MenuItem>
                                <MenuItem value={'3 am'}>3 am</MenuItem>
                                <MenuItem value={'4 am'}>4 am</MenuItem>
                                <MenuItem value={'5 am'}>5 am</MenuItem>
                                <MenuItem value={'6 am'}>6 am</MenuItem>
                                <MenuItem value={'7 am'}>7 am</MenuItem>
                                <MenuItem value={'8 am'}>8 am</MenuItem>
                                <MenuItem value={'9 am'}>9 am</MenuItem>
                                <MenuItem value={'10 am'}>10 am</MenuItem>
                                <MenuItem value={'11 am'}>11 am</MenuItem>
                            </Select>
                        </Grid>
                        <Grid size={6}><TextField defaultValue={props.FieldData.hourCount} error={emptyIndicesState.includes(5)} type='number' inputProps={{ min: 0, max: 24 }} required fullWidth id="hourCount" name='hourCount' label="Working Hours" variant="outlined" /></Grid>

                        <Grid size={12}>
                            <TextField
                                id="note"
                                name="note"
                                label="notes"
                                defaultValue={props.FieldData.note}
                                placeholder={"example: Ball renting costs 25 EGP"}
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
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">You are required to reupload Images for Field when Editing or Field Images are lost </span>
                        </div>
                        <FileUpload onChange={handleFileChange} />
                    </div>
                </form>
                <div className='bg-zinc-100 dark:bg-zinc-800 dark:bg-opacity-20 p-3 rounded'>
                    <div className='mb-2'>
                        <h6>Tags: </h6>
                        <ul className='min-h-8 w-full flex-wrap flex justify-center items-center list-none'>
                            {chipData.map(((chip, index) => (
                                <div key={index} className='m-1'><Chip size="small" onDelete={handleChipDelete(chip)} label={chip} /></div>
                            )))}
                        </ul>
                    </div>

                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </div>
            </CustomDialog>
            <Tooltip title="Edit Field info" followCursor>
                <IconButton onClick={handleOpenDialog} aria-label="delete" color="info">
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    )

}
