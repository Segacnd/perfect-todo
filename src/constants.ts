export const today = new Date();
export const getNumberOfDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const daycount = getNumberOfDaysInMonth(today);
