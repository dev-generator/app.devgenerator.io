import {CONSTANTS} from '../constants';
import {FILES} from './file-upload';

export default class File {
  constructor() {
    this.field = document.getElementById(CONSTANTS.DOCUMENT);
    this.reader = new FileReader();
  }

  read() {
    if (FILES.length > 0) {
      reader.readAsText(Object.values(FILES)[0], CONSTANTS.UTF8);
      reader.onload = function(evt) {
        return evt.target.result;
      };
      reader.onerror = function() {
        this.field.value = CONSTANTS.ERRORREADING;
      };
    } else {
      return this.field.value;
    }
  }
}
