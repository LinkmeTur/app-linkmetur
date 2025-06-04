export function formatCep(cep: string) {
    const cepClean = cep.replace(/\D/g, '');
    const length = cepClean.length;
    if (length > 8) return cepClean.slice(0, 8).replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
    if (length <= 2) {
        return cepClean;
    } else if (length <= 5) {
        return cepClean.replace(/^(\d{2})(\d)/, '$1.$2');
    } else {
        return cepClean.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
    }
}
