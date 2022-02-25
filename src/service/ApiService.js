import { API_BASE_URL } from '../app-config'
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    const headers = new Headers({
        "Content-type": "application/json"
    });

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(response)
        }

        return response.json();
    })
    .catch(error => {
        if (error.status === 403) {
            window.location.href = "/login";
        }
    });
}

export function login(userDto) {
    return call("/auth/login", "POST", userDto)
        .then(response => {
            if (response.token) {
                localStorage.setItem(ACCESS_TOKEN, response.token);
                window.location.href = "/";
            }
        }) 
}

export function logout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/login";
}

export function signup(userDto) {
    return call("/auth/signup", "POST", userDto);
}