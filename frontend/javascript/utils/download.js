import {CONSTANTS} from '../constants';
import {saveAs} from 'file-saver';

export default class Download {
  constructor(code, filename, filemeta) {
    this.button = document.getElementById('download-btn');

    if (window.location.pathname.includes(CONSTANTS.GENERATORS)) {
      this.button.onclick = () => {
        var filename = filename;
        var blob = new Blob([code], {
          type: filemeta,
        });

        saveAs(blob, filename);
      };
    }
  }
}
