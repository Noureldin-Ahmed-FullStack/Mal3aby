import React from 'react'
import { useState } from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid2';
import CustomDialog from '../ui/ModalWithChildren';
import axios, { AxiosError } from 'axios';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { isTooLate } from '../../hooks/extrafunctions';
import { useAvailability } from '../../hooks/FetchBookings';
import { useQueryClient } from '@tanstack/react-query';
interface FieldDataType {
    _id: string,
    price: number,
    owner: string,
    title: string,
    startTime: string,
    hourCount: number
}
export default function BookingButton(FieldData: FieldDataType) {
    const { userData } = useUserContext();
    const [pendingRequest, setPendingRequest] = useState(false)
    const [ChosenDate, setChosenDate] = useState('');
    const [TimeSlot, setTimeSlot] = useState('default');
    const { data, isLoading, isError } = useAvailability(FieldData._id, ChosenDate);

    const queryClient = useQueryClient();
    const handleFieldTypeChange = (event: SelectChangeEvent) => {
        setTimeSlot(event.target.value as string);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const validatePhone = (value: string) => {
        const phoneRegex = /^01[0-9]{9}$/; // Adjust regex as needed
        return phoneRegex.test(value);
    };
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const handlephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPhone(value);
        setPhoneError(!validatePhone(value)); // Show error if invalid
    };
    const handleConfirmAction = async () => {
        setPendingRequest(true)
        const body = {
            fieldID: FieldData._id,
            userID: userData?._id,
            clientPhone: phone,
            date: ChosenDate,
            time: TimeSlot,
            price: FieldData.price,
            user: userData,
            owner: FieldData.owner
        }
        console.log(phone);

        try {
            const response = await axios.post(BaseURL + 'booking/' + userData?._id, body)
            await queryClient.refetchQueries({ queryKey: ['availability'] });
            console.log(response.data);
            
            setPendingRequest(false)
            window.location.href = response.data.paymentUrl
        } catch (error) {
            console.log(error);
            
            const axiosError = error as AxiosError;
            toast.error(axiosError.response?.data as string, {
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
        setChosenDate('')
        setTimeSlot("default")
        handleCloseDialog()
    };
    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    };
    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    };
    type TimeSlotProps = {
        hours: number;
        startTime: string;
    };
    function generateTimeSlots({ hours, startTime }: TimeSlotProps): JSX.Element[] {
        const timeSlots: string[] = [];
        let [hour, period] = startTime.split(" ") as [string, string];
        let currentHour = parseInt(hour, 10);

        for (let i = 0; i < hours; i++) {
            // Determine next hour and next period
            const nextHour = currentHour === 12 ? 1 : currentHour + 1;
            const nextPeriod = currentHour === 11 ? (period === "am" ? "pm" : "am") : period;

            // Add current slot to the array
            timeSlots.push(`${currentHour} ${period} to ${nextHour} ${nextPeriod}`);

            // Update current hour and period for the next iteration
            currentHour = nextHour;
            period = nextPeriod;
        }

        return timeSlots.map((slot, index) => (
            <MenuItem disabled={isTooLate(slot, ChosenDate) || data?.includes(slot)} key={index} value={slot}><p>{slot} {((isTooLate(slot, ChosenDate) || data?.includes(slot)) && "(Taken or Unavailable)")}</p></MenuItem>
        ));
    }

    // Example Usage
    const slots = generateTimeSlots({ hours: FieldData.hourCount, startTime: FieldData.startTime });


    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawDate = event.target.value; // YYYY-MM-DD format from input
        const formattedDate = rawDate.split("-").reverse().join("/"); // Convert to DD/MM/YYYY
        console.log(formattedDate);

        setChosenDate(formattedDate);
    };
    // const handleTabsChange = (
    //     _event: React.MouseEvent<HTMLElement>,
    //     newChosenDate: string,
    // ) => {
    //     setTimeSlot("default")
    //     setChosenDate(newChosenDate);
    // };
    const currentDate = new Date();
    const tomorrow = new Date(currentDate); // Create a copy of the current date
    const dayAfterTomorrow = new Date(currentDate); // Create a copy of the current date
    tomorrow.setDate(currentDate.getDate() + 1); // Add 1 day
    dayAfterTomorrow.setDate(currentDate.getDate() + 2); // Add 1 day

    // console.log(isTooLate("4 pm to 5 pm"))

    if (userData && userData._id) {
        return (
            <>
                <CustomDialog
                    open={isDialogOpen}
                    maximizeWidth
                    onClose={handleCloseDialog}
                    isDisabled={pendingRequest || TimeSlot == "default" || ChosenDate == "" || isLoading || isError || phoneError || phone == ''}
                    onConfirm={() => handleConfirmAction()}
                    title={"Book " + FieldData.title + " Field for " + FieldData.price + "egp? (pay 15 egp. now)"}
                    confirmColor='primary'
                    confirmText="Confirm"
                    cancelText="cancel"
                >
                    {/* <ToggleButtonGroup
                        fullWidth
                        className='my-1'
                        color="primary"
                        value={ChosenDate}
                        exclusive
                        onChange={handleTabsChange}
                        aria-label="Platform"
                    >
                        <ToggleButton className='!text-sm sm:!text-base' value={currentDate.toLocaleDateString('en-GB')}>Today <br />({currentDate.toLocaleDateString('en-GB')})</ToggleButton>
                        <ToggleButton className='!text-sm sm:!text-base' value={tomorrow.toLocaleDateString('en-GB')}>Tomorrow <br />({tomorrow.toLocaleDateString('en-GB')})</ToggleButton>
                        <ToggleButton className='!text-sm sm:!text-base' value={dayAfterTomorrow.toLocaleDateString('en-GB')}>Day after tomorrow <br />({dayAfterTomorrow.toLocaleDateString('en-GB')})</ToggleButton>
                    </ToggleButtonGroup> */}
                    {/* <Select
                        required
                        className="overflow-hidden"
                        labelId="start time"
                        id="start time"
                        variant='outlined'
                        fullWidth
                        name="start time"
                        value={ChosenDate}
                        label="start time"
                        onChange={handleTabsChange}
                    >
                        <MenuItem value={'default'}>select start time (required*)</MenuItem>
                        <MenuItem value={'12 pm'}>12 pm</MenuItem>
                    </Select> */}
                    <Grid container className="items-center mt-5 my-3">
                        <Grid size={4}>
                            <TextField
                                label="Select Date"
                                type="date"
                                value={ChosenDate.split("/").reverse().join("-")} // Convert back to YYYY-MM-DD for input
                                onChange={handleDateChange}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    min: new Date().toISOString().split("T")[0] // Sets min date to today
                                }}
                            />
                        </Grid>
                        <Grid size={8} className="relative">
                            <p className='absolute bottom-14'>Pick session time</p>

                            <Select
                                required
                                className="overflow-hidden"
                                labelId="appointment"
                                id="appointment"
                                variant='outlined'
                                fullWidth
                                disabled={isLoading || isError || ChosenDate == ""}
                                name="appointment"
                                value={TimeSlot}
                                label="appointment"
                                onChange={handleFieldTypeChange}
                            >


                                <MenuItem value={'default'}>{isLoading ? "-- Loading --" : "-- Pick session time --"}</MenuItem>
                                {slots}
                            </Select>
                        </Grid>
                    </Grid>


                    <TextField
                        type='tel'
                        error={phoneError}
                        value={phone}
                        onChange={handlephoneChange}
                        helperText={phoneError ? "Enter a valid phone number (11 digits and starts with 01)" : ""} inputProps={{ min: 0, max: 24 }} required fullWidth id="clientPhone" name='clientPhone' label="whatsapp number" variant="outlined" />
                </CustomDialog>
                <button onClick={handleOpenDialog} className="px-4 py-2 w-full mt-5 rounded-xl hover:text-white bg-black dark:bg-white dark:text-black text-white font-bold text-2xl">Book 15 Egp.</button>
            </>
        )
    } else {
        return <Button variant='contained' className='!mt-5' fullWidth disabled>Log in First to book</Button>
    }

}
