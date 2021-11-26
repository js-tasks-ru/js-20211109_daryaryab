export default class SortableTable {
  constructor(
    headerConfig = [id = '', title = '', sortable = false, template = data = []],
    data = []
  ) {
    this.headerConfig = headerConfig, 
    this.data = data, 
    this.render();
  }

  static compare(fieldValue, orderValue, arr) {
    const resultArray = [...arr]
    
    const options = { sensitivity: 'case', caseFirst: 'upper' };
    const locale = ['ru', 'en'];
    const collator = new Intl.Collator(locale, options);

    if (orderValue === 'asc') {
      resultArray.sort((a, b) =>
        collator.compare(a[fieldValue], b[fieldValue])
      );
    } else if (orderValue === 'desc') {
      resultArray.sort((a, b) => {
        collator.compare(b[fieldValue], a[fieldValue])
      });
    }

    return resultArray;
  }

  update(data) {
    this.data = data;
    
    this.render();
  }

  sort(fieldValue, orderValue) {
    const data = this.constructor.compare(fieldValue, orderValue, this.data);
    this.update(data);
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

  createHeader() {
    const headerTitle = this.headerConfig.map((item) => {
      const arrow = item.sortable ? `<span data-element='arrow' class='sortable-table__sort-arrow'><span class='sort-arrow'></span></span>` : '';

      return `
        <div class='sortable-table__cell' data-id='${item.id}' data-sortable='${item.sortable}' data-order='asc'>
          <span>${item.title}</span>
          ${arrow}
        </div>
      `;
    });

    return `
      <div data-element='header' class='sortable-table__header sortable-table__row'>
        ${headerTitle.join('')}
      </div>
    `;
  }

  createTableRow() {
    const tableRows = this.data.map((item) => {
      return `
         <a href='/products/3d-ochki-epson-elpgs03' class='sortable-table__row'>
          <div class='sortable-table__cell'>
            <img class='sortable-table-image' alt='Image' src='${item.images[0].url}'>
          </div>
          <div class='sortable-table__cell'>${item.title}</div>

          <div class='sortable-table__cell'>${item.quantity}</div>
          <div class='sortable-table__cell'>${item.price}</div>
          <div class='sortable-table__cell'>${item.sales}</div>
        </a>
      `;
    });
    return `
      <div data-element='body' class='sortable-table__body'>
       ${tableRows.join('')}
      </div>
    `;
  }

  get template() {
    return `
            <div data-element='productsContainer' class='products-list__container'>
              <div class='sortable-table'>
                ${this.createHeader()}
                ${this.createTableRow()}
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

