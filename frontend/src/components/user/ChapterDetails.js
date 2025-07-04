import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import app_config from '../../config';
import { BlocklyWorkspace } from 'react-blockly';
import { DEFAULT_OPTIONS } from '../blockly/defaults';
import { getHTMLToolbox } from '../blockly/getHTMLToolbox';
import '../blockly/htmlBlock';
import { getJSToolbox } from '../blockly/getJSToolbox';
import { javascriptGenerator } from 'blockly/javascript';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import HtmlGenerator from '../blockly/htmlGenerator';
import { getPythonToolbox } from '../blockly/getPythonToolbox';

const toolbox = getHTMLToolbox();

const getToolbox = (category) => {
  // console.log(category);
  
  if (category === 'HTML') return getHTMLToolbox();
  else if (category.toLowerCase() === 'javascript') return getJSToolbox();
  else if (category.toLowerCase() === 'python') return getPythonToolbox();
  else return getHTMLToolbox();
};

const initBlocks = (data) => {
  let tempToolbox = getToolbox(data.category);
  let myToolBox = {
    contents: [],
    kind : 'categoryToolbox'
  };
  console.log(tempToolbox);
  let preparedBlockStructure = {};
  data.blockStructure.forEach(obj => {
    if(preparedBlockStructure[obj.category] === undefined) preparedBlockStructure[obj.category] = [];
    preparedBlockStructure[obj.category] = [...preparedBlockStructure[obj.category], ...obj.blocks];
    
  });
  console.log(preparedBlockStructure);
  tempToolbox.contents.forEach((obj, index) => {
    if(obj.name in preparedBlockStructure){
      let temp = obj;
      temp.contents = preparedBlockStructure[obj.name];
      myToolBox.contents.push(temp);
    }
  })
  console.log(myToolBox);
  return myToolBox;
}

const getLangugage = (category) => {
  if (category === 'HTML') return 'html';
  else if (category.toLowerCase() === 'javascript') return 'javascript';
  else if (category.toLowerCase() === 'python') return 'python';
  else return 'javascript';
};


