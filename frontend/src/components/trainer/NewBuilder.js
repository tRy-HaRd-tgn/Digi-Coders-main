import React from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { DEFAULT_OPTIONS } from '../blockly/defaults';
import { getHTMLToolbox } from '../blockly/getHTMLToolbox';
import '../blockly/htmlBlock';

const toolbox = getHTMLToolbox();

const NewBuilder = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <BlocklyWorkspace
        workspaceConfiguration={DEFAULT_OPTIONS}
        className="blockly-editor"
        toolboxConfiguration={toolbox}
        initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml">
        
        </xml>`}
      />
    </div>
  );
};

export default NewBuilder;
