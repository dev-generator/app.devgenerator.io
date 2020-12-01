import {CONSTANTS} from '../constants';
import {saveAs} from 'file-saver';

export default class Download {
  constructor(filename, filemeta) {
    this.button = document.getElementById(CONSTANTS.DOWNLOADBTN);
    this.output = document.getElementById(CONSTANTS.OUTPUTFORM);

    this.button.onclick = () => {
      var blob = new Blob([this.output.textContent.trim(1)], {
        type: filemeta,
      });

      saveAs(blob, filename);
    };
  }
}
