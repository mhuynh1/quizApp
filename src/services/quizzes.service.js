import axios from "../axiosConfig/axios"

const baseUrl = `http://localhost:8080/api/quizzes`;

export function create(quiz) {
    const config = {
        method: "POST",
        data: quiz
    };

    return axios(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

export function readAll() {
    const config = {
        method: "GET"
    };

    return axios(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

export function readById(id) {
    const config = {
        method: "GET"
    };

    return axios(`${baseUrl}/${id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

export function _delete(id) {
    const config = {
        method: "DELETE",
        data: id
    };

    return axios(`${baseUrl}/${id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

export function update(id, data) {
    const config = {
        method: "PUT",
        data: data
    };

    return axios(`${baseUrl}/${id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
    return response.data
};

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
};