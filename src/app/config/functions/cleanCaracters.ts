export function cleanCaracters(value: string): string {
    return String(value).replace(/\D/g, '');
}
