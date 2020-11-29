import {CONSTANTS} from '../constants';
import Toggle from './toggle';

export default class FieldCheck {
  constructor(name, data, dataType, childNames, optional) {
    this.name = name;
    this.data = data;
    this.dataType = dataType;
    this.childNames = childNames;
    this.optional = optional;
    this.toggle = new Toggle(name + '-toggle');
    this.field = document.getElementById(name);

    if (this.dataType == CONSTANTS.DATATYPES.TEXT) {
      this.textField();
    }

    this.toggleOn();
  }

  textField() {
    this.field.value = this.data[this.name];
  }

  toggleOn() {
    if (this.optional && this.toggle.isActive() == CONSTANTS.FALSE &&
        (this.data[this.name].length > 0 || this.data[this.name])) {
      this.toggle.turnOn();
    }
  }
}
