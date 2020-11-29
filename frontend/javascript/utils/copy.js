import ClipboardJS from 'clipboard';
import {CONSTANTS} from '../constants';

export default class Copy {
  constructor(code) {
    this.button = document.getElementById('copy-btn');
    this.notification = document.getElementById('copy-notification');
    this.success = document.getElementById('copy-notification-success');
    this.error = document.getElementById('copy-notification-error');
    this.text = document.getElementById('copy-notification-text');

    if (window.location.pathname.includes(CONSTANTS.GENERATORS)) {
      this.button.onclick = () => {
        var clip = new ClipboardJS(this.button, {
          'text': function() {
            return code;
          },
        });

        clip.on(CONSTANTS.SUCCESS, () => {
          noti.classList.remove(CONSTANTS.CLASSHIDDEN);
          success.classList.remove(CONSTANTS.CLASSHIDDEN);
          text.textContent = CONSTANTS.SUCCESSCOPYMSG;

          this.resetText();
        });

        clip.on(CONSTANTS.ERROR, () => {
          noti.classList.remove(CONSTANTS.CLASSHIDDEN);
          error.classList.remove(CONSTANTS.CLASSHIDDEN);
          text.textContent = CONSTANTS.ERRORCOPYMSG;

          this.resetText();
        });
      };
    }
  }

  resetText() {
    setTimeout(() => {
      this.notification.classList.add(CONSTANTS.CLASSHIDDEN);
      this.success.classList.add(CONSTANTS.CLASSHIDDEN);
      this.error.classList.add(CONSTANTS.CLASSHIDDEN);
    }, 5000);
  }
}
