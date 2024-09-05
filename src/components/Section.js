export default class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  // public method that renders all elements on the page
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
    console.log(this._items);
  }
  // public method takes a DOM element and adds it to container
  addItem(element) {
    this._container.prepend(element);
  }
}
