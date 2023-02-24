import ChatContainer from './chat-container';
import ChatWindow from './chat_window';

export default class Requests {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  async getUsers(activeName) {
    const usersBlock = document.querySelector('.chat-users');
    usersBlock.replaceChildren();
    const response = await fetch(`${this.baseUrl}users`);
    let users = await response.json();
    if (users.length > 0) {
      users.forEach((elem) => {
        ChatContainer.addUser(elem.nickname);
      });
    } 
    if (activeName) {
      ChatContainer.showActiveUser(activeName);
    }    
  }
  
  async getMessages() {
    const msgBlock = document.querySelector('.msg-block');
    msgBlock.replaceChildren();
    const response = await fetch(`${this.baseUrl}messages`);
    const messages = await response.json();
    messages.forEach((elem) => {
      ChatWindow.showMsg(elem);
    });
  }
  
  inputUser(ws) {
    const nickname = document.querySelector('.modal-name').value;
    if (!nickname) {
      alert('Заполните поле');
      return;
    }
    const message = {
      type: 'input',
      name: nickname,
    };
    ws.send(JSON.stringify(message));
  }
  
  outUser(ws, nickname) {
    const message = {
      type: 'output',
      name: nickname,
    };
    ws.send(JSON.stringify(message));
  }
  
  sendMsg(ws, nickname, content) {
    const newDate = Date.now();
    const message = {
      type: 'send_msg',
      name: nickname,
      date: ChatWindow.msgDate(newDate),
      content,
    };
    ws.send(JSON.stringify(message));
  }
}
