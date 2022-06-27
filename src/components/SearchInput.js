import BaseComponent from "./BaseComponent.js";
export default class SearchInput extends BaseComponent {
  constructor($parent, props) {
    super($parent, props, {
      tag: "form",
      className: "SearchInput",
      styles: {},
    });
    this.state = { query: "", $input: null };
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
  render() {
    this.state.$input = this.createInputEl();
    this.$el.append(this.state.$input);
    this.$el.addEventListener("submit", this.createSubmitEvnt());
    const debounce = (callback, delay) => {
      let timeId;

      return (e) => {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(callback, delay, e);
      };
    };
    this.$el.addEventListener("keyup", debounce(this.createKeyupEvnt(), 1000));
  }
  createSubmitEvnt() {
    return (e) => {
      e.preventDefault();
    };
  }
  createKeyupEvnt() {
    return (e) => {
      const preventKeys = [
        "Enter",
        "ArrowUp",
        "ArrowDown",
        "ArrowRight",
        "ArrowLeft",
      ];
      const { key } = e;
      if (preventKeys.indexOf(key) !== -1) {
        e.preventDefault();
        return;
      }
      const validation = /[\#\%\^\&\\]/;
      let regExp = new RegExp(validation, "g");
      if (regExp.test(e.target.value)) {
        alert("사용할 수 없는 문자열을 제거합니다.");
        e.target.value = e.target.value.replace(regExp, "");
      }

      this.props.onChange(e.target.value);
    };
  }
  createInputEl() {
    const $input = document.createElement("input");
    $input.classList.add("SearchInput__input");
    $input.type = "text";
    $input.placeholder = "프로그램 언어를 입력하세요.";
    $input.value = this.state.query;
    $input.autofocus = true;
    return $input;
  }
}
