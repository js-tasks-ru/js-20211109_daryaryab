export default class NotificationMessage {
  static activeNotification;
  element;
  timerId;

  constructor(text = '', { duration = 0, type = '' } = {}) {
    this.text = text,
    this.duration = duration,
    this.durationInSeconds = `${this.duration / 1000}s`,
    this.type = type,
    this.render();
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }

  remove() {
    clearTimeout(this.timeoutId);

    if (this.element) {
      this.element.remove();
    }
  }

  show(parent = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    
    parent.append(this.element);
    
    this.timerId = setTimeout(
      () => this.remove(),
      this.duration
    );

    NotificationMessage.activeNotification = this;
  }

  get template() {
    return `
      <div class='notification ${this.type}' style='--value:${this.durationInSeconds}'>
        <div class='timer'></div>
        <div class='inner-wrapper'>
          <div class='notification-header'>Notification</div>
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
  }
}
