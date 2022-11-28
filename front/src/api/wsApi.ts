import {sendMessageDataType} from '../store/reducers/usersReducer';

const url = 'ws://localhost:5000';

export const wsApi = {
    createSocket(id: number) {
        return new WebSocket(`${url}/users/${id}`);
    },
    sendMessage(data: { msg: sendMessageDataType, ws: WebSocket }) {
        const res = {...data.msg, method: 'message'};
        return data.ws.send(JSON.stringify(res));
    },
    getMessages(id: number, ws: WebSocket) {
      return  ws.send(JSON.stringify({id,method:'get-messages'}))
    },
    connect(ws: WebSocket, id: number) {
        return ws.send(JSON.stringify({method: 'connect', id}));
    },
    disconnect(ws: WebSocket) {
        return ws.send(JSON.stringify({method: 'disconnect'}));
    }
}

export type MessageType = { name: string, theme: string, message: string };