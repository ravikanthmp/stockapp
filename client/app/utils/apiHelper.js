const API_HOST = "http://localhost:8000/"

// Cuurently fetches LIVE
export function fetchStock(tickerName){
    return fetch(API_HOST + `stocks/fetchHistorical/${tickerName}`)
}