export function currencyFormatter(params: any, currency?: string) {

    console.log(params)
    if (params.value) { 
        return parseFloat(params.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + currency;
    } else { 
        return '' 
    }
}