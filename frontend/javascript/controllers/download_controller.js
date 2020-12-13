import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';
import {saveAs} from 'file-saver';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.OUTPUT];
  static values = {filename: String, filemeta: String};

  download() {
    var blob = new Blob([this.outputTarget.textContent.trim(1)], {
      type: this.filemetaValue,
    });

    saveAs(blob, this.filenameValue);
  }
}
