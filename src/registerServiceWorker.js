/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
      if (window.mdui) {
        window.mdui.snackbar({
          message: "已缓存内容，支持离线使用",
          timeout: 3000,
          position: "bottom"
        });
      }
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      if (window.mdui) {
        window.mdui.snackbar({
          message: "新版本已准备好，点击刷新体验新功能",
          buttonText: "刷新",
          timeout: 0,
          position: "bottom",
          onClick: function () {
            window.location.reload();
          }
        });
      } else {
        alert("新版本已准备好，请刷新页面");
      }
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
      if (window.mdui) {
        window.mdui.snackbar({
          message: "当前处于离线模式，应用已缓存，可继续学习",
          timeout: 5000,
          position: "bottom"
        });
      }
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredPrompt = e;
  console.log("安装提示已准备，可调用 window.showInstallPrompt() 触发");
  setTimeout(function () {
    if (window.mdui) {
      window.mdui.snackbar({
        message: "可将本应用添加到主屏幕",
        buttonText: "安装",
        timeout: 10000,
        position: "bottom",
        onClick: function () {
          window.showInstallPrompt();
        }
      });
    }
  }, 3000);
});

window.showInstallPrompt = function () {
  if (!deferredPrompt) {
    if (window.mdui) {
      window.mdui.snackbar({
        message: "请稍后再试，或手动从浏览器菜单添加到主屏幕",
        timeout: 3000,
        position: "bottom"
      });
    }
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function (choiceResult) {
    if (choiceResult.outcome === "accepted") {
      console.log("用户接受安装提示");
    } else {
      console.log("用户拒绝安装提示");
    }
    deferredPrompt = null;
  });
};