import moment from 'moment-timezone';

const concatText = (text = '', limit = 20) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };
  
  const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  const clearLocalStorage = () => {
    localStorage.clear();
  };
  

function convertUTCToLocalDatetimeInputValue(utcDateString) {
  // Detect user's timezone
  const userTimeZone = moment.tz.guess();

  // Parse the UTC date and convert to user's timezone
  const localMoment = moment.utc(utcDateString).tz(userTimeZone);

  // Format as 'YYYY-MM-DDTHH:mm' for datetime-local input
  return localMoment.format('YYYY-MM-DDTHH:mm');
}

/**
 * Set a cookie.
 * @param {string} name  – Cookie name
 * @param {string} value – Cookie value
 * @param {Object} options – Optional settings: { days, path, domain, secure, sameSite }
 */
function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return;
  
  const {
    days = 365,
    path = "/",
    domain,
    secure = false,
    sameSite = "Lax",
  } = options;

  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // expiration
  if (days !== null) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    cookieStr += `; expires=${expires.toUTCString()}`;
  }

  cookieStr += `; path=${path}`;

  if (domain) cookieStr += `; domain=${domain}`;
  if (secure) cookieStr += `; secure`;
  if (sameSite) cookieStr += `; samesite=${sameSite}`;

  document.cookie = cookieStr;
}

/**
 * Get a cookie value by name.
 * @param {string} name – Cookie name
 * @returns {string|null}
 */
function getCookie(name) {
  if (typeof document === 'undefined') {
    // we're on the server—no cookies to read here
    return null;
  }

  const nameEQ = encodeURIComponent(name) + '=';
  const parts = document.cookie.split(';');
  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(nameEQ)) {
      return decodeURIComponent(part.substring(nameEQ.length));
    }
  }
  return null;
}

/**
 * Delete a cookie by name.
 * @param {string} name – Cookie name
 * @param {Object} options – Must match path/domain of original cookie
 */
function deleteCookie(name, options = {}) {
  // To delete, set max-age to 0 or a past expires date
  setCookie(name, "", { ...options, days: -1 });
}

/**
 * Clear all cookies on the current path/domain.
 */
function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name] = cookie.split("=");
    deleteCookie(name.trim());
  }
}

export { concatText, setLocalStorage, getLocalStorage, deleteLocalStorage, clearLocalStorage, convertUTCToLocalDatetimeInputValue, setCookie, getCookie, deleteCookie, clearAllCookies };