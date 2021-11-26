export default class ColumnChart {
  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = data => data,
  } = {}) {
    this.data = this.getColumnProps(data),
    this.label = label,
    this.value = formatHeading(value),
    this.link = link,
    this.chartHeight = 50,
    this.render();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale)),
      };
    });
  }

  update(newData) {
    this.data = this.getColumnProps(newData);
  }

  destroy() {
    this.remove();
    this.element = null;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  render() {
    const element = document.createElement('div');
    element.className = this.data.length
      ? 'column-chart'
      : 'column-chart column-chart_loading';
    element.style = `--chart-height: ${this.chartHeight}`;

    const title = ` 
      <div class='column-chart__title'>
        Total ${this.label}
        <a href='/${this.link}${this.label}' class='column-chart__link'>View all</a>
      </div>`;

    const titleValue = `<div data-element='header' class='column-chart__header'>${this.value}</div>`;

    const columnsArray = this.data.map(
      (column) =>
        `<div style='--value: ${column.value}' data-tooltip='${column.percent}'></div>`
    );

    const skeletonBody = `<object type='image/svg+xml' data='./charts-skeleton.svg' />`;

    element.innerHTML = `
      ${title}
       <div class='column-chart__container'>
        ${titleValue}
        <div data-element='body' class='column-chart__chart'>
          ${this.data.length ? columnsArray.join('') : skeletonBody}
        </div>
      </div>
    `;

    this.element = element;
  }
}