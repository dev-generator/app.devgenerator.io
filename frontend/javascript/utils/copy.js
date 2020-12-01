import {CONSTANTS} from '../constants';

export default class Copy {
  constructor() {
    this.output = document.getElementById(CONSTANTS.OUTPUTFORM);
    this.button = document.getElementById(CONSTANTS.COPY.BUTTON);
    this.notification = document.getElementById(CONSTANTS.COPY.NOTIFICATION);
    this.inputTemp = document.createElement(CONSTANTS.COPY.INPUT);

    this.button.onclick = () => {
      this.inputTemp.value = this.output.textContent.trim(1);
      document.body.appendChild(this.inputTemp);
      this.inputTemp.select();
      document.execCommand(CONSTANTS.COPY.CMD);
      document.body.removeChild(this.inputTemp);

      this.notification.classList.remove(CONSTANTS.HIDDEN);
      this.resetText();
    };
  }

  resetText() {
    setTimeout(() => {
      this.notification.classList.add(CONSTANTS.HIDDEN);
    }, 5000);
  }
}
