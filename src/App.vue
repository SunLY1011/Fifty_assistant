<template>
  <div id="app-wrapper">
    <!-- 离线路径横幅 -->
    <div v-if="isOffline" class="offline-banner">
      <i class="mdui-icon material-icons">cloud_off</i>
      <span>当前处于离线模式，应用已缓存，可继续学习</span>
      <button @click="retryConnection" class="offline-btn">重试</button>
    </div>

  <header>
    <nav class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <span
          class="mdui-btn mdui-btn-icon"
          mdui-drawer="{target: '#left-drawer'}"
          ><i class="mdui-icon material-icons">menu</i></span
        >
        <!-- 大屏显示 App Title 和当前路由 Title  -->
        <router-link to="/" class="mdui-typo-headline mdui-hidden-sm-down"
          >五十音助手</router-link
        >
        <span class="mdui-typo-title mdui-hidden-sm-down mdui-m-l-5">{{
          appbarTitle
        }}</span>
        <!-- 小屏仅显示当前路由 Title  -->
        <span class="mdui-typo-headline mdui-hidden-md-up">{{
          appbarTitle
        }}</span>

        <div class="mdui-toolbar-spacer mdui-hidden-sm-down"></div>
      </div>
    </nav>
    <div class="mdui-drawer mdui-shadow-3" id="left-drawer">
      <ul class="mdui-list">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
          <router-link to="/" class="mdui-list-item-content">主页</router-link>
        </li>
        <li class="mdui-subheader-inset">学习</li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">table_view</i>
          <router-link to="/table" class="mdui-list-item-content"
            >五十音图</router-link
          >
        </li>
        <li class="mdui-subheader-inset">练习</li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons"
            >follow_the_signs</i
          >
          <router-link to="/practise/normal" class="mdui-list-item-content"
            >普通模式</router-link
          >
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">bolt</i>
          <router-link to="/practise/fast" class="mdui-list-item-content"
            >快速模式</router-link
          >
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons"
            >self_improvement</i
          >
          <router-link to="/practise/zen" class="mdui-list-item-content"
            >禅模式</router-link
          >
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">preview</i>
          <router-link to="/practise/review" class="mdui-list-item-content"
            >复习模式</router-link
          >
        </li>
        <li class="mdui-subheader-inset">个人</li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons"
            >manage_accounts</i
          >
          <router-link to="/personalCenter" class="mdui-list-item-content"
            >个人中心</router-link
          >
        </li>
      </ul>
    </div>
  </header>

  <main>
    <router-view v-on:updateAppbarTitle="updateAppbarTitle" />
  </main>

  <footer>
    <div class="mdui-appbar">
      <div
        class="mdui-hidden-sm-down mdui-color-theme"
        style="height: 192px; display: flex; flex-direction: column"
      >
        <div class="mdui-container mdui-typo" style="flex: auto">
          <div class="mdui-row">
            <div class="mdui-col-md-5 mdui-col-sm-12">
              <h4 class="mdui-text-color-white">五十音助手<br /></h4>
              <p
                class="mdui-text-color-white-secondary mdui-typo-caption-opacity mdui-m-b-2"
              >
                本站需使用如 Firefox 或 Chrome
                等现代浏览器，方有完整浏览体验。如遇功能缺失，请更换您的浏览器再试。
              </p>
            </div>
          </div>
        </div>

        <div
          style="background: rgba(0, 0, 0, 0.15); flex: none"
          class="mdui-p-y-1 mdui-typo"
        >
          <div class="mdui-container">
            <span class="mdui-text-color-white-secondary" id="copyright"
              >© {{ updateCopyright() }}</span
            >
            <span class="mdui-text-color-theme-secondary mdui-m-l-1"
              ><a
                target="_blank"
                class="mdui-text-color-white-secondary"
                href="https://github.com/foldblade/gojuuon_helper"
                >五十音助手</a
              ></span
            >
          </div>
        </div>
      </div>

      <div
        class="mdui-bottom-nav mdui-color-white mdui-hidden-md-up mdui-bottom-nav-scroll-hide"
      >
        <router-link to="/" class="mdui-ripple">
          <i class="mdui-icon material-icons">home</i>
          <label>主页</label>
        </router-link>
        <router-link to="/#practice" class="mdui-ripple">
          <i class="mdui-icon material-icons">fitness_center</i>
          <label>练习</label>
        </router-link>
        <router-link to="/personalCenter" class="mdui-ripple">
          <i class="mdui-icon material-icons">manage_accounts</i>
          <label>个人中心</label>
        </router-link>
      </div>
    </div>
  </footer>
  </div>
</template>

