export function parseDate(date: string): Date {
    const [month, day, year] = date.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
}

export function parseTime(time: string): Date {
    const [hours, minutes] = time.split(':');
    return new Date(0, 0, 0, Number(hours), Number(minutes));
}

export function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    let month: string = String(date.getMonth() +1).padStart(2, '0');
    let day: string = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}

export function formatTime(date: Date): string {
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const seconds: string = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

export function getDate(datetime: string): string {
    const [date, time] = datetime.split(' ');
    return date;
}

export function getTime(datetime: string): string {
    const [date, time] = datetime.split(' ');
    return time;
}
