import React from 'react';
import Blockly from 'blockly';

const CustomBlock = () => {
    const blockDefinition = {
      init: function () {
        this.jsonInit({
          message0: 'Hello, World!',
          output: 'String',
          colour: Blockly.Msg.TEXTS_HUE,
          tooltip: 'This is a custom block that outputs "Hello, World!"',
          helpUrl: ''
        });
      }
    };
  
    Blockly.Blocks['custom_block'] = blockDefinition;
  
    return null;
  };
  
  export default CustomBlock;
  