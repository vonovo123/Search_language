import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import SelectedLanguage from "./components/SelectedLanguage.js";
import { setSessionStorage, getSessionStorage } from "./SessionStorage.js";
import { setLocalStorage, getLocalStorage } from "./LocalStorage.js";
import fetchData from "./API.js";
export default class App {
  constructor($el) {
    this.$el = $el;
    this.child = {};
    this.child["selectedLanguage"] = new SelectedLanguage($el, {});
    this.child["searchInput"] = new SearchInput($el, {
      onChange: this.searchInputOnChange,
    });
    this.child["suggestion"] = new Suggestion($el, {
      onChange: this.suggestionOnChange,
      onSelect: this.suggestionOnSelect,
    });
    this.state = { query: "", languages: [], selLanguages: [], selIdx: 0 };
  }
  render() {
    this.cache();
    const { query, languages, selLanguages, selIdx } = this.state;
    this.child.searchInput.setState({ query });
    this.child.suggestion.setState({ query, languages, selIdx });
    this.child.selectedLanguage.setState({ selLanguages });
  }
  cache() {
    this.state.query = getLocalStorage("query") || "";
    this.state.languages = getLocalStorage("languages") || [];
    this.state.selLanguages = getLocalStorage("selLanguages") || [];
    this.state.selIdx = Number(getLocalStorage("selIdx") || 0);
  }
  searchInputOnChange = async (query) => {
    try {
      this.state.selIdx = 0;
      if (!query) {
        this.state.languages = [];
      } else {
        let history = getSessionStorage("history");
        if (!history) history = {};
        if (!history[query]) {
          this.state.languages = await fetchData(query);
          history[query] = this.state.languages;
          setSessionStorage({ key: "history", value: history });
        } else {
          this.state.languages = history[query];
        }
      }
    } catch (error) {
      alert(error);
      this.state.languages = [];
      this.state.query = "";
    } finally {
      this.state.query = query;
      setLocalStorage({ key: "query", value: this.state.query });
      setLocalStorage({ key: "languages", value: this.state.languages });
      setLocalStorage({ key: "selIdx", value: this.state.selIdx });
      this.child.suggestion.setState({
        query: this.state.query,
        languages: this.state.languages,
        selIdx: this.state.selIdx,
      });
    }
  };
  suggestionOnChange = (selIdx) => {
    this.state.selIdx = selIdx;
    setLocalStorage({ key: "selIdx", value: this.state.selIdx });
  };
  suggestionOnSelect = (selLan) => {
    alert(selLan);
    const { selLanguages } = this.state;
    let idx = selLanguages.indexOf(selLan);
    if (idx !== -1) {
      selLanguages.splice(idx, 1);
    }
    selLanguages.push(selLan);
    if (selLanguages.length > 5) {
      selLanguages.splice(0, 1);
    }
    this.child.selectedLanguage.setState({
      selLanguages: this.state.selLanguages,
    });
    setLocalStorage({ key: "selLanguages", value: selLanguages });
  };
}
