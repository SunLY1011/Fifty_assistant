<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div class="mdui-col-xs-12">
        <ul class="mdui-list">
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons"
              >dark_mode</i
            >
            <div
              class="mdui-list-item-content"
              mdui-dialog="{target: '#darkModeDialog'}"
            >
              显示模式
            </div>
          </li>
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons"
              >volume_down</i
            >
            <div
              class="mdui-list-item-content"
              mdui-dialog="{target: '#volumeDialog'}"
            >
              音量
            </div>
          </li>
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">language</i>
            <div
              class="mdui-list-item-content"
              mdui-dialog="{target: '#romanizationDialog'}"
            >
              罗马字方案
            </div>
          </li>
          <li class="mdui-divider"></li>
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">restore</i>
            <div
              class="mdui-list-item-content"
              mdui-dialog="{target: '#restoreDialog'}"
            >
              还原默认设置
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="mdui-dialog" id="darkModeDialog">
    <div class="mdui-dialog-title">显示模式</div>
    <div class="mdui-dialog-content" style="overflow: visible">
      <div class="mdui-p-y-3">
        <select
          class="mdui-select"
          v-model="globalVariable.setting.displayMode"
          mdui-select
        >
          <option value="auto">自动</option>
          <option value="dark">深色模式</option>
          <option value="light">浅色模式</option>
        </select>
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="saveSetting"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>

  <div class="mdui-dialog" id="volumeDialog">
    <div class="mdui-dialog-title">音量</div>
    <div class="mdui-dialog-content" style="overflow: visible">
      <div class="mdui-p-y-3">
        <label class="mdui-slider">
          <input
            v-model="globalVariable.setting.volume"
            type="range"
            step="0.01"
            min="0"
            max="1.0"
          />
        </label>
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="saveSetting"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>

  <div class="mdui-dialog" id="romanizationDialog">
    <div class="mdui-dialog-title">罗马字方案</div>
    <div class="mdui-dialog-content" style="overflow: visible">
      <div class="mdui-p-y-3">
        <select
          class="mdui-select"
          v-model="globalVariable.setting.romanization"
          mdui-select
        >
          <option value="hepburn-romanization">平文式（赫本式，默认）</option>
          <option value="kunrei-shiki-romanization">
            训令式（文部省式，ISO 3602 宽式）
          </option>
        </select>
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="saveSetting"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>

  <div class="mdui-dialog" id="restoreDialog">
    <div class="mdui-dialog-title">还原默认设置</div>
    <div class="mdui-dialog-content">
      <p>这将清除您所作的一切配置，并还原为默认设置。</p>
      <p>务请注意，该操作<strong>不可撤销</strong>。您确定要进行此操作吗？</p>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="restoreSetting"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>
</template>

<script>
import mdui from "mdui";

export default {
  mounted() {
    mdui.mutation();
  },
  methods: {
    saveSetting: function () {
      localStorage.setItem(
        "setting",
        JSON.stringify(this.globalVariable.setting)
      );
      this.refreshDisplayMode();
    },
    refreshDisplayMode: function () {
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
    restoreSetting: function () {
      this.globalVariable.setting = this.globalVariable.settingDefault;
      localStorage.setItem(
        "setting",
        JSON.stringify(this.globalVariable.setting)
      );
    },
  },
  inject: ["globalVariable"],
};
</script>
