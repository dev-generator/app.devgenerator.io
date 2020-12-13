import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.NOTIFICATION, CONSTANTS.TARGETS.OUTPUT];
  static classes = [CONSTANTS.CLASSES.HIDE];

  copy() {
    this.inputTemp = document.createElement(CONSTANTS.COPY.INPUT);
    this.inputTemp.value = this.outputTarget.textContent.trim(1);
    document.body.appendChild(this.inputTemp);
    this.inputTemp.select();
    document.execCommand(CONSTANTS.COPY.CMD);
    document.body.removeChild(this.inputTemp);

    this.notificationTarget.classList.remove(this.hideClass);
    this._reset();
  }

  _reset() {
    setTimeout(() => {
      this.notificationTarget.classList.add(this.hideClass);
    }, 5000);
  }
}
