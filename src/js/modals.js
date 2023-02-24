export default class Modals {
  static createModal() {
    const modalWrap = Modals.modalWrap();
    modalWrap.insertAdjacentHTML('beforeend', `<div class='modal-container'>
    <p>Выберите псевдоним</p>
    <form name='set_nickname'>
    <input name='nickname' class='modal-name'>
    </form>
    <div class='modal-btns'>
    <button class='modal-btn' id='mod-cansel-btn'>Отмена</button>
    <button class='modal-btn' id='mod-ok-btn'>Продолжить</button>
    </div>
    </div>`);
    const modn = document.forms.set_nickname.nickname;
    modn.focus();
  }
  
  static modalWrap() {
    const modalWrap = document.createElement('div');
    modalWrap.dataset.modal = 'modal-wrap';
    modalWrap.classList.add('modal-wrap');
    document.body.append(modalWrap);
    return modalWrap;
  }
  
  static closemodal() {
    const modalWrap = document.querySelector('[data-modal=modal-wrap]');
    modalWrap.remove();
  }
}
