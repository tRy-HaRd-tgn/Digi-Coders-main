import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BlocklyWorkspace } from "react-blockly";
import { DEFAULT_OPTIONS } from "../blockly/defaults";
import { getHTMLToolbox } from "../blockly/getHTMLToolbox";
import "../blockly/htmlBlock";
import { getJSToolbox } from "../blockly/getJSToolbox";
import { javascriptGenerator } from "blockly/javascript";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import HtmlGenerator from "../blockly/htmlGenerator";
import { getPythonToolbox } from "../blockly/getPythonToolbox";
import { pythonGenerator } from "blockly/python";

const getToolbox = (category) => {
  if (category === "HTML") return getHTMLToolbox();
  else if (category.toLowerCase() === "javascript") return getJSToolbox();
  else if (category.toLowerCase() === "python") return getPythonToolbox();
  else return getHTMLToolbox();
};

const initBlocks = (data) => {
  let tempToolbox = getToolbox(data.category);
  let myToolBox = {
    contents: [],
    kind: "categoryToolbox",
  };

  if (data.blockStructure && data.blockStructure.length > 0) {
    let preparedBlockStructure = {};
    data.blockStructure.forEach((obj) => {
      if (preparedBlockStructure[obj.category] === undefined)
        preparedBlockStructure[obj.category] = [];
      preparedBlockStructure[obj.category] = [
        ...preparedBlockStructure[obj.category],
        ...obj.blocks,
      ];
    });

    tempToolbox.contents.forEach((obj, index) => {
      if (obj.name in preparedBlockStructure) {
        let temp = obj;
        temp.contents = preparedBlockStructure[obj.name];
        myToolBox.contents.push(temp);
      }
    });
  } else {
    myToolBox = tempToolbox;
  }

  return myToolBox;
};

const getLangugage = (category) => {
  if (category === "HTML") return "html";
  else if (category.toLowerCase() === "javascript") return "javascript";
  else if (category.toLowerCase() === "python") return "python";
  else return "javascript";
};

