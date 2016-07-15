import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Message } from "./message.model";

@Injectable()
export class MessageService {
    constructor(private http: Http) {}
    
    getMessages() : Observable<any> {
        return this.http.get('http://localhost:3000/messages')
            .map( (data: Response) => {
                const extracted = data.json();
                const msgArray: Messages[] = [];
                let message;
                for(let element of extracted.data) {
                    message = new Message(element.content);
                    msgArray.push(message);
                }
                return msgArray;
            });
    }

    saveMessage(message: Message): Observable {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('http://localhost:3000/message', body, { headers: headers});    
    }
}