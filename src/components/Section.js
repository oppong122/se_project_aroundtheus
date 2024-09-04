export default class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
    console.log(this._items);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

//export default Section;