const ChapterDetails = () => {
  const { id } = useParams();
  const [showOutputCard, setShowOutputCard] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [chapterDetails, setChapterDetails] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const showOutput = () => {
    setShowOutputCard(!showOutputCard);
  };

  const fetchChapterData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/chapter/getbyid/` + id
      );

      const data = await res.json();

      setChapterDetails(data);
      setCurrentLanguage(getLangugage(data.category));
    } catch (error) {
      console.error("Error fetching chapter data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchChapterData();
  }, [fetchChapterData]);

  const displayChapterDetails = () => {
    if (chapterDetails !== null) {
      return (
        <section className="chapter-hero">
          <div className="hero-background">
            <div className="hero-overlay"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-card">
                <div className="hero-image">
                  <div className="image-container">
                    <img
                      src={
                        `${process.env.REACT_APP_API_URL}/` +
                        chapterDetails.icon
                      }
                      className="chapter-image"
                      alt={chapterDetails.title}
                      onError={(e) => {
                        e.target.src = "/images/default-chapter.png";
                      }}
                    />
                  </div>
                </div>

                <div className="hero-details">
                  <div className="detail-item">
                    <div className="detail-label">
                      <i className="fas fa-heading me-2"></i>
                      Название:
                    </div>
                    <div className="detail-value">{chapterDetails.title}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      <i className="fas fa-tag me-2"></i>
                      Категория:
                    </div>
                    <div className="detail-value">
                      <span className="category-badge">
                        {chapterDetails.category}
                      </span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">
                      <i className="fas fa-align-left me-2"></i>
                      Описание:
                    </div>
                    <div className="detail-value">
                      {chapterDetails.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div className="loading-container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Загрузка данных главы...</p>
          </div>
        </div>
      );
    }
  };

  const showRunButton = currentLanguage.toLowerCase() !== "html";
  const showOutputButton = currentLanguage.toLowerCase() === "html";

  const generateCode = (workspace) => {
    const code = javascriptGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
  };

  const generatePythonCode = (workspace) => {
    const code = pythonGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
  };

  const executeCode = () => {
    try {
      // Создаем безопасную функцию вместо использования eval
      // eslint-disable-next-line no-new-func
      const safeExecute = new Function(generatedCode);
      safeExecute();
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  const generateHtmlCode = (workspace) => {
    const code = [];
    const blocks = workspace.getAllBlocks();

    const l = blocks.length ? 1 : 0;

    for (let i = 0; i < l; i++) {
      const block = blocks[i];
      code.push(`${HtmlGenerator[block.type](block)}`);
    }

    setGeneratedCode(code.join("\n"));
  };

  const codeGenerators = {
    html: generateHtmlCode,
    javascript: generateCode,
    python: generatePythonCode,
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chapter-details-page">
      {displayChapterDetails()}

      <section className="editor-section">
        <div className="editor-container">
          <div className="editor-header">
            <div className="header-content">
              <div className="header-left">
                <h2 className="header-title">
                  <i className="fas fa-code me-3"></i>
                  Digi Coders Editor
                </h2>
                <p className="header-subtitle">
                  Создавайте код с помощью визуальных блоков
                </p>
              </div>
              <div className="header-right">
                {showRunButton && (
                  <button
                    className="btn btn-primary run-btn"
                    onClick={executeCode}
                  >
                    <i className="fas fa-play me-2"></i>
                    Запустить код
                  </button>
                )}
                {showOutputButton && (
                  <button
                    className="btn btn-success output-btn"
                    onClick={showOutput}
                  >
                    <i className="fas fa-eye me-2"></i>
                    {showOutputCard ? "Скрыть результат" : "Показать результат"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="editor-content">
            <div className="editor-grid">
              <div className="blockly-container">
                {chapterDetails !== null && (
                  <BlocklyWorkspace
                    workspaceConfiguration={DEFAULT_OPTIONS}
                    className="blockly-editor"
                    toolboxConfiguration={initBlocks(chapterDetails)}
                    initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml">
        
        </xml>`}
                    onWorkspaceChange={
                      codeGenerators[chapterDetails.category.toLowerCase()]
                    }
                  />
                )}
              </div>

              <div className="code-container">
                <div className="code-header">
                  <h3 className="code-title">
                    <i className="fas fa-file-code me-2"></i>
                    Сгенерированный код
                  </h3>
                </div>
                <div className="code-content">
                  {chapterDetails && (
                    <SyntaxHighlighter
                      language={getLangugage(chapterDetails.category)}
                      style={docco}
                      className="syntax-highlighter"
                    >
                      {generatedCode}
                    </SyntaxHighlighter>
                  )}
                </div>
              </div>
            </div>

            {showOutputCard && (
              <div className="output-container">
                <div className="output-header">
                  <h3 className="output-title">
                    <i className="fas fa-desktop me-2"></i>
                    Результат выполнения
                  </h3>
                </div>
                <div
                  className="output-content"
                  dangerouslySetInnerHTML={{ __html: generatedCode }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © 2023 Copyright:&nbsp;
              <NavLink className="footer-link" to="#">
                DigiCoders.com
              </NavLink>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .chapter-details-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .chapter-hero {
          position: relative;
          padding: 80px 0;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .hero-image {
          flex-shrink: 0;
        }

        .image-container {
          width: 280px;
          height: 180px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .chapter-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-details {
          flex: 1;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .detail-item:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        .detail-label {
          font-weight: 600;
          color: #333;
          min-width: 120px;
          display: flex;
          align-items: center;
        }

        .detail-value {
          flex: 1;
          color: #555;
        }

        .category-badge {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .editor-section {
          padding: 0;
          height: calc(100vh - 400px);
          min-height: 600px;
        }

        .editor-container {
          background: white;
          height: 100%;
          border-radius: 0;
          box-shadow: none;
          overflow: hidden;
        }

        .editor-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 30px;
          color: white;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .header-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .header-subtitle {
          margin: 10px 0 0 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .run-btn,
        .output-btn {
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
        }

        .run-btn {
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
        }

        .output-btn {
          background: linear-gradient(45deg, #17a2b8, #138496);
          color: white;
        }

        .run-btn:hover,
        .output-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          color: white;
        }

        .editor-content {
          padding: 0;
          height: calc(100% - 100px);
        }

        .editor-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 0;
          height: 100%;
        }

        .blockly-container {
          background: #f8f9fa;
          border-radius: 0;
          overflow: hidden;
          border: none;
          height: 100%;
        }

        .blockly-editor {
          width: 100%;
          height: 100%;
          min-height: 100%;
        }

        .code-container {
          background: #f8f9fa;
          border-radius: 0;
          overflow: hidden;
          border: none;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .code-header {
          background: linear-gradient(45deg, #495057, #6c757d);
          padding: 15px 20px;
          color: white;
          flex-shrink: 0;
        }

        .code-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .code-content {
          padding: 15px;
          flex: 1;
          overflow: auto;
        }

        .syntax-highlighter {
          background: #f8f9fa !important;
          border-radius: 10px;
          padding: 20px !important;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .output-container {
          margin-top: 30px;
          background: #f8f9fa;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid #e9ecef;
        }

        .output-header {
          background: linear-gradient(45deg, #28a745, #20c997);
          padding: 20px;
          color: white;
        }

        .output-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .output-content {
          padding: 30px;
          min-height: 400px;
          background: white;
          border-radius: 0 0 15px 15px;
        }

        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 30px 0;
          color: white;
        }

        .footer-content {
          text-align: center;
        }

        .footer-text {
          margin: 0;
          font-size: 1.1rem;
        }

        .footer-link {
          color: #29c1fe;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #1e88e5;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .loading-spinner {
          text-align: center;
          color: white;
        }

        .loading-spinner i {
          font-size: 3rem;
          margin-bottom: 20px;
          display: block;
        }

        .loading-spinner p {
          font-size: 1.2rem;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .editor-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .blockly-editor {
            min-height: 100%;
          }

          .code-content {
            height: auto;
          }
        }

        @media (max-width: 768px) {
          .hero-card {
            flex-direction: column;
            text-align: center;
          }

          .image-container {
            width: 100%;
            max-width: 280px;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .editor-content {
            padding: 0;
          }

          .blockly-editor {
            min-height: 100%;
          }

          .code-content {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ChapterDetails;
