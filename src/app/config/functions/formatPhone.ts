export const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const length = cleaned.length;
    if (length > 11)
        return cleaned.slice(0, 11).replace(/^(\d{2})(\d)(\d{4})(\d)/, '($1) $2 $3-$4'); // Garante no máximo 11 dígitos

    if (length <= 2) {
        return cleaned;
    } else if (length <= 6) {
        return cleaned.replace(/^(\d{2})(\d)/, '($1) $2');
    } else if (length <= 10) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d)/, '($1) $2-$3');
    } else {
        return cleaned.replace(/^(\d{2})(\d)(\d{4})(\d)/, '($1) $2 $3-$4');
    }
};

export const validatePhone = (value: string): boolean => {
    return value.replace(/\D/g, '').length === 11; // Verifica se há exatamente 11 dígitos
};
