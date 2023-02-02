export default class ChatContainer {
  static addUser(nickname) {
    const usersList = document.querySelector('.chat-users');
    usersList.insertAdjacentHTML('beforeend', `
    <div class='user-container'>
    <div class='user-elem'></div>
    <div>${nickname}</div>
    </div>
    `);
  }

  static showChatUser(nickname) {
    const usersList = document.querySelector('.chat-wrap');
    usersList.insertAdjacentHTML('beforeend', `
    <div class='chat-user'>Чат открыт: <span data-user='active'>${nickname}<span></div>
    `);
  }

  static delChatUser() {
    const chatUser = document.querySelector('.chat-user');
    chatUser.remove();
  }

  static delOutUser(nickname) {
    const usersList = document.querySelectorAll('.user-container');
    for (const elem of usersList) {
      if (elem.lastElementChild.textContent === nickname) {
        elem.remove();
        break;
      }
    }
  }

  static showOutBtn() {
    document.querySelector('#out-btn')
      .classList.remove('hidden');
    document.querySelector('#inp-btn')
      .classList.add('hidden');
  }

  static showInputBtn() {
    document.querySelector('#out-btn')
      .classList.add('hidden');
    document.querySelector('#inp-btn')
      .classList.remove('hidden');
  }
}
