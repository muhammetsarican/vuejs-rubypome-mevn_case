module.exports.getDayNumberOfToday = () => new Date().getDate();
module.exports.getLastDayOfCurrentMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
module.exports.convertToMonthStartDateFormat = (date = new Date()) => `${date.getFullYear()}-${this.addZeroToDate(date.getMonth() + 1)}`;
module.exports.addZeroToDate = (date) => date < 10 ? `0${date}` : date;