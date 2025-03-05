import axios from "axios";

class AppAxios {
    constructor() {
        const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
        const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

        // const baseURL = `http://${SERVER_HOST}:${SERVER_PORT}/api`;
        const baseURL = "/api";

        this.request = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Headers': 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent, X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE,PATCH',
            }
        });
    }

    setHeader(token) {
        this.request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const appAxios = new AppAxios();