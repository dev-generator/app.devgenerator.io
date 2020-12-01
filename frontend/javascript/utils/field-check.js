import {CONSTANTS} from '../constants';
import Toggle from './toggle';

export default class FieldCheck {
  constructor(name, data, dataType, childNames, optional) {
    this.name = name;
    this.data = data;
    this.dataType = dataType;
    this.childNames = childNames;
    this.optional = optional;
    this.toggle = new Toggle(name + CONSTANTS.TOGGLE);
    this.field = document.getElementById(name);
    this.template = document.getElementById(name + CONSTANTS.TEMPLATE);

    if (this.dataType == CONSTANTS.DATATYPES.TEXT) {
      this.textField();
    } else if (dataType == CONSTANTS.DATATYPES.CHECKBOX) {
      this.checkboxField();
    } else if (dataType == CONSTANTS.DATATYPES.SIMPLEARRAY) {
      this.simpleArrayField();
    } else if (dataType == CONSTANTS.DATATYPES.MULTICOLUMN) {
      this.multiColumnFields();
    } else if (dataType == CONSTANTS.DATATYPES.COMPLEXTABLE) {
      this.complexTableFields();
    } else if (dataType == CONSTANTS.DATATYPES.COMPLEXARRAY) {
      this.complexArrayFields();
    }
  }

  textField() {
    if (this.data[this.name]) {
      this.field.value = this.data[this.name];
      this.toggleOn();
    }
  }

  checkboxField() {
    if (this.data[this.name]) {
      this.field.checked = this.data[this.name];
      this.toggleOn();
    }
  }

  simpleArrayField() {
    if (this.data[this.name] && this.data[this.name].length > 0) {
      this.field.value = this.data[this.name].join(CONSTANTS.RETURNNEWLINE);
      this.toggleOn();
    }
  }

  multiColumnFields() {
    if (this.data[this.name] && this.checkHasValues()) {
      for (let i = 0; i < this.childNames.length; i++) {
        var element = document.getElementById(this.name + CONSTANTS.DASH + this.childNames[i]);
        if (this.data[this.name][this.childNames[i]]) {
          element.value = this.data[this.name][this.childNames[i]];
        }
      }
      this.toggleOn();
    }
  }

  complexTableFields() {
    if (this.data[this.name]) {
      var info = Object.entries(this.data[this.name]);
      if (info.length > 0) {
        this.cloneRow(info);

        for (let i = 0; i < info.length; i++) {
          this.field.children[i].children[0].childNodes[1].value = info[i][0];
          this.field.children[i].children[1].childNodes[1].value = info[i][1];
        }

        this.toggleOn();
      }
    }
  }

  complexArrayFields() {
    if (this.data[this.name] && this.data[this.name].length > 0) {
      this.cloneRow(this.data[this.name]);

      for (let index = 0; index < this.data[this.name].length; index++) {
        var details = Object.entries(this.data[this.name][index]);
        for (let i = 0; i < details.length; i++ ) {
          if (details[i]) this.field.children[index].children[i].childNodes[1].value = details[i][1];
        }
      }

      this.toggleOn();
    }
  }

  checkHasValues() {
    for (let i = 0; i < this.childNames.length; i++) {
      var result = this.data[this.name].hasOwnProperty(this.childNames[i]);
      if (result) {
        return true;
      }
    }

    return false;
  }

  cloneRow(details) {
    if (this.field.children.length == 1) {
      for (let i = 1; i < details.length; i++) {
        this.field.appendChild(this.template.content.cloneNode(true));
      }
    }
  }

  toggleOn() {
    if (this.optional && this.toggle.isActive() == CONSTANTS.FALSE) {
      this.toggle.turnOn();
    }
  }
}
