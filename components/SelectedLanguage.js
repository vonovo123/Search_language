import BaseComponent from "./BaseComponent.js";
export default class SelectedLanguage extends BaseComponent {
  constructor($parent, props) {
    super($parent, props, {
      tag: "div",
      className: "SelectedLanguage",
      styles: {},
    });
    this.state = { selLanguages: [], $ul: null };
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
  render() {
    if (this.state.$ul) this.$el.removeChild(this.state.$ul);
    this.state.$ul = null;
    const { selLanguages } = this.state;
    this.state.$ul = this.createUl(selLanguages);
    this.$el.append(this.state.$ul);
  }
  createUl(selLanguages) {
    const $ul = document.createElement("ul");
    let $li = null;
    selLanguages.forEach((lan, idx) => {
      $li = document.createElement("li");
      $li.innerText = lan;
      $ul.append($li);
    });
    return $ul;
  }
}
