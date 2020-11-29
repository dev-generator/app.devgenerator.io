import {Controller} from 'stimulus'
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.TAB, CONSTANTS.TARGETS.PANEL]

  connect() {
    this.activeTabClasses = (this.data.get(CONSTANTS.ACTIVETAB) || CONSTANTS.ACTIVE).split(CONSTANTS.BLANKSPACE);
    this.inactiveTabClasses = (this.data.get(CONSTANTS.INACTIVETAB) || CONSTANTS.INACTIVE).split(CONSTANTS.BLANKSPACE);
    this.activeTabIconClasses = (this.data.get(CONSTANTS.ACTIVETABICON) || CONSTANTS.ACTIVE).split(CONSTANTS.BLANKSPACE);
    this.inactiveTabIconClasses = (this.data.get(CONSTANTS.INACTIVETABICON) || CONSTANTS.INACTIVE).split(CONSTANTS.BLANKSPACE);
    if (this.anchor) {
      this.index = this.tabTargets.findIndex((tab) => tab.id === this.anchor)
    }
    this.showTab();
  }

  change(event) {
    event.preventDefault();

    if (event.currentTarget.dataset.index) {
      this.index = event.currentTarget.dataset.index;
    } else if (event.currentTarget.dataset.id) {
      this.index = this.tabTargets.findIndex((tab) => tab.id == event.currentTarget.dataset.id);
    } else {
      this.index = this.tabTargets.indexOf(event.currentTarget);
    }

    window.dispatchEvent(new CustomEvent(CONSTANTS.TABCHANGE));
  }

  showTab() {
    this.tabTargets.forEach((tab, index) => {
      const panel = this.panelTargets[index];

      if (index === this.index) {
        panel.classList.remove(CONSTANTS.HIDDEN);
        tab.classList.remove(...this.inactiveTabClasses);
        tab.classList.add(...this.activeTabClasses);
        if (tab.children.length > 1 && tab.children[0].localName == CONSTANTS.DOM.SVG) {
          tab.children[0].classList.remove(...this.inactiveTabIconClasses);
          tab.children[0].classList.add(...this.activeTabIconClasses);
        }

        if (tab.id) {
          event.preventDefault();
          location.hash = tab.id;
        }
      } else {
        panel.classList.add(CONSTANTS.HIDDEN);
        tab.classList.remove(...this.activeTabClasses);
        tab.classList.add(...this.inactiveTabClasses);
        if (tab.children.length > 1 && tab.children[0].localName == CONSTANTS.DOM.SVG) {
          tab.children[0].classList.remove(...this.activeTabIconClasses);
          tab.children[0].classList.add(...this.inactiveTabIconClasses);
        }
      }
    })
  }

  get index() {
    return parseInt(this.data.get(CONSTANTS.INDEX) || 0);
  }

  set index(value) {
    this.data.set(CONSTANTS.INDEX, (value >= 0 ? value : 0));
    this.showTab();
  }

  get anchor() {
    return (document.URL.split(CONSTANTS.HASHTAG).length > 1) ? document.URL.split(CONSTANTS.HASHTAG)[1] : null;
  }
}