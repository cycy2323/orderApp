import request from '../utils/requestFetch'

// const proxy = '/apis'
const proxy = 'https://wd9777183800mbsljr.wilddogio.com'
export function Reg(params){
    console.log(params)
    return request(proxy + '/users.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
        body: JSON.stringify(params)
    })
}
