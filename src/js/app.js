import Requests from './requests';
import Modals from './modals';
import ChatContainer from './chat-container';
import ChatWindow from './chat_window';

const requests = new Requests('http://localhost:7070/');
const ws = new WebSocket('ws://localhost:7070/');

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
        ChatContainer.showChatUser(msg.added_name);
        ChatContainer.showOutBtn();
        ChatWindow.showChatWindow(ws, requests);
        Modals.closemodal();
        activeName = msg.added_name;
        localStorage.setItem('active_name', msg.added_name);
        requests.getMessages();
        break;
      case 'out_user':
        ChatContainer.delOutUser(msg.name);
        break;
      case 'logout':
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

/* class SubscriptionApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async add(user) {
    const request = fetch(this.apiUrl + 'subscriptions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

    const json = await result.json();
    const status = json.status;

    console.log(status);
  }

} */

// window.api = new SubscriptionApi('http://localhost:7070/subscriptions');
// window.api.add('alex');

// the first part of lecture: topic - fetch
/* (async () => {
  const request = fetch('http://localhost:7070/index');
  const result = await request;
  console.log(result);
  const text = await result.text();
  console.log(text);
})(); */

// WEBSOCKETS

/* const ws = new WebSocket('ws://localhost:7070/ws');
const chat = document.querySelector('.chat');
const chatMessage = document.querySelector('.chat-message');
const chatSend = document.querySelector('.chat-send');
const chatMessages = document.querySelector('.messages');
chatSend.addEventListener('click', () => {
  const message = JSON.stringify(chatMessage.value);

  if (!message) return;
  ws.send(message);
  chatMessage.value = '';
});

ws.addEventListener('open', (e) => {
  console.log(e);

  console.log('ws open');
});

ws.addEventListener('close', (e) => {
  console.log(e);

  console.log('ws close');
});

ws.addEventListener('error', (e) => {
  console.log(e);

  console.log('ws error');
});
ws.addEventListener('message', (e) => {
  console.log(e);
  const outData = JSON.parse(e.data);
  console.log('incoming parset data:');
  console.log(outData);
  const { chat: messages } = outData;
  console.log(messages);
  chatMessages.replaceChildren();
  messages.forEach(message => {
    chatMessages.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
  });
  console.log('ws message');
}); */
