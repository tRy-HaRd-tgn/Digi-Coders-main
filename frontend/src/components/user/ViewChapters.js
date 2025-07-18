import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

const BrowseChapters = () => {
  const { chaptername } = useParams();
  const location = useLocation();

  const [chapterList, setChapterList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const maxElements = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const trainerList = ["Prince Prajapati", "Mohit Mishra", "Rishabh Agnihotri"];

  const categoryList = ["HTML", "JavaScript", "Python"];

  // Получаем параметр category из URL
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("category");
  };

  const sortChaptersAtoZ = () => {
    const sortedArray = [...chapterList].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setChapterList(sortedArray);
  };

  const sortChaptersZtoA = () => {
    const sortedArray = [...chapterList].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setChapterList(sortedArray);
  };

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/chapter/getall`
      );
      const data = await res.json();

      let filteredData = data;

      // Фильтрация по названию главы (если есть параметр chaptername)
      if (chaptername) {
        filteredData = data.filter(
          (chapter) => chapter.title.toLowerCase() === chaptername.toLowerCase()
        );
      }

      // Фильтрация по категории (если есть параметр category в URL)
      const categoryFromURL = getCategoryFromURL();
      if (categoryFromURL) {
        filteredData = filteredData.filter(
          (chapter) =>
            chapter.category.toLowerCase() === categoryFromURL.toLowerCase()
        );
        setSelectedCategory(categoryFromURL);
      }

      setChapterList(filteredData);
      setMasterList(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setIsLoading(false);
    }
  }, [chaptername, location.search]);

  const displayChapters = () => {
    if (chapterList.length === 0) {
      return (
        <div className="no-chapters">
          <div className="no-chapters-content">
            <i className="fas fa-search fa-3x mb-4"></i>
            <h3>Курсы не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        </div>
      );
    }

    return (
      <div className="chapters-grid">
        {chapterList
          .slice(
            maxElements * (currentPage - 1),
            maxElements * (currentPage - 1) + maxElements
          )
          .map((chapter, index) => (
            <div key={chapter._id || index} className="chapter-card">
              <div className="card-image">
                <img
                  src={process.env.REACT_APP_API_URL + "/" + chapter.icon}
                  className="chapter-image"
                  alt={chapter.title}
                  onError={(e) => {
                    e.target.src = "/images/default-chapter.png";
                  }}
                />
                <div className="card-overlay">
                  <div className="category-badge">{chapter.category}</div>
                </div>
              </div>

              <div className="card-content">
                <h3 className="chapter-title">{chapter.title}</h3>
                <p className="chapter-description">{chapter.description}</p>

                <div className="card-footer">
                  <div className="trainer-info">
                    <i className="fas fa-user-graduate"></i>
                    <span>{chapter.trainer?.name || "Неизвестный тренер"}</span>
                  </div>

                  <NavLink
                    className="continue-btn"
                    to={"/user/chapterdetails/" + chapter._id}
                  >
                    <span>Продолжить</span>
                    <i className="fas fa-arrow-right"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const searchChapterByName = (e) => {
    const val = e.target.value;
    setSearchValue(val);

    let filteredData = masterList;

    if (val) {
      filteredData = filteredData.filter((chapter) =>
        chapter.title.toLowerCase().includes(val.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (chapter) =>
          chapter.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setChapterList(filteredData);
    setCurrentPage(1);
  };

  const searchChapterByCategory = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);

    let filteredData = masterList;

    if (searchValue) {
      filteredData = filteredData.filter((chapter) =>
        chapter.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (val) {
      filteredData = filteredData.filter(
        (chapter) => chapter.category.toLowerCase() === val.toLowerCase()
      );
    }

    setChapterList(filteredData);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchValue("");
    setSelectedCategory("");
    setChapterList(masterList);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Загрузка курсов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-chapters-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Курсы</h1>
            <p className="hero-subtitle">
              Найдите интересующий вас курс или урок с помощью поиска ниже
            </p>

            <div className="search-container">
              <div className="search-box">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Поиск по названию курса..."
                  value={searchValue}
                  onChange={searchChapterByName}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <label className="filter-label">
                <i className="fas fa-tag"></i>
                Категория
              </label>
              <select
                className="filter-select"
                onChange={searchChapterByCategory}
                value={selectedCategory}
              >
                <option value="">Все категории</option>
                {categoryList.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <i className="fas fa-sort"></i>
                Сортировка
              </label>
              <select
                className="filter-select"
                onChange={(e) => {
                  if (e.target.value === "A to Z") {
                    sortChaptersAtoZ();
                  } else if (e.target.value === "Z to A") {
                    sortChaptersZtoA();
                  }
                }}
              >
                <option value="">По умолчанию</option>
                <option value="A to Z">А → Я</option>
                <option value="Z to A">Я → А</option>
              </select>
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              <i className="fas fa-times"></i>
              Очистить фильтры
            </button>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="chapters-section">
        <div className="container">{displayChapters()}</div>
      </section>

      {/* Pagination */}
      {chapterList.length > maxElements && (
        <section className="pagination-section">
          <div className="container">
            <div className="pagination-container">
              <nav className="pagination-nav">
                <ul className="pagination-list">
                  {currentPage > 1 && (
                    <li className="pagination-item">
                      <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <i className="fas fa-chevron-left"></i>
                        Назад
                      </button>
                    </li>
                  )}

                  {Array(Math.ceil(chapterList.length / maxElements))
                    .fill(1)
                    .map((item, index) => (
                      <li key={index} className="pagination-item">
                        <button
                          className={`pagination-btn ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                  {Math.ceil(chapterList.length / maxElements) - currentPage >
                    0 && (
                    <li className="pagination-item">
                      <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Вперед
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .view-chapters-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .hero-section {
          position: relative;
          padding: 60px 0;
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
          background: rgba(0, 0, 0, 0.3);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 15px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.1rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .search-container {
          max-width: 500px;
          margin: 0 auto;
        }

        .search-box {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50px;
          padding: 5px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          font-size: 1.2rem;
        }

        .search-input {
          width: 100%;
          padding: 12px 20px 12px 50px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          background: transparent;
          outline: none;
        }

        .search-input::placeholder {
          color: #999;
        }

        .filters-section {
          background: white;
          padding: 40px 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .filters-section .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .filters-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          flex-wrap: nowrap;
          max-width: 800px;
          margin: 0 auto;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-label {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-select {
          padding: 12px 20px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
          min-width: 180px;
          padding-right: 35px;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 8px center;
          background-repeat: no-repeat;
          background-size: 16px 12px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
        }

        .filter-select:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .clear-filters-btn {
          margin-top: auto;
          background: linear-gradient(45deg, #dc3545, #c82333);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .clear-filters-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
        }

        .chapters-section {
          padding: 60px 0;
        }

        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .chapter-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .chapter-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .chapter-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .chapter-card:hover .chapter-image {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          top: 15px;
          right: 15px;
        }

        .category-badge {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .card-content {
          padding: 25px;
        }

        .chapter-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .chapter-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .trainer-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.9rem;
        }

        .continue-btn {
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .continue-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
          color: white;
        }

        .no-chapters {
          text-align: center;
          padding: 80px 20px;
        }

        .no-chapters-content {
          color: #666;
        }

        .no-chapters-content h3 {
          color: #333;
          margin-bottom: 10px;
        }

        .pagination-section {
          padding: 40px 0;
          background: white;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
        }

        .pagination-list {
          display: flex;
          list-style: none;
          gap: 10px;
          margin: 0;
          padding: 0;
        }

        .pagination-btn {
          background: white;
          border: 2px solid #e9ecef;
          color: #333;
          padding: 12px 18px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pagination-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .pagination-btn.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-color: transparent;
          color: white;
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
          .hero-title {
            font-size: 2rem;
          }

          .filters-container {
            flex-direction: row;
            gap: 15px;
            flex-wrap: wrap;
            max-width: 100%;
          }

          .filter-select {
            min-width: 140px;
          }

          .chapters-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .card-footer {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .continue-btn {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .filters-container {
            flex-direction: column;
            gap: 15px;
          }

          .filter-select {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BrowseChapters;
