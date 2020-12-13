import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';
import {PJFIELDS} from '../generators/data/packagejson';
import FieldCheck from '../utils/field-check';

export default class extends Controller {
  static targets = [
    CONSTANTS.TARGETS.TEMPLATE, CONSTANTS.TARGETS.GALLERY, CONSTANTS.TARGETS.EMPTY,
    CONSTANTS.TARGETS.INPUT, CONSTANTS.TARGETS.TEXTAREA, CONSTANTS.TARGETS.DROPZONE,
  ];
  static classes = [CONSTANTS.CLASSES.HIDE];
  static values = {tool: String, fields: Array};

  connect() {
    this.hasFiles = ({dataTransfer: {types = []}}) => types.indexOf(CONSTANTS.FILE) > -1;
    this.counter = 0;
    this.reader = new FileReader();
    if (this.toolValue == CONSTANTS.NAMESPACE.PACKAGEJSON) {
      this.fieldsValue = PJFIELDS;
    }
  }

  upload() {
    this.inputTarget.click();
    this.inputTarget.onchange = (e) => {
      for (const file of e.target.files) {
        this._addFile(file);
      }
    };
  }

  dropHandler(e) {
    e.preventDefault();
    for (const file of e.dataTransfer.files) {
      this._addFile(file);
      this.counter = 0;
    }
  }

  dragEnterHandler(e) {
    e.preventDefault();
    if (!this.hasFiles(e)) {
      return;
    }
    ++this.counter;
  }

  dragLeaveHandler() {
    1 > --this.counter;
  }

  dragOverHandler(e) {
    if (this.hasFiles(e)) {
      e.preventDefault();
    }
  }

  link() {
    for (let i = 0; i < this.fieldsValue.length; i++) {
      const field = this.fieldsValue[i];
      new FieldCheck(field.name, JSON.parse(this._read()), field.type, field.fields, field.optional);
    }
  }

  delete(e) {
    const ou = e.target.dataset.target;
    document.getElementById(ou).remove(ou);
    this.emptyTarget.classList.remove(this.hideClass);
    delete CONSTANTS.FILES[ou];
    this.textareaTarget.value = CONSTANTS.BLANK;
  }

  _addFile(file) {
    const objectURL = URL.createObjectURL(file);
    const clone = this.templateTarget.content.cloneNode(true);
    const textarea = this.textareaTarget;

    clone.querySelector(CONSTANTS.DOM.H1).textContent = file.name;
    clone.querySelector(CONSTANTS.DOM.LI).id = objectURL;
    clone.querySelector(CONSTANTS.CLASS.DELETE).dataset.target = objectURL;
    clone.querySelector(CONSTANTS.CLASS.SIZE).textContent = file.size > 1024 ? file.size > 1048576 ?
      Math.round(file.size / 1048576) + CONSTANTS.TYPE.MB : Math.round(file.size / 1024) + CONSTANTS.TYPE.KB : file.size + CONSTANTS.TYPE.BYTE;

    this.emptyTarget.classList.add(this.hideClass);
    this.reader.readAsText(file, CONSTANTS.UTF8);
    this.reader.onload = function(evt) {
      textarea.value = evt.target.result;
    };

    this.galleryTarget.prepend(clone);

    CONSTANTS.FILES[objectURL] = file;
  }

  _read() {
    if (CONSTANTS.FILES.length > 0) {
      const textarea = this.textareaTarget;
      this.reader.readAsText(Object.values(CONSTANTS.FILES)[0], CONSTANTS.UTF8);
      this.reader.onload = function(evt) {
        return evt.target.result;
      };
      this.reader.onerror = function() {
        textarea.value = CONSTANTS.ERRORREADING;
      };
    } else {
      return this.textareaTarget.value;
    }
  }
}
