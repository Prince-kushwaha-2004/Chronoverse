import { baseURL } from './services/baseUrl';
import { client } from './services/api/client.gen'


client.setConfig({
    baseURL: baseURL,
    withCredentials: true,
});

