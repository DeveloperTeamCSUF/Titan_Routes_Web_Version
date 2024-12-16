const translations = {
  en: {
      title: "Titan Routes",
      home: "Home",
      settings: "Settings",
      favorites: "Favorites",
      news: "News",
      parking: "Parking",
      logout: "Logout",
      search: "Search",
      yourFavorites: "Your Favorites"
  },
  ar: {
      title: "طرق تيتان",
      home: "الصفحة الرئيسية",
      settings: "الإعدادات",
      favorites: "المفضلة",
      news: "الأخبار",
      parking: "موقف السيارات",
      logout: "تسجيل الخروج",
      search: "بحث",
      yourFavorites: "مفضلتك"
  },
  es: {
    title: "Rutas Titan",
    home: "Inicio",
    settings: "Configuraciones",
    favorites: "Favoritos",
    news: "Noticias",
    parking: "Estacionamiento",
    logout: "Cerrar sesión",
    search: "Buscar",
    yourFavorites: "Tus favoritos",
    editProfile: "Editar Perfil",
    changePassword: "Cambiar Contraseña",
    reportProblem: "Reportar un Problema",
    languageSettings: "Configuración de Idioma",
    save: "Guardar",
    back: "Volver"
  },
  ja: {
      title: "タイタンルート",
      home: "ホーム",
      settings: "設定",
      favorites: "お気に入り",
      news: "ニュース",
      parking: "駐車場",
      logout: "ログアウト",
      search: "検索",
      yourFavorites: "お気に入り"
  },
  zh: {
      title: "泰坦路线",
      home: "主页",
      settings: "设置",
      favorites: "收藏夹",
      news: "新闻",
      parking: "停车场",
      logout: "登出",
      search: "搜索",
      yourFavorites: "你的收藏"
  }
};

// Set language and apply translations
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
      }
  });
}

// Initialize with a default language
function initializeLanguage(defaultLang) {
  const savedLang = localStorage.getItem("language") || defaultLang;
  setLanguage(savedLang);
}

// Update language and save preference
function updateLanguage(lang) {
  localStorage.setItem("language", lang);
  setLanguage(lang);
}
