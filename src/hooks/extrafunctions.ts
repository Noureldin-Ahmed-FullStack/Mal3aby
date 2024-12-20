export const isTooLate = (timeSlot: string, selected_Date: string): boolean => {
    const [startTime] = timeSlot.split(" to ");
    const [startHourStr, startPeriod] = startTime.split(" ");
    const currentDate = new Date();
    // Parse the start time hour from the input

    if (!selected_Date || compareDates(selected_Date, currentDate.toLocaleDateString('en-GB'))) {
        return false
    }

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

function compareDates(date1: string, date2: string): boolean {
    // Parse the date strings in "DD/MM/YYYY" format
    const [day1, month1, year1] = date1.split('/').map(Number);
    const [day2, month2, year2] = date2.split('/').map(Number);

    // Create Date objects
    const parsedDate1 = new Date(year1, month1 - 1, day1);
    const parsedDate2 = new Date(year2, month2 - 1, day2);

    // Compare the dates
    if (parsedDate1 > parsedDate2) {
        return true
    } else if (parsedDate1 < parsedDate2) {
        return false
    } else {
        return false
    }
}