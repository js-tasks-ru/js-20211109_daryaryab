class Tooltip {
  static activeTooltip;
  element;

  constructor(text) {
    this.text = text;
    this.addEventListeners();
  }

  render(event) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
    const element = wrapper.firstElementChild;
    this.element = element;

    this.element.innerText = this.text ? this.text : "";
    this.element.style.left = event ? `${event.clientX}px` : 0;
    this.element.style.top = event ? `${event.clientY}px` : 0;
    this.initialize();
  }

  initialize = () => {
    if (Tooltip.activeTooltip) {
     Tooltip.activeTooltip.remove();
    }
   
    document.body.append(this.element);
    
    Tooltip.activeTooltip = this;
  };

  get template() {
    return `<div class="tooltip">${this.text}</div>`;
  }

  addEventListeners() {
    const elements = document.querySelectorAll("[data-tooltip]");

    elements.forEach((element) => {
      element.addEventListener("pointerover", (event) => {
        this.text = element.closest("[data-tooltip]").dataset.tooltip;

        this.render(event);
      });
    });
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    Tooltip.activeTooltip = null;
  }
}

export default Tooltip;
