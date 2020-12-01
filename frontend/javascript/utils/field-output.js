import {CONSTANTS} from '../constants';

export default class FieldOutput {
  constructor(name, dataType, childNames) {
    this.name = name;
    this.dataType = dataType;
    this.childNames = childNames;
    this.field = document.getElementById(name);
  }

  build() {
    var results = CONSTANTS.DOUBLEQUOTE + this.name + CONSTANTS.QUOTECOLON;
    if (this.dataType == CONSTANTS.DATATYPES.TEXT) {
      results += this.textField();
    } else if (this.dataType == CONSTANTS.DATATYPES.CHECKBOX) {
      results += this.checkboxField();
    } else if (this.dataType == CONSTANTS.DATATYPES.SIMPLEARRAY) {
      results += this.simpleArrayField();
    } else if (this.dataType == CONSTANTS.DATATYPES.MULTICOLUMN) {
      results += this.multiColumnFields();
    } else if (this.dataType == CONSTANTS.DATATYPES.COMPLEXTABLE) {
      results += this.complexTableFields();
    } else if (this.dataType == CONSTANTS.DATATYPES.COMPLEXARRAY) {
      results += this.complexArrayFields();
    }

    results += CONSTANTS.COMMASPACE;
    return results;
  }

  textField() {
    return CONSTANTS.DOUBLEQUOTE + this.field.value + CONSTANTS.DOUBLEQUOTE;
  }

  checkboxField() {
    return this.field.checked;
  }

  simpleArrayField() {
    var outputText = [];
    if (this.field.value) {
      var lines = this.field.value.split(CONSTANTS.NEWLINE);
      for (var i = 0; i < lines.length; i++) {
        outputText.push(CONSTANTS.DOUBLEQUOTE + lines[i] + CONSTANTS.DOUBLEQUOTE);
      }
    }
    return CONSTANTS.BRACKETSTART + outputText + CONSTANTS.BRACKETEND;
  }

  multiColumnFields() {
    var outputText = '';
    for (let i = 0; i < this.childNames.length; i++) {
      var info = document.getElementById(this.name + CONSTANTS.DASH + this.childNames[i]);
      if (info.value) {
        if (i != 0) {
          outputText += CONSTANTS.COMMASPACE;
        }
        outputText += CONSTANTS.DOUBLEQUOTE + this.childNames[i] + CONSTANTS.QUOTECOLONQUOTE + info.value + CONSTANTS.DOUBLEQUOTE;
      }
    }

    return CONSTANTS.CURLYBRAKETSTART + outputText + CONSTANTS.CURLYBRAKETEND;
  }

  complexTableFields() {
    var outputText = '';
    var rows = this.field.children;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].children[0].childNodes[1].value && rows[i].children[1].childNodes[1].value) {
        if (i != 0) {
          outputText += CONSTANTS.COMMASPACE;
        }
        outputText += CONSTANTS.DOUBLEQUOTE + rows[i].children[0].childNodes[1].value + CONSTANTS.QUOTECOLONQUOTE +
                      rows[i].children[1].childNodes[1].value + CONSTANTS.DOUBLEQUOTE;
      }
    }

    return CONSTANTS.CURLYBRAKETSTART + outputText + CONSTANTS.CURLYBRAKETEND;
  }

  complexArrayFields() {
    var outputText = '';
    var rows = this.field.children;

    for (let i = 0; i < rows.length; i++) {
      if (i != 0) {
        outputText += CONSTANTS.COMMASPACE;
      }
      outputText += CONSTANTS.CURLYBRAKETSTART;

      for (let f = 0; f < this.childNames.length; f++) {
        if (rows[i].children[f].childNodes[1].value) {
          if (rows[i].children[0].childNodes[1].value) {
            outputText += CONSTANTS.DOUBLEQUOTE + this.childNames[f] + CONSTANTS.QUOTECOLONQUOTE +
                          rows[i].children[f].childNodes[1].value +
                          CONSTANTS.DOUBLEQUOTE + CONSTANTS.COMMASPACE;
          }
        }
      }

      if (outputText.slice(-2) == CONSTANTS.COMMASPACE) outputText = outputText.slice(0, -2);
      outputText += CONSTANTS.CURLYBRAKETEND;
    }

    return CONSTANTS.BRACKETSTART + outputText + CONSTANTS.BRACKETEND;
  }
}
