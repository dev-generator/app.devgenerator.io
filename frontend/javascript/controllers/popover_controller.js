import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  mouseOver(event) {
    var target = event.currentTarget.dataset.popoverTarget;
    document.querySelector(`[data-popover-name="${target}"]`).classList.remove(CONSTANTS.HIDDEN);
  }

  mouseOut(event) {
    var target = event.currentTarget.dataset.popoverTarget;
    document.querySelector(`[data-popover-name="${target}"]`).classList.add(CONSTANTS.HIDDEN);
  }
}
