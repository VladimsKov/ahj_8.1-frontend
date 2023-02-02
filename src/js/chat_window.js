export default class ChatWindow {
  static showChatWindow(ws, requests) {
    const chatWindow = document.querySelector('#chat');
    chatWindow.insertAdjacentHTML('beforeend', `
    <div class="chat-msg-wrap">
    <div class="inner-msg-wrap">
    <div class="msg-block"></div>
    </div>
    <form id="send-msg" >
    <input name="msg" class="msg-input" placeholder="Введите сообщение">
    </form>
    </div>  
    `);

    const msgForm = document.querySelector('#send-msg');
    msgForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const nickname = document.querySelector('[data-user=active]').textContent;
      const msgContent = msgForm.msg.value;
      if (msgContent) {
        requests.sendMsg(ws, nickname, msgContent);
      }
    });
  }

  static closeChatWindow() {
    document.querySelector('.chat-msg-wrap').remove();
  }

  static showMsg(msg) {
    const msgBlock = document.querySelector('.msg-block');

    if (document.querySelector('[data-user=active]')) {
      const activeUserName = document.querySelector('[data-user=active]').textContent;
      let msgClass = '';
      let msgName = '';
      if (msg.name === activeUserName) {
        msgClass = 'own-msg';
        msgName = 'Вы';
      } else {
        msgClass = 'other-msg';
        msgName = msg.name;
      }
      msgBlock.insertAdjacentHTML('beforeend', `
      <div class = "msg ${msgClass}">
      <span>${msgName}, ${msg.date}</span>
      <div class="msg-text">${msg.content}</div>
      </div>
      `);
      msgBlock.scrollTop = 1000;
      document.querySelector('.msg-input').value = '';
    }
  }

  static msgDate(date) {
    const ticketDate = new Date(date);
    const day = (ticketDate.getDate() < 10)
      ? `0${ticketDate.getDate()}` : ticketDate.getDate();
    const month = (ticketDate.getMonth() < 9)
      ? `0${ticketDate.getMonth() + 1}` : ticketDate.getMonth() + 1;
    const year = (ticketDate.getFullYear());
    const hours = (ticketDate.getHours() < 10)
      ? `0${ticketDate.getHours()}` : ticketDate.getHours();
    const minutes = (ticketDate.getMinutes() < 10)
      ? `0${ticketDate.getMinutes()}` : ticketDate.getMinutes();
    const createDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return createDate;
  }
}
