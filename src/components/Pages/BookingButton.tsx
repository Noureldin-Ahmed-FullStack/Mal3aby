import React from 'react'
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CustomDialog from '../ui/ModalWithChildren';
import axios, { AxiosError } from 'axios';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { isTooLate } from '../../hooks/extrafunctions';
import { useAvailability } from '../../hooks/FetchBookings';
import { useQueryClient } from '@tanstack/react-query';
interface FieldDataType {
    _id: string,
    price: number,
    title: string
}
export default function BookingButton(FieldData: FieldDataType) {
    const { userData } = useUserContext();
    const [pendingRequest, setPendingRequest] = useState(false)
    const [ChosenDate, setChosenDate] = useState('');
    const [TimeSlot, setTimeSlot] = useState('default');
    const { data, isLoading ,isError} = useAvailability(FieldData._id, ChosenDate);
    const queryClient = useQueryClient();
    const handleFieldTypeChange = (event: SelectChangeEvent) => {
        setTimeSlot(event.target.value as string);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const handleConfirmAction = async () => {
        setPendingRequest(true)
        const body = {
            fieldID: FieldData._id,
            userID: userData?._id,
            date: ChosenDate,
            time: TimeSlot,
            price: FieldData.price,
        }
        try {
            const response = await axios.post(BaseURL + 'booking/' + userData?._id, body)
            queryClient.refetchQueries({ queryKey: ['availability'] });
            console.log(response);
            setPendingRequest(false)
        } catch (error) {
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
            <MenuItem disabled={isTooLate(slot) || data?.includes(slot)} key={index} value={slot}>{slot} {(isTooLate(slot) || data?.includes(slot) && "(Taken or Unavailable)")}</MenuItem>
        ));
    }

    // Example Usage
    const slots = generateTimeSlots({ hours: 8, startTime: "11 am" });


    const handleTabsChange = (
        _event: React.MouseEvent<HTMLElement>,
        newChosenDate: string,
    ) => {
        setTimeSlot("default")
        setChosenDate(newChosenDate);
    };
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
                    onClose={handleCloseDialog}
                    isDisabled={pendingRequest || TimeSlot == "default" || ChosenDate == "" || isLoading || isError}
                    onConfirm={() => handleConfirmAction()}
                    title={"Book " + FieldData.title + " Field for " + FieldData.price + "egp?"}
                    confirmColor='primary'
                    confirmText="Confirm"
                    cancelText="cancel"
                >
                    <ToggleButtonGroup
                        fullWidth
                        className='my-1'
                        color="primary"
                        value={ChosenDate}
                        exclusive
                        onChange={handleTabsChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value={currentDate.toLocaleDateString('en-GB')}>Today <br />({currentDate.toLocaleDateString('en-GB')})</ToggleButton>
                        <ToggleButton value={tomorrow.toLocaleDateString('en-GB')}>Tomorrow <br />({tomorrow.toLocaleDateString('en-GB')})</ToggleButton>
                        <ToggleButton value={dayAfterTomorrow.toLocaleDateString('en-GB')}>Day after tomorrow <br />({dayAfterTomorrow.toLocaleDateString('en-GB')})</ToggleButton>
                    </ToggleButtonGroup>
                    <p>Pick session time</p>
                    <Select
                        required
                        className="overflow-hidden"
                        labelId="appointment"
                        id="appointment"
                        variant='outlined'
                        fullWidth
                        name="appointment"
                        value={TimeSlot}
                        label="appointment"
                        onChange={handleFieldTypeChange}
                    >
                        <MenuItem value={'default'}>-- Pick session time --</MenuItem>
                        {slots}
                    </Select>
                </CustomDialog>
                <button onClick={handleOpenDialog} className="px-4 py-2 w-full mt-5 rounded-xl hover:text-white bg-black dark:bg-white dark:text-black text-white text-xs font-bold">Book</button>
            </>
        )
    } else {
        return <Button variant='contained' className='!mt-5' fullWidth disabled>Log in First to book</Button>
    }

}
