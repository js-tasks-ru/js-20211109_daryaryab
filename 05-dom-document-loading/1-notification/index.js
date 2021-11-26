export default class NotificationMessage {
  constructor(text = '', {duration = 0, type=''}={}) {
    this.text = text,
    this.duration = duration,
    this.type = type,
    this.timeoutId = 0,
    this.render()
  }

  static element = this.element;

  destroy() {
    this.remove();
    this.element = null;
  }

  remove() {
    if (this.element) {
      this.element.remove();
      clearTimeout(this.timeoutId);
    }
  }

  show(target) {
    console.log(this.constructor.element)
    const btn = document.getElementById('btn1');
   
    if(target) {
      target.append(this.constructor.element);
    }else {
      btn.after(this.constructor.element);
    }

    this.timeoutId = setTimeout(() => this.element.remove(), this.duration);
  }

  get template() {
    return `
      <div class='notification ${this.type}' style='--value:20s'>
        <div class='timer'></div>
        <div class='inner-wrapper'>
          <div class='notification-header'>${this.type}</div>
          <div class='notification-body'>
            ${this.text}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    this.constructor.element = this.element;
  }
}
