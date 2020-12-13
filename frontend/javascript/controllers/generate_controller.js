import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';
import {PJFIELDS} from '../generators/data/packagejson';
import FieldOutput from '../utils/field-output';
import Toggle from '../utils/toggle';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

export default class extends Controller {
  static targets = ['output'];
  static values = { fields: Array, text: String, tool: String };

  connect() {
    if (this.toolValue == CONSTANTS.NAMESPACE.PACKAGEJSON) {
      this.fieldsValue = PJFIELDS;
    }
  }

  generate() {
    this.textValue = CONSTANTS.CURLYBRAKETSTART;
    console.log(this.fieldsValue);
    for (let i = 0; i < this.fieldsValue.length; i++) {
      const field = this.fieldsValue[i];
      if (new Toggle(field.name + CONSTANTS.TOGGLE).isActive() == CONSTANTS.TRUE) {
        this.textValue += new FieldOutput(field.name, field.type, field.fields).build();
      }
    }

    if (this.textValue.slice(-2) == CONSTANTS.COMMASPACE) this.textValue = this.textValue.slice(0, -2);
    this.textValue += CONSTANTS.CURLYBRAKETEND;
    this.outputTarget.innerHTML = CONSTANTS.NEWLINE + JSON.stringify(JSON.parse(this.textValue), null, 2);
    Prism.highlightAll();
  }
}
