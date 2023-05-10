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
    this.socket = io('http://localhost:3000/');
    this.socket.emit('custom-event', data);
  }

  // riceve dal server
  receiveServer() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('receive-message', (data) => {
      this.socketSub.next(data);
    });
  }
}
