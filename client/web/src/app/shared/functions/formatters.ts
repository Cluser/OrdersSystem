export function currencyFormatter(params: any) {
    return params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' zł.';
}