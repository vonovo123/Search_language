import BaseComponent from "./BaseComponent.js";
export default class Suggestion extends BaseComponent {
  constructor($parent, props) {
    super($parent, props, {
      tag: "div",
      className: "Suggestion",
      styles: { display: "none" },
    });
    this.state = { languages: [], query: "", $ul: null, selIdx: 0 };
    window.addEventListener("keyup", this.createKeyupEvnt());
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
  render() {
    this.$el.style.display = "none";
    if (this.state.$ul) this.$el.removeChild(this.state.$ul);
    this.state.$ul = null;
    const { languages, selIdx } = this.state;
    if (!languages || languages.length === 0) return;
    this.state.$ul = this.createUl(languages, selIdx);
    this.$el.append(this.state.$ul);
    this.$el.style.display = "block";
  }
  createKeyupEvnt() {
    return (e) => {
      if (!this.state.$ul) return;
      const allowKeys = ["Enter", "ArrowUp", "ArrowDown"];
      const { key } = e;
      if (allowKeys.indexOf(key) === -1) {
        e.preventDefault();
        return;
      }
      let { selIdx, languages } = this.state;
      if (key !== "Enter") {
        this.state.$ul.childNodes[selIdx].classList.remove(
          "Suggestion__item--selected"
        );
        if (key === "ArrowUp") {
          selIdx -= 1;
          if (selIdx < 0) selIdx += languages.length;
        } else if (key === "ArrowDown") {
          selIdx += 1;
          selIdx %= languages.length;
        }
        this.state.selIdx = selIdx;
        this.state.$ul.childNodes[selIdx].classList.add(
          "Suggestion__item--selected"
        );
        this.props.onChange(selIdx);
      } else {
        this.props.onSelect(languages[this.state.selIdx]);
      }
    };
  }
  createClickEvnt() {
    return (e) => {
      this.state.$ul.childNodes[this.state.selIdx].classList.remove(
        "Suggestion__item--selected"
      );
      const selIdx = e.target.closest("li").dataset["idx"];
      this.state.selIdx = selIdx;
      this.state.$ul.childNodes[selIdx].classList.add(
        "Suggestion__item--selected"
      );
      this.props.onChange(selIdx);
      this.props.onSelect(this.state.languages[this.state.selIdx]);
    };
  }
  createUl(languages, selIdx) {
    const $ul = document.createElement("ul");
    let $li = null;
    languages.forEach((lan, idx) => {
      $li = document.createElement("li");
      $li.setAttribute("data-idx", idx);
      if (idx === selIdx) $li.classList.add("Suggestion__item--selected");
      $li.innerHTML = this.createMatchedHTML(lan, this.state.query);
      $li.addEventListener("click", this.createClickEvnt());
      $ul.append($li);
    });
    return $ul;
  }
  createMatchedHTML(language, query) {
    let $language = `<p>${language}</p>`;
    let regExp = new RegExp("\\" + query, "g");
    $language = $language.replace(
      regExp,
      `<span class=Suggestion__item--matched>${query}</span>`
    );
    return $language;
  }
}
