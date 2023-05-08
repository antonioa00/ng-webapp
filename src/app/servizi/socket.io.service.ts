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

  passServer(data: any) {
    this.socket = io('http://weak-red-alligator-hat.cyclic.app', {
      transports: ['websocket'],
    });
    this.socket.emit('custom-event', data);
  }

  receiveServer() {
    this.socket = io('http://weak-red-alligator-hat.cyclic.app', {
      transports: ['websocket'],
    });
    this.socket.on('receive-message', (data) => {
      this.socketSub.next(data);
    });
  }
}
