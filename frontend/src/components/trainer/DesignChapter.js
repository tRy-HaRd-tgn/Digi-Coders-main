import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";
import { BlocklyWorkspace } from "react-blockly";
import { DEFAULT_OPTIONS } from "../blockly/defaults";
import { getHTMLToolbox } from "../blockly/getHTMLToolbox";
import "../blockly/htmlBlock";
import { getJSToolbox } from "../blockly/getJSToolbox";
import { getPythonToolbox } from "../blockly/getPythonToolbox";
import XMLParser from "react-xml-parser";
import Swal from "sweetalert2";

const toolbox = getHTMLToolbox();

const getToolbox = (category) => {
  if (category === "HTML") return getHTMLToolbox();
  else if (
    category === "JS" ||
    category.toLowerCase() === "JavaScript".toLowerCase()
  )
    return getJSToolbox();
  else if (category.toLowerCase() === "python") return getPythonToolbox();
  else return getHTMLToolbox();
};

const DesignChapter = () => {
  const { id } = useParams();

  const [chapterDetails, setChapterDetails] = useState(null);
  const [selBlocks, setSelBlocks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [xml, setXml] = useState(`<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="controls_ifelse" x="10" y="10">
  
  </block>
  </xml>`);

  const fetchChapterData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/chapter/getbyid/` + id
      );

      const data = await res.json();

      // Преобразуем массив в объект для удобства работы
      if (data.blockStructure && Array.isArray(data.blockStructure)) {
        const blockStructureObj = {};
        data.blockStructure.forEach((item) => {
          if (item.category && item.blocks) {
            blockStructureObj[item.category] = item.blocks;
          }
        });
        setSelBlocks(blockStructureObj);
      } else {
        setSelBlocks({});
      }

      setChapterDetails(data);
    } catch (error) {
      console.error("Error fetching chapter data:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Не удалось загрузить данные главы",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateChapter = async () => {
    try {
      const blockStructureArray = Object.keys(selBlocks).map((category) => ({
        category: category,
        blocks: selBlocks[category],
      }));

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/chapter/update/` + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blockStructure: blockStructureArray,
          }),
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Успешно!",
          text: "Глава успешно обновлена",
          confirmButtonColor: "#29c1fe",
        });
      } else {
        throw new Error("Failed to update chapter");
      }
    } catch (error) {
      console.error("Error updating chapter:", error);
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Не удалось обновить главу",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const updateSelBlocks = (block, category) => {
    if (selBlocks[category] === undefined) {
      setSelBlocks({
        ...selBlocks,
        [category]: [block],
      });
    } else if (
      selBlocks[category].find(
        (b) => getBlockType(b) === getBlockType(block)
      ) === undefined
    ) {
      setSelBlocks({
        ...selBlocks,
        [category]: [...selBlocks[category], block],
      });
    }
  };

  const removeBlock = (block, category) => {
    if (selBlocks[category] !== undefined) {
      const updatedBlocks = selBlocks[category].filter(
        (b) => getBlockType(b) !== getBlockType(block)
      );
      setSelBlocks({
        ...selBlocks,
        [category]: updatedBlocks,
      });
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, []);

  const getBlockType = (block) => {
    return block.blockxml
      ? new XMLParser().parseFromString(block.blockxml).attributes.type
      : "";
  };

  const displayBlockOptions = () => {
    return (
      <div className="block-options-container">
        <div className="block-options-header">
          <div className="header-content">
            <div className="header-left">
              <h2 className="header-title">
                <i className="fas fa-puzzle-piece me-3"></i>
                Настройка блоков
              </h2>
              <p className="header-subtitle">Выберите блоки для этой главы</p>
            </div>
            <div className="header-right">
              <button
                className="btn btn-primary submit-btn"
                onClick={updateChapter}
              >
                <i className="fas fa-save me-2"></i>
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>

        <div className="block-options-body">
          <div className="categories-grid">
            {getToolbox(chapterDetails.category)
              .contents.filter(
                (group) => group.kind === "category" && group.contents
              )
              .map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-header">
                    <h3 className="category-title">
                      <i className="fas fa-layer-group me-2"></i>
                      {category.name}
                    </h3>
                    <span className="block-count">
                      {category.contents.length} блоков
                    </span>
                  </div>

                  <div className="blocks-list">
                    {category.contents.map((block, blockIndex) => {
                      const isSelected =
                        selBlocks[category.name] &&
                        selBlocks[category.name].find(
                          (b) => getBlockType(b) === getBlockType(block)
                        );

                      return (
                        <div
                          key={blockIndex}
                          className={`block-item ${
                            isSelected ? "selected" : ""
                          }`}
                        >
                          <div className="block-info">
                            <span className="block-name">
                              {getBlockType(block)}
                            </span>
                          </div>
                          <div className="block-controls">
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateSelBlocks(block, category.name);
                                  } else {
                                    removeBlock(block, category.name);
                                  }
                                }}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

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
                        process.env.REACT_APP_API_URL +
                        "/" +
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
    <div className="design-chapter-page">
      {displayChapterDetails()}

      <section className="design-section">
        <div className="design-header">
          <div className="container">
            <div className="header-content">
              <h1 className="main-title">
                <i className="fas fa-palette me-3"></i>
                Дизайн главы
              </h1>
              <p className="main-subtitle">
                Настройте блоки и элементы для создания интерактивного обучения
              </p>
            </div>
          </div>
        </div>

        <div className="design-content">
          <div className="container">
            {chapterDetails !== null && displayBlockOptions()}
          </div>
        </div>
      </section>

      <style>{`
        .design-chapter-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          background: linear-gradient(135deg, #29c1fe 0%, #1e88e5 100%);
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
          background: linear-gradient(45deg, #29c1fe, #1e88e5);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .design-section {
          padding: 60px 0;
          background: #f8f9fa;
        }

        .design-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 60px 0;
          margin-bottom: 40px;
        }

        .main-title {
          color: white;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 15px;
          text-align: center;
        }

        .main-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.2rem;
          text-align: center;
          margin: 0;
        }

        .block-options-container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .block-options-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

        .submit-btn {
          background: linear-gradient(45deg, #28a745, #20c997);
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .block-options-body {
          padding: 40px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .category-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 25px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .category-card:hover {
          border-color: #29c1fe;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e9ecef;
        }

        .category-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .block-count {
          background: #29c1fe;
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .blocks-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .block-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: white;
          border-radius: 10px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .block-item:hover {
          border-color: #29c1fe;
          background: #f8f9ff;
        }

        .block-item.selected {
          border-color: #28a745;
          background: #f8fff9;
        }

        .block-info {
          flex: 1;
        }

        .block-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .custom-checkbox {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .custom-checkbox input {
          opacity: 0;
          position: absolute;
        }

        .checkmark {
          height: 25px;
          width: 25px;
          background-color: #e9ecef;
          border-radius: 5px;
          display: inline-block;
          position: relative;
          transition: all 0.3s ease;
        }

        .custom-checkbox input:checked ~ .checkmark {
          background-color: #28a745;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 9px;
          top: 5px;
          width: 7px;
          height: 12px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .custom-checkbox input:checked ~ .checkmark:after {
          display: block;
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

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .main-title {
            font-size: 2rem;
          }

          .block-options-body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default DesignChapter;
