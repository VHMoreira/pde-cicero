import { format } from "date-fns";

export const dateFormat = (date: Date) => {
    return format(date, 'dd/MM/yyyy HH:mm');
}