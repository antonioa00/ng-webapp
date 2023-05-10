import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket;
  socketSub = new Subject();
  constructor() {}

  // manda al server
  sendServer(data: any) {
    this.socket = io('https://ass-server-render.onrender.com/');
    this.socket.emit('custom-event', data);
  }

  // riceve dal server
  receiveServer() {
    this.socket = io('https://ass-server-render.onrender.com/');
    this.socket.on('receive-message', (data) => {
      this.socketSub.next(data);
    });
  }
}
