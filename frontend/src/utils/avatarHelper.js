// Утилита для работы с аватарами пользователей

/**
 * Получает URL аватара пользователя с fallback
 * @param {string} avatar - имя файла аватара
 * @param {string} fallbackUrl - URL для fallback изображения
 * @returns {string} URL аватара
 */
export const getAvatarUrl = (
  avatar,
  fallbackUrl = "https://www.bootdey.com/img/Content/avatar/avatar6.png"
) => {
  if (!avatar || avatar === "undefined" || avatar === "null" || avatar === "") {
    return fallbackUrl;
  }

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return `${apiUrl}/${avatar}`;
};

/**
 * Обработчик ошибки загрузки изображения
 * @param {Event} e - событие ошибки
 * @param {string} fallbackUrl - URL для fallback изображения
 */
export const handleImageError = (
  e,
  fallbackUrl = "https://www.bootdey.com/img/Content/avatar/avatar6.png"
) => {
  
  e.target.src = fallbackUrl;
};

/**
 * Проверяет, является ли аватар валидным
 * @param {string} avatar - имя файла аватара
 * @returns {boolean} true если аватар валиден
 */
export const isValidAvatar = (avatar) => {
  return avatar && avatar !== "undefined" && avatar !== "null" && avatar !== "";
};