const ChapterDetails = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);

  const [showOutputCard, setShowOutputCard] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState('');
  
  const [chapterDetails, setChapterDetails] = useState(null);

  const [generatedCode, setGeneratedCode] = useState('');

  const showOutput = () => {
    setShowOutputCard(!showOutputCard);
  };

  const [xml, setXml] = useState(`<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="controls_ifelse" x="10" y="10">
  
  </block>
  </xml>`);
  
  
  const fetchChapterData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chapter/getbyid/` + id);
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setChapterDetails(data);
    // initBlocks(data);
    setCurrentLanguage(getLangugage(data.category));
    // setXml(data.data);
  };

  useEffect(() => {
    fetchChapterData();
    
  }, []);

  const displayChapterDetails = () => {
    if (chapterDetails !== null) {
      return (
        <>
          <section className="" style={{ backgroundColor: '#29c1fe' }}>
            <div className="container">
              <div className="py-5">
                <div className="card-body text-white">
                  <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-6 col-lg-4 mx-4" style={{ width: '26%' }}>
                      <div
                        class="bg-image hover-overlay ripple shadow-4-strong rounded-7"
                        data-mdb-ripple-color="light"
                        style={{ width: '320px', height: '175px', backgroundSize: 'cover', backgroundColor: "#e0e0e0" }}
                      >
                        <img src={`${process.env.REACT_APP_API_URL}/` + chapterDetails.icon} className="img-fluid" />
                      </div>
                    </div>
                    <div className="content col-md-6 text-justify mx-4">
                      <div class="row mt-3">
                        <div class="col-md-3" style={{ marginTop: '3px' }}>
                          <h5 className="fw-bold">
                            <strong>Title - </strong>
                          </h5>
                        </div>
                        <div class="col-md-9">
                          <p className="text-white">{chapterDetails.title}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-3" style={{ marginTop: '3px' }}>
                          <h5 className="fw-bold">
                            <strong>category - </strong>
                          </h5>
                        </div>
                        <div class="col-md-9">
                          <p className="text-white">{chapterDetails.category}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-3" style={{ marginTop: '3px' }}>
                          <h5 className="fw-bold">
                            <strong>Description - </strong>
                          </h5>
                        </div>
                        <div class="col-md-9">
                          <p className="text-white">{chapterDetails.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  const showRunButton = currentLanguage.toLowerCase() !== 'html';
  const showOutputButton = currentLanguage.toLowerCase() == 'html';

  const generateCode = (workspace) => {
    console.log('return js generator');
    const code = javascriptGenerator.workspaceToCode(workspace);
    console.log(code);
    setGeneratedCode(code);
  };

  const executeCode = () => {
    eval(generatedCode);
  };

  const generateHtmlCode = (workspace) => {
    console.log('return html generator');
    const code = [];
    const blocks = workspace.getAllBlocks();
    // console.log([`${HtmlGenerator[blocks[0].type](blocks[0])}`]);
    // Iterate through all blocks
    const l = blocks.length ? 1 : 0;
    console.log(l);
    for (let i = 0; i < l; i++) {
      const block = blocks[i];
      // console.log(block);
      // console.log(HtmlGenerator[block.type](block));
      code.push(`${HtmlGenerator[block.type](block)}`);
      // console.log(code);
      // setGeneratedCode(generateCode+code);
      // Check block type

      // Add more conditions for other HTML blocks

      // Handle nested blocks recursively (if necessary)
      // Example:
      // if (block.type === 'html_container') {
      //   const innerCode = generateHtmlCode(block.getInputTargetBlock('STACK'));
      //   code.push(innerCode);
      // }
    }

    setGeneratedCode(code.join('\n'));
  };

  const codeGenerators = {
    html: generateHtmlCode,
    javascript: generateCode,
  }

  const getGenerator = () => {
    console.log(chapterDetails.category.toLowerCase());
    if (chapterDetails.category.toLowerCase() === 'html') return generateHtmlCode;
    else if (chapterDetails.category.toLowerCase() === 'javascript') return generateCode;
    else return generateCode;
  };

  return (
    <div>
      {displayChapterDetails()}
      <section>
        <div className="card">
          <div className="px-3 py-2" style={{ backgroundColor: '#f1f1f1' }}>
            <div class="row d-flex align-items-center">
              <div class="col">
                <h4 className="card-title text-uppercase fw-bold mt-2 mx-4" style={{ fontSize: '30px', letterSpacing: '2px' }}>
                  <strong>Digi Coders Editor</strong>
                </h4>
              </div>
              {showRunButton && (
                <div class="col">
                  <button className="btn btn-danger" onClick={executeCode} style={{ marginLeft: '510px' }}>
                    <i className="fas fa-play fa-sm me-2" />
                    Run Program
                  </button>
                </div>
              )}
              {showOutputButton && (
              <div class="col">
                <button className="btn btn-danger" onClick={showOutput} style={{ marginLeft: '530px' }}>
                  {showOutputCard ? 'Hide Output' : 'Show Output'}
                </button>
              </div>
              )}
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                {chapterDetails !== null && (
                  <BlocklyWorkspace
                    workspaceConfiguration={DEFAULT_OPTIONS}
                    className="blockly-editor"
                    toolboxConfiguration={initBlocks(chapterDetails)}
                    initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml">
        
        </xml>`}
                    onWorkspaceChange={codeGenerators[chapterDetails.category.toLowerCase()]}
                  />
                )}
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="py-2" style={{ backgroundColor: '#f1f1f1' }}>
                    <h5 className="text-uppercase text-center fw-bold mt-2 mx-3" style={{ fontSize: '25px', letterSpacing: '2px' }}>
                      Code
                    </h5>
                  </div>
                  <div className="card-body h6" style={{ height: '80vh', overflow: 'auto' }}>
                    {chapterDetails && (
                      <SyntaxHighlighter language={getLangugage(chapterDetails.category)} style={docco}>
                        {generatedCode}
                      </SyntaxHighlighter>
                    )}
                  </div>
                </div>

              </div>
            </div>
            {showOutputCard && (
              <div className="card mt-4">
                <div className="py-2" style={{ backgroundColor: '#f1f1f1' }}>
                  <h5 className="text-uppercase text-center fw-bold mt-2 mx-3" style={{ fontSize: '25px', letterSpacing: '2px' }}>
                    Output
                  </h5>
                </div>
                <div className="card-body h6" style={{ height: '100vh', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: generatedCode }}></div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Copyright */}
      <div
        className="text-center text-white p-4"
        style={{ backgroundColor: "#1b1b1b" }}
      >
        © 2023 Copyright :&nbsp;
        <NavLink className="text-reset fw-bold custom-link-hover" to="#">
          DigiCoders.com
        </NavLink>
      </div>
      {/* Copyright */}
    </div>
  );
};

export default ChapterDetails;
