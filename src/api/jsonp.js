
export default function jsonp(url, opts, fn) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise ((resolve, reject) => {
        originJSONP(url, option, (data, err) => {  
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}
 
function param (data) {
    let url = ''
    for(let i in data){
        const value = data[i] !== undefinted ? data[i] : ''
        url += `&${i} = ${encodeURIComponent(value)} `
     }
    return url ? url.substring(1) : ''
}