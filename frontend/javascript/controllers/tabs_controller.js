import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.TAB, CONSTANTS.TARGETS.PANEL];
  static classes = [
    CONSTANTS.CLASSES.HIDE, CONSTANTS.CLASSES.ACTIVETAB, CONSTANTS.CLASSES.INACTIVETAB,
    CONSTANTS.CLASSES.ACTIVETABICON, CONSTANTS.CLASSES.INACTIVETABICON,
  ];
  static values = {index: Number};

  change(event) {
    event.preventDefault();
    this.indexValue = event.currentTarget.dataset.index;
    window.dispatchEvent(new CustomEvent(CONSTANTS.TABCHANGE));
  }

  indexValueChanged() {
    this.showTab();
  }

  showTab() {
    this.tabTargets.forEach((tab, i) => {
      const panel = this.panelTargets[i];

      if (i === this.indexValue) {
        panel.classList.remove(this.hideClass);
        tab.classList.remove(...this.inactiveTabClass.split(CONSTANTS.BLANKSPACE));
        tab.classList.add(...this.activeTabClass.split(CONSTANTS.BLANKSPACE));
        if (tab.children.length > 1 && tab.children[0].localName == CONSTANTS.DOM.SVG) {
          tab.children[0].classList.remove(...this.inactiveTabIconClass.split(CONSTANTS.BLANKSPACE));
          tab.children[0].classList.add(...this.activeTabIconClass.split(CONSTANTS.BLANKSPACE));
        }
      } else {
        panel.classList.add(this.hideClass);
        tab.classList.remove(...this.activeTabClass.split(CONSTANTS.BLANKSPACE));
        tab.classList.add(...this.inactiveTabClass.split(CONSTANTS.BLANKSPACE));
        if (tab.children.length > 1 && tab.children[0].localName == CONSTANTS.DOM.SVG) {
          tab.children[0].classList.remove(...this.activeTabIconClass.split(CONSTANTS.BLANKSPACE));
          tab.children[0].classList.add(...this.inactiveTabIconClass.split(CONSTANTS.BLANKSPACE));
        }
      }
    });
  }
}
