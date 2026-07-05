<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div class="mdui-col-xs-12">
        <ul class="mdui-list">
          <li class="mdui-subheader">账号与同步（开发中）</li>
          <!--<li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons"
              >account_circle</i
            >
            <div class="mdui-list-item-content">登录</div>
          </li>
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons"
              >app_registration
            </i>
            <div class="mdui-list-item-content">注册</div>
          </li>-->
          <li class="mdui-list-item">
            <i
              class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-disabled"
              >account_circle</i
            >
            <div class="mdui-list-item-content mdui-text-color-theme-disabled">
              登录
            </div>
          </li>
          <li class="mdui-list-item">
            <i
              class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-disabled"
              >app_registration
            </i>
            <div class="mdui-list-item-content mdui-text-color-theme-disabled">
              注册
            </div>
          </li>
          <li class="mdui-subheader">学习记录</li>
          <li
            class="mdui-list-item mdui-ripple"
            v-on:click="this.$router.push('/personalCenter/studyStatus')"
          >
            <i class="mdui-list-item-icon mdui-icon material-icons"
              >assessment</i
            >
            <div class="mdui-list-item-content">学习情况</div>
          </li>
          <li
            class="mdui-list-item mdui-ripple"
            mdui-dialog="{target: '#restoreDialog'}"
          >
            <i class="mdui-list-item-icon mdui-icon material-icons">delete</i>
            <div class="mdui-list-item-content">清空学习记录</div>
          </li>
          <li class="mdui-subheader">环境设定</li>
          <li
            class="mdui-list-item mdui-ripple"
            v-on:click="this.$router.push('/personalCenter/setting')"
          >
            <i class="mdui-list-item-icon mdui-icon material-icons">settings</i>
            <div class="mdui-list-item-content">设置</div>
          </li>
          <li class="mdui-subheader">其他</li>
          <li
            class="mdui-list-item mdui-ripple"
            v-on:click="this.$router.push('/personalCenter/about')"
          >
            <i class="mdui-list-item-icon mdui-icon material-icons">info</i>
            <div class="mdui-list-item-content">关于</div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="mdui-dialog" id="restoreDialog">
    <div class="mdui-dialog-title">清除学习记录</div>
    <div class="mdui-dialog-content">
      <p>Re: 从零开始的五十音学习。这将清除您所有的学习记录。</p>
      <p>务请注意，该操作<strong>不可撤销</strong>。您确定要进行此操作吗？</p>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="restoreStudyRecord"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>
</template>

<script>
// import mdui from "mdui";

export default {
  inject: ["globalVariable"],
  methods: {
    restoreStudyRecord: function () {
      this.globalVariable.studyRecord = this.globalVariable.studyRecordDefault;
      localStorage.setItem(
        "studyRecord",
        JSON.stringify(this.globalVariable.studyRecord)
      );
    },
  },
};
</script>