<style>
/* 离线路径横幅样式 */
.offline-banner {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #ff9800 0%, #f57c00 100%);
  color: white;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 9999;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.offline-banner i {
  font-size: 20px;
}

.offline-btn {
  background: white;
  color: #f57c00;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  transition: all 0.2s;
}

.offline-btn:hover {
  background: #fff3e0;
  transform: scale(1.05);
}

/* 重写 mdui-bottom-nav-fixed，以达到响应式固定底部栏 */
.mdui-bottom-nav-fixed {
  padding-bottom: 0px;
}
main {
  min-height: calc(100vh - 64px - 192px);
}
@media (max-width: 1023.9px) {
  .mdui-bottom-nav-fixed {
    padding-bottom: 56px;
  }
  main {
  }
}
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      appbarTitle: "",
      appbarSubtitle: "",
      isOffline: !navigator.onLine
    };
  },
  inject: ["globalVariable"],
  created() {
    console.log("App created");
    this.updateTitle("五十音助手");

    // 监听网络状态变化
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  },
  beforeUnmount() {
    // 清理事件监听器
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  },
  mounted() {
    console.log("App mounted");
    if (localStorage.getItem("globalVariableVersion") != null) {
      if (
        this.globalVariable.globalVariableVersion !=
        localStorage.getItem("globalVariableVersion")
      ) {
        // 全局变量有更新
        // 备份上一个版本的设置
        let savedSetting = JSON.parse(localStorage.getItem("setting"));
        localStorage.setItem("pre_setting", JSON.stringify(savedSetting));
        // 备份上一个版本选中的五十音
        let savedSelectedOn = JSON.parse(localStorage.getItem("selectedOn"));
        localStorage.setItem("pre_selectedOn", JSON.stringify(savedSelectedOn));
        // 备份上一个版本的学习记录
        let savedStudyRecord = JSON.parse(localStorage.getItem("studyRecord"));
        localStorage.setItem(
          "pre_studyRecord",
          JSON.stringify(savedStudyRecord)
        );

        // 更新……
      }
    } else {
      localStorage.setItem(
        "globalVariableVersion",
        this.globalVariable.globalVariableVersion
      );
    }
    if (localStorage.getItem("setting") != null) {
      // 存在本地配置文件
      this.globalVariable.setting = JSON.parse(localStorage.getItem("setting"));
    } else {
      localStorage.setItem(
        "setting",
        JSON.stringify(this.globalVariable.setting)
      );
    }

    if (localStorage.getItem("selectedOn") != null) {
      // 存在本地设置文件
      this.globalVariable.selectedOn = JSON.parse(
        localStorage.getItem("selectedOn")
      );
    } else {
      localStorage.setItem(
        "selectedOn",
        JSON.stringify(this.globalVariable.selectedOn)
      );
    }

    if (localStorage.getItem("studyRecord") != null) {
      // 存在本地配置文件
      this.globalVariable.studyRecord = JSON.parse(
        localStorage.getItem("studyRecord")
      );
    } else {
      localStorage.setItem(
        "studyRecord",
        JSON.stringify(this.globalVariable.studyRecord)
      );
    }

    // 显示模式
    if (this.globalVariable.setting.displayMode == "auto") {
      document.querySelector("body").className =
        "mdui-theme-layout-auto mdui-theme-primary-indigo mdui-theme-accent-pink mdui-drawer-body-left mdui-bottom-nav-fixed mdui-appbar-with-toolbar";
    } else if (this.globalVariable.setting.displayMode == "dark") {
      document.querySelector("body").className =
        "mdui-theme-layout-dark mdui-theme-primary-indigo mdui-theme-accent-pink mdui-drawer-body-left mdui-bottom-nav-fixed mdui-appbar-with-toolbar";
    } else if (this.globalVariable.setting.displayMode == "light") {
      document.querySelector("body").className =
        "mdui-theme-layout-light mdui-theme-primary-indigo mdui-theme-accent-pink mdui-drawer-body-left mdui-bottom-nav-fixed mdui-appbar-with-toolbar";
    }
  },
  methods: {
    updateTitle(titleName) {
      document.title = titleName;
    },
    updateCopyright() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      return year;
    },
    updateAppbarTitle(appbarTitle) {
      console.log(appbarTitle);
      this.appbarTitle = appbarTitle;
    },
    handleOnline() {
      this.isOffline = false;
      if (window.mdui) {
        window.mdui.snackbar({
          message: "网络已恢复",
          timeout: 2000,
          position: "bottom"
        });
      }
    },
    handleOffline() {
      this.isOffline = true;
      if (window.mdui) {
        window.mdui.snackbar({
          message: "当前处于离线模式，应用已缓存，可继续学习",
          timeout: 5000,
          position: "bottom"
        });
      }
    },
    retryConnection() {
      if (navigator.onLine) {
        this.isOffline = false;
      } else {
        // 尝试重新加载页面
        window.location.reload();
      }
    }
  },
};
</script>
