export const isTooLate = (timeSlot: string): boolean => {
    const [startTime] = timeSlot.split(" to "); 
    const [startHourStr, startPeriod] = startTime.split(" ");
    const currentDate = new Date();

    // Parse the start time hour from the input
    let startHour = parseInt(startHourStr, 10);

    // Convert the start time to 24-hour format
    if (startPeriod === "pm" && startHour !== 12) {
        startHour += 12; // Convert pm hour to 24-hour format
    } else if (startPeriod === "am" && startHour === 12) {
        startHour = 0; // Handle 12 am (midnight)
    }

    const currentTimeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
    const startTimeInMinutes = startHour * 60;

    // Compare the times and return true if current time is past or equal to start time
    return currentTimeInMinutes >= startTimeInMinutes;
};