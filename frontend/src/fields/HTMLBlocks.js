import React from 'react';
import * as Blockly from 'blockly/core';
import BlocklyReactField from './BlocklyReactField';

class MyCustomBlock extends Blockly.Block {
  constructor(blockId) {
    super(blockId);
    this.type = 'myCustomBlock';
  }
}

Blockly.Blocks['myCustomBlock'] = MyCustomBlock;


class ReactDateField extends BlocklyReactField {

  static fromJson(options) {
    // `this` might be a subclass of ReactDateField if that class doesn't
    // override the static fromJson method.
    return new this('ok');
  }

  // onDateSelected_ = (date) => {
  //   this.setValue(new Date(date));
  //   Blockly.DropDownDiv.hideIfOwner(this, true);
  // }

  getText_() {
    return this.value_.toLocaleDateString();
  };

  fromXml(fieldElement) {
    this.setValue(new Date(fieldElement.textContent));
  }

  render() {
    return <h2>Cool text</h2>
  }
}

Blockly.fieldRegistry.register('field_react_date', ReactDateField);

export default ReactDateField;
