export function formatCNPJ(value: string): string {
    // Remove tudo que não for número
    const cleanValue = value.replace(/\D/g, '');
    const length = cleanValue.length;

    if (length > 14)
        return cleanValue
            .slice(0, 14)
            .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5');

    // Aplica a máscara conforme o tamanho do CNPJ
    if (length <= 2) {
        return cleanValue;
    } else if (length <= 5) {
        return cleanValue.replace(/^(\d{2})(\d)/, '$1.$2');
    } else if (length <= 8) {
        return cleanValue.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2.$3');
    } else if (length <= 12) {
        return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d)/, '$1.$2.$3/$4');
    } else {
        return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
}
