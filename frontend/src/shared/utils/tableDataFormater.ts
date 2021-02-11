import { priceFormat } from "./priceFormat";
import { dateFormat } from "./dateFormat";

export const tableDataFormater = (data: any) => {
    if (typeof data === 'number') {
        return 'R$ ' + priceFormat(data);
    }

    const date = new Date(data);

    if (date.toDateString() !== 'Invalid Date') {
        return dateFormat(date);
    }

    if (data === 'canceled' || data === 'confirmed' || data === 'on_progress') {
        if (data === 'canceled') {
            return 'Cancelado'
        }
        if (data === 'confirmed') {
            return 'Confirmado'
        }
        if (data === 'on_progress') {
            return 'Em Progresso'
        }
    }

    // if(typeof data === 'date')
    return data;
}