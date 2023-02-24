import Requests from './requests';
import Modals from './modals';
import ChatContainer from './chat-container';
import ChatWindow from './chat_window';

const requests = new Requests('https://mini-chat-u2vq.onrender.com/');
const ws = new WebSocket('wss://mini-chat-u2vq.onrender.com/');
//const requests = new Requests('http://localhost:7070/');
//const ws = new WebSocket('ws://localhost:7070/');
document.addEventListener('DOMContentLoaded', () => {
  let activeName = localStorage.getItem('active_name');
  requests.getUsers(activeName);
  if (!activeName) {
    Modals.createModal();
    
    const canselBtn = document.querySelector('#mod-cansel-btn');
    canselBtn.addEventListener('click', () => {
      Modals.closemodal();
      ChatContainer.showInputBtn();
    });
    
    const okBtn = document.querySelector('#mod-ok-btn');
    okBtn.addEventListener('click', () => {
      requests.inputUser(ws);
    });
    
    document.forms.set_nickname
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      requests.inputUser(ws);
    });
  } else {
    console.log(activeName);
    ChatContainer.showChatUser(activeName);
    ChatContainer.showOutBtn();
    ChatWindow.showChatWindow(ws, requests);
    requests.getMessages();
  }
  
  const inpBtn = document.querySelector('#inp-btn');
  inpBtn.addEventListener('click', () => {
    Modals.createModal();
    const okBtn = document.querySelector('#mod-ok-btn');
    okBtn.addEventListener('click', () => {
      requests.inputUser(ws);
    });
    
    document.forms.set_nickname
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      requests.inputUser(ws);
    });
    
    const canselBtn = document.querySelector('#mod-cansel-btn');
    canselBtn.addEventListener('click', () => {
      Modals.closemodal();
      ChatContainer.showInputBtn();
    });
  });
  
  const outBtn = document.querySelector('#out-btn');
  outBtn.addEventListener('click', () => {
    requests.outUser(ws, activeName);
  });
  
  ws.addEventListener('message', (evt) => {
    const msg = JSON.parse(evt.data);
    switch (msg.type) {
      case 'false_name':
      alert('Имя занято. Введите другое имя');
      break;
      case 'user_ok':
      ChatContainer.addUser(msg.name);
      break;
      case 'input_ok':
      ChatContainer.addUser(msg.added_name);
      ChatContainer.showChatUser(msg.added_name);
      ChatContainer.showActiveUser(msg.added_name);
      ChatContainer.showOutBtn();
      ChatWindow.showChatWindow(ws, requests);
      Modals.closemodal();
      activeName = msg.added_name;
      localStorage.setItem('active_name', msg.added_name);
      requests.getMessages();
      break;
      case 'out_user':
      //ChatContainer.delOutUser(msg.name);
      requests.getUsers(activeName);
      break;
      case 'logout':
      requests.getUsers(activeName);
      ChatContainer.delChatUser();
      ChatContainer.showInputBtn();
      ChatWindow.closeChatWindow();
      activeName = null;
      localStorage.removeItem('active_name');
      break;
      case 'get_msg':
      ChatWindow.showMsg(msg.msg_data);
    }
  });
});
