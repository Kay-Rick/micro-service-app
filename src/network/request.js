import axios from 'axios'

export function request(config) {
    console.log(appBaseURL)
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        //baseURL: 'http://192.168.1.126:8000/api',
         baseURL: appBaseURL,
        // baseURL: '/api',
        timeout: 20000
    });

    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    });
    instance.interceptors.response.use(res => {
        console.log(res);
        return res
    }, err => {
        return err
    })
    return instance(config);
}