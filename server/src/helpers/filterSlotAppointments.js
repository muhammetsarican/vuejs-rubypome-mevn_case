const { getDayNumberOfToday, convertToMonthStartDateFormat, getLastDayOfCurrentMonth, addZeroToDate } = require("./dateOperations");

module.exports.filterSlotAppointments = (data) => {
    const TODAYS_DATE = getDayNumberOfToday();
    const LAST_DAY = getLastDayOfCurrentMonth();
    const END_OF_APPOINTMENT = TODAYS_DATE + 2 <= LAST_DAY ? TODAYS_DATE : LAST_DAY;

    let temp = [];
    for (let dayNumber = TODAYS_DATE; dayNumber <= END_OF_APPOINTMENT + 2; dayNumber++) {
        for (let h = 13; h <= 17; h++) {
            for (let m = 0; m < 60; m += 30) {
                let d = `${convertToMonthStartDateFormat()}-${addZeroToDate(dayNumber)}`;
                let t = `${h}:${m === 0 ? '00' : m}`;
                temp.push({ date: d, time: t });
            }
        }
    }

    let available = temp.filter((slot) => {
        return !data.some((r) => r.date === slot.date && r.time === slot.time);
    });

    return available;
}