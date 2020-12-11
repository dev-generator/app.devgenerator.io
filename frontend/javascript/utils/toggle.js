import {CONSTANTS} from '../constants';

export default class Toggle {
  constructor(id, size) {
    this.button = document.getElementById(id);
    this.toggle = this.button.children[1];
    this.onIcon = this.button.children[1].children[1];
    this.offIcon = this.button.children[1].children[0];
    this.size = size || CONSTANTS.TRANSLATE.X5;
  }

  turnOn() {
    this.button.classList.add(CONSTANTS.BG.PURPLE700);
    this.toggle.classList.remove(CONSTANTS.TRANSLATE.X0);
    this.toggle.classList.add(this.size);
    this.offIcon.classList.remove(CONSTANTS.OPACITY.O100);
    this.offIcon.classList.add(CONSTANTS.OPACITY.O0);
    this.onIcon.classList.remove(CONSTANTS.OPACITY.O0);
    this.onIcon.classList.add(CONSTANTS.OPACITY.O100);
    this.button.dataset.switchStatusValue = CONSTANTS.TRUE;
  }

  turnOff() {
    this.button.classList.add(CONSTANTS.BG.GRAY200);
    this.toggle.classList.remove(this.size);
    this.toggle.classList.add(CONSTANTS.TRANSLATE.X0);
    this.offIcon.classList.remove(CONSTANTS.OPACITY.O0);
    this.offIcon.classList.add(CONSTANTS.OPACITY.O100);
    this.onIcon.classList.remove(CONSTANTS.OPACITY.O100);
    this.onIcon.classList.add(CONSTANTS.OPACITY.O0);
    this.button.dataset.switchStatusValue = CONSTANTS.FALSE;
  }

  isActive() {
    return this.button.dataset.switchStatusValue;
  }
}
