export default class BaseComponent {
  constructor($parent, props, { tag, className, styles }) {
    this.$parent = $parent;
    this.props = props;
    const $el = document.createElement(tag);
    this.$el = $el;
    $el.classList.add(className);
    Object.entries(styles).forEach(([key, value]) => {
      $el.style[key] = value;
    });
    this.$parent.append(this.$el);
  }
}
