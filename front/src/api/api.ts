import axios, {AxiosResponse} from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:5000/'
});

export const api = {
    enterToChat(name: string) {
        return $api.post<AxiosResponse, AxiosResponse<UserType>>('users', {name});
    },
    exitFromChat(id: number) {
        return $api.delete<AxiosResponse>(`users/${id}`);
    }
}

export type UserType = {
    id: number
    name: string
}