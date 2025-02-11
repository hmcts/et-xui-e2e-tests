export default class DateUtilComponent {
    
    static addWeekdays(startDate: Date, days: number): Date {
        let count = 0;
        let currentDate = new Date(startDate);
    
        while (count < days) {
            currentDate.setDate(currentDate.getDate() + 1);
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
        }
    
        return currentDate;
    }
}

