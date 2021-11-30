export default class SortableTable {
  constructor(headersConfig, { data = [], sorted = {} } = {}) {
    this.headerConfig = headersConfig;
    this.data = data, 
    this.defaultSorted = sorted,
    this.isSortLocally = true, 
    this.render();
    this.addEventListeners();
  }
  order = true;
  element;
  subElements = {};
  
  getTableHeader() {
    return `
      <div data-element='header' class='sortable-table__header sortable-table__row'>
        ${this.headerConfig
          .map((item) => {
            return `
            <div class='sortable-table__cell' data-id='${item.id}' data-sortable='${item.sortable}'>
            <span>${item.title}</span>
            <span data-element='arrow' class='sortable-table__sort-arrow'>
            <span class='sort-arrow'></span>
            </span>
            </div>`;
          }).join('')}
      </div>`;
  }

  getTableBody() {
    const arr = this.defaultSorted ? this.sortData(
      this.defaultSorted.id,
      this.defaultSorted.order
    ) : this.data;

    return `
      <div data-element='body' class='sortable-table__body'>
        ${this.getTableRows(arr)}
      </div>`;
  }

  getTableRows(data) {
    return data
      .map((item) => {
        return `
          <a href='/products/${item.id}' class='sortable-table__row'>
            ${this.getTableRow(item)}
          </a>`;
      }).join('');
  }

  getTableRow(item) {
    const cells = this.headerConfig.map(({ id, template }) => {
      return { id, template };
    });

    return cells
      .map(({ id, template }) => {
        return template
          ? template(item[id])
          : `<div class='sortable-table__cell'>${item[id]}</div>`;
      })
      .join('');
  }

  getTable() {
    return `
      <div class='sortable-table'>
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTable();

    const element = wrapper.firstElementChild;
    this.element = element;

    this.subElements = this.getSubElements(this.element);
    
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  updateTable(arr) {
    return this.subElements.body.innerHTML = this.getTableBody(arr);
  }

  sort(field, order) {
    if (this.isSortLocally) {
      this.sortOnClient(field, order);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(field, order) {
     const sortedData = this.sortData(field, order);
     const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
     const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id='${field}']`);

     allColumns.forEach((column) => {
       column.dataset.order = '';
     });

     currentColumn.dataset.order = order;

     this.subElements.body.innerHTML = this.getTableRows(sortedData);
     
  }

  sortOnServer() {}

  sortData(field, order) {
    const arr = [...this.data];
    
    const column = this.headerConfig.find((item) => item.id === field);
   
    const {sortType} = column;
    
    const directions = { asc: 1, desc: -1 };
    const direction = directions[order];
    
    return arr.sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], ['ru', 'en']);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  onClickSort = (event) => {
    const order = this.order ? 'asc' : 'desc';
    const element = event.target.closest('.sortable-table__cell').dataset.id;
    this.order = !this.order;
    this.sort(element, order)
  }

  addEventListeners() {
    const tableHeader = this.element.querySelector('.sortable-table__header[data-element]');
    tableHeader.addEventListener('click', this.onClickSort);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
