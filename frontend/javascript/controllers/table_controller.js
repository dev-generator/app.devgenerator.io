import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.TBODY, CONSTANTS.TARGETS.TEMPLATE];

  add() {
    this.tbodyTarget.appendChild(this.templateTarget.content.cloneNode(true));
  }

  minus() {
    var msg = confirm(CONSTANTS.CONFIRMMSG);
    if (msg) {
      this.tbodyTarget.removeChild(this.tbodyTarget.children[this.tbodyTarget.children.length - 1]);
    }
  }
}
