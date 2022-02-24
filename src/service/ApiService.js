import { API_BASE_URL } from '../app-config'

export function call(api, method, request) {
    let options = {
        headers: new Headers({
            "Content-type": "application/json"
        }),
        url: API_BASE_URL + api,
        method: method
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => 
        response.json().then(json => {
            // console.log(json)
            if (!response.ok) {
                return Promise.reject(json)
            }
            return json;
        })
    )
}