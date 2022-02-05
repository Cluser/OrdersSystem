export function currencyFormatter(params: any) {
    return params.value.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' zł';
}