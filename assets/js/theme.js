(function () {
  "use strict";

  var storageKey = "theme-preference";
  var allowedThemes = ["light", "dark", "system"];
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-theme-value]");

  function setTheme(theme, savePreference) {
    if (allowedThemes.indexOf(theme) === -1) {
      theme = "system";
    }

    root.dataset.theme = theme;

    buttons.forEach(function (button) {
      var isActive = button.dataset.themeValue === theme;
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (savePreference) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        // 저장소를 사용할 수 없어도 현재 페이지의 테마 전환은 유지합니다.
      }
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.dataset.themeValue, true);
    });
  });

  setTheme(root.dataset.theme || "system", false);
})();
