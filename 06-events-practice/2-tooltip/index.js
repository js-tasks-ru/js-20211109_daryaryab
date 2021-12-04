class Tooltip {
  static activeTooltip;

  onPointerOver = (event) => {
    const element = event.target.closest('[data-tooltip]');

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  };

  onPointerMove = (event) => {
    this.moveTooltip(event);
  };

  onPointerOut = () => {
    this.remove();
    document.removeEventListener('pointermove', this.onPointerMove);
  };

  constructor() {
    if (Tooltip.activeTooltip) {
      return Tooltip.activeTooltip;
    }

    Tooltip.activeTooltip = this;
  }

  render(html) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = html;

    document.body.append(this.element);
  }

  initialize() {
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  moveTooltip(event) {
    this.element.style.left = `${event.clientX}px`;
    this.element.style.top = `${event.clientY}px`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
