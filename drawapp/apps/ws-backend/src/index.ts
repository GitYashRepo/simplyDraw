import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({port: 8080});

wss.on('connection', (ws, request) => {
    const url = request.url;
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');
    if (!token) {
        ws.close(1008, "Authentication token missing");
        return;
    }
    if (!JWT_SECRET) {
        ws.close(1011, "Server misconfiguration: JWT secret missing");
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET as string);

    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }

    ws.on('message', function message(data){
        ws.send('something');
    });
})
