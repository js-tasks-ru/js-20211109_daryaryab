export default class ColumnChart {
  constructor({ data = [], label = '', value = 0, link = '', chartHeight = 50, formatHeading} = {}) {
    this.data = this.getColumnProps(data),
    this.label = label,
    this.value = this.getFormattingValue(value),
    this.link = link,
    this.chartHeight = chartHeight,
    this.formatHeading = formatHeading,
    this.render();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  getFormattingValue(value) {
    return this.formatHeading ? this.formatHeading(value) : value;
  }

  update(newData) {
    this.data = this.getColumnProps(newData);
  }

  destroy() {
    this.element = null;
  }

  remove() {
    const node = document.getElementById(this.label);

    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  render() {
    console.log(this.value)
    const formattingValue = this.formatHeading ? this.formatHeading(this.value/1000) : this.value;
    const element = document.createElement('div');
    element.className = (this.data.length) ? 'column-chart' : 'column-chart column-chart_loading';
    element.style = '--chart-height: ${this.chartHeight}';

    const title = ` 
      <div class='column-chart__title'>
        Total ${this.label}
        <a href='/${this.link}${this.label}' class='column-chart__link'>View all</a>
      </div>`;

    const columnsArray = this.data.map(column => `<div style='--value: ${column.value}' data-tooltip='${column.percent}'></div>`);
    const columnsContainer = `
      <div class='column-chart__container'>
        <div data-element='header' class='column-chart__header'>${formattingValue}</div>
        <div data-element='body' class='column-chart__chart'>
          ${columnsArray.join('')}
        </div>
      </div>`;
    
    const skeletonBody = `<object type='image/svg+xml' data='./charts-skeleton.svg' />`;

    
    const skeleton = `
      ${title}
      ${skeletonBody}
    `;

    const charts = ` 
      ${title}
      ${columnsContainer}
    `;
   
    element.innerHTML = `${this.data.length ? charts : skeleton}`;

    this.element = element;
  }
}