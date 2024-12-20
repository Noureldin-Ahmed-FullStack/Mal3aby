import React from 'react'
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Grid from '@mui/material/Grid2';
import CustomDialog from '../ui/ModalWithChildren';
import axios from 'axios';
import { Alert, Chip, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import FileUpload from '../ui/customFileUpload';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';
import { toast } from 'react-toastify';

export default function AddFieldButton() {
    const [pendingRequest, setPendingRequest] = useState(false)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [emptyIndicesState, setEmptyIndicesState] = useState<number[]>([])
    function findEmptyStringIndices(variables: string[]): number[] {
        return variables
            .map((variable, index) => (variable === "" ? index : -1))
            .filter(index => index !== -1);
    }
    const [fieldType, setFieldType] = useState('select_field_type');
    const handleFieldTypeChange = (event: SelectChangeEvent) => {
        setFieldType(event.target.value as string);
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
    const [chipData, setChipData] = useState<string[]>([]);
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
            formData.append("tags", JSON.stringify(chipData))
            Array.from(Images).forEach((image) => {
                formData.append('Images', image);  // Append each image under the 'Images' key
            });
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            const strings = [formJson.title, formJson.ownedBy, formJson.location, formJson.price, formJson.address, formJson.hourCount]
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
            if (formJson.hourCount < 0 || formJson.price < 0) {
                toast.error("working hours or price cannot be below zero!", {
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
        try {
            const response = await axios.post(BaseURL + "field", formData);
            queryClient.refetchQueries({ queryKey: ['fields'] });
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
        }
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
                isDisabled={pendingRequest || fieldType == "select_field_type"}
                onConfirm={() => handleConfirmAction()}
                title="Add Field"
                confirmColor='primary'
                confirmText="Confirm"
                cancelText="cancel"
            >
                {validationErrors.map((item, index) => (
                    <Alert className='my-1' key={index} severity="error">{item}.</Alert>
                ))}
                <form className='mt-5' ref={formRef}>
                    <Grid container spacing={2} rowSpacing={1}>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(0)} required fullWidth id="title" name='title' label="Title" variant="outlined" /></Grid>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(1)} required fullWidth id="ownedBy" name='ownedBy' label="Owned by" variant="outlined" /></Grid>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(3)} required fullWidth id="price" name='price' label="price" variant="outlined" type='number' inputProps={{ min: 0 }} /></Grid>
                        <Grid size={6}><TextField error={emptyIndicesState.includes(4)} required fullWidth id="address" name='address' label="address" variant="outlined" /></Grid>
                        <Grid size={12}><TextField error={emptyIndicesState.includes(2)} required fullWidth id="location" name='location' label="Google maps Location" variant="outlined" /></Grid>
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
                        <Grid size={6}><TextField error={emptyIndicesState.includes(5)} type='number' inputProps={{ min: 0 }} required fullWidth id="hourCount" name='hourCount' label="Working Hours" variant="outlined" /></Grid>

                        <Grid size={12}>
                            <TextField
                                id="note"
                                name="note"
                                label="notes"
                                placeholder={"example: Ball renting costs 25 EGP"}
                                rows={4}
                                className="w-full  custom-textfield"
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
            <button onClick={handleOpenDialog} className="w-full mt-5 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">Add field</button>

        </>
    )
}
