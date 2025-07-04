/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React, { useState } from 'react';
// import './BlocklyComponent.css';
import { useEffect, useRef } from 'react';

import Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import locale from 'blockly/msg/en';
import 'blockly/blocks';
import { useBlockContext } from '../context/BlockContext';

Blockly.setLocale(locale);

function BlocklyComponent(props) {
    const blocklyDiv = useRef();
    const toolbox = useRef();
    let primaryWorkspace = useRef();
    const calledOnce = useRef(true);

    const { addedBlocks, setAddedBlocks } = useBlockContext();


    const generateCode = () => {
        var code = javascriptGenerator.workspaceToCode(
            primaryWorkspace.current
        );
        console.log(code);
    }

    useEffect(() => {
        if (calledOnce.current) {
            calledOnce.current = false;
            const { initialXml, children, ...rest } = props;
            primaryWorkspace.current = Blockly.inject(
                blocklyDiv.current,
                {
                    toolbox: toolbox.current,
                    ...rest
                },
            );

            if (initialXml) {
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
            }
        }
    }, [primaryWorkspace, toolbox, blocklyDiv, props, addedBlocks]);

    // console.log(addedBlocks);
    // console.log(props.children);

    return (
        <React.Fragment>
            <button onClick={generateCode} className='btn btn-primary'>Convert</button>
            <div ref={blocklyDiv} id="blocklyDiv" style={{ height: props.height, width: '100%' }} />
            <div style={{ display: 'none' }} ref={toolbox} className='bg-danger'>
                {props.children}
            </div>
        </React.Fragment>);
}

export default BlocklyComponent;
