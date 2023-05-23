import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket;
  socketSub = new Subject();

  //////////////////////////////////////////////////////////////////
  // SOCKET.IO FRONT END IMPLENTATION
  // https://ass-server-render.onrender.com/
  // DATA SENT TO SERVER
  sendServer(data: any) {
    this.socket = io('http://localhost:3000/');
    this.socket.emit('custom-event', data);
  }

  // DATA RECEIVED FROM SERVER
  receiveServer() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('receive-message', (data) => {
      this.socketSub.next(data);
    });
  }
  //////////////////////////////////////////////////////////////////
}
