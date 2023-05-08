import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket;
  camillo = new Subject();
  constructor() {}
  connect() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('hello', (status) => {
      console.log(status);
    });
  }

  passServer(data: any) {
    this.socket = io('http://localhost:3000/');
    this.socket.emit('custom-event', data);
  }

  receiveServer() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('receive-message', (data) => {
      this.camillo.next(data);
    });
  }
}
