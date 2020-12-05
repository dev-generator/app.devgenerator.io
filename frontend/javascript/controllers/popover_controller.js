import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.CONTENT];
  static classes = [CONSTANTS.CLASSES.HIDE];

  mouseOver() {
    this.contentTarget.classList.remove(this.hideClass);
  }

  mouseOut() {
    this.contentTarget.classList.add(this.hideClass);
  }
}
