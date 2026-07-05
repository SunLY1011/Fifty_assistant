<template>
  <audio
    id="audio"
    ref="audio"
    v-bind:volume="bgVolume"
    loop
    hidden="true"
  ></audio>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div class="mdui-progress mdui-invisible">
        <div
          class="mdui-progress-determinate mdui-color-theme-accent"
          style="width: 30%; opacity: 1"
        ></div>
      </div>
      <div class="mdui-col-xs-12">
        <div class="mdui-float-left mdui-m-y-1 mdui-invisible">
          <i class="mdui-icon material-icons mdui-typo-body-1-opacity"
            >checklist</i
          >
          <span class="mdui-typo-body-1-opacity mdui-m-x-1">3 / 10</span>
          <i class="mdui-icon material-icons mdui-typo-body-1-opacity">timer</i>
          <span class="mdui-typo-body-1-opacity mdui-m-x-1">8s</span>
        </div>
        <div class="mdui-float-right">
          <button
            class="mdui-btn mdui-btn-icon mdui-ripple"
            mdui-dialog="{target: '#helpDialog'}"
            mdui-tooltip="{content: '帮助'}"
          >
            <i class="mdui-icon material-icons">help</i>
          </button>
          <button
            class="mdui-btn mdui-btn-icon mdui-ripple"
            mdui-dialog="{target: '#gojuuonSelectorDialog'}"
            mdui-tooltip="{content: '选择练习内容'}"
          >
            <i class="mdui-icon material-icons">fact_check</i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mdui-container mdui-typo">
    <div class="mdui-row">
      <div class="mdui-col-xs-12 mdui-col-sm-10 mdui-col-offset-sm-1 mdui-typo">
        <template v-if="newToHere">
          <div class="mdui-typo-body-1-opacity mdui-text-center">
            选择内容，然后进行快速练习。
          </div>
        </template>
        <template v-for="(item, index) in fastList" v-bind:key="item">
          <FastModeCell
            v-bind:selectedOneOn="item"
            v-bind:index="index"
          ></FastModeCell>
        </template>

        <div class="mdui-col-xs-12 mdui-text-center mdui-m-y-2">
          <button
            class="mdui-btn mdui-btn-icon mdui-btn-raised mdui-color-theme-accent mdui-ripple"
            v-on:click="addTwentyQuestions()"
            mdui-tooltip="{content: '再来一组'}"
          >
            <i class="mdui-icon material-icons">add</i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="mdui-dialog" id="helpDialog">
    <div class="mdui-dialog-title">什么是快速模式？</div>
    <div class="mdui-dialog-content">
      <div class="mdui-container mdui-typo">
        <div class="row">
          <div class="mdui-col-xs-12 mdui-m-y-1">
            <p class="mdui-typo-body-2-opacity" style="text-indent: 2em">
              快速模式是一种迅速、简便的学习模式，适合在碎片化时间进行快速练习。
            </p>
            <p class="mdui-typo-body-2-opacity" style="text-indent: 2em">
              使用方法：选择需要练习的内容后，屏幕上会刷新一批字符。请读入一个字符，思考对应的内容，然后点击这个字符查看下方的答案。如果您回答正确，请保留<strong
                class="mdui-text-color-green"
              >
                绿色 </strong
              >；如果您回答错误，请再次点击字符使得颜色变为<strong
                class="mdui-text-color-red"
              >
                红色 </strong
              >；如果您作答正确但犹豫，请再次点击字符使得颜色变为<strong
                class="mdui-text-color-amber"
              >
                黄色 </strong
              >。该模式下后台程序将会记录您的作答结果，请保持自觉哦。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>确定</button>
    </div>
  </div>
  <GojuuonSelectorDialog />
</template>

<style></style>

<script>
import mdui from "mdui";
import GojuuonSelectorDialog from "@/components/GojuuonSelectorDialog.vue";
import FastModeCell from "@/components/FastModeCell.vue";

export default {
  data() {
    return {
      fastList: [],
      newToHere: true,
    };
  },
  mounted() {
    mdui.mutation();
    this.$emit("updateAppbarTitle", "快速模式");
  },
  inject: ["globalVariable"],
  components: {
    GojuuonSelectorDialog,
    FastModeCell,
  },
  methods: {
    addTwentyQuestions: function () {
      let chosedOnList = [];
      for (let on in this.globalVariable.selectedOn) {
        for (
          let lineIndex = 0;
          lineIndex <= this.globalVariable.selectedOn[on]["lines"].length;
          lineIndex++
        ) {
          let line = this.globalVariable.selectedOn[on]["lines"][lineIndex];
          if (line) {
            // 防止 undefined
            for (let colIndex in this.globalVariable.selectedOn[on][line]) {
              if (this.globalVariable.selectedOn[on][line][colIndex]) {
                chosedOnList.push(on + "_" + line + "_" + colIndex);
              }
            }
          }
        }
      }

      if (chosedOnList.length == 0) {
        mdui.alert("你还没有选择学习内容！请先选择后再进行学习。", "空空如也");
      } else {
        this.newToHere = false;
        let frontOn = "";
        for (let i = 0; i < 20; i++) {
          let chosedOn =
            chosedOnList[Math.floor(Math.random() * chosedOnList.length)];
          while (frontOn == chosedOn) {
            chosedOn =
              chosedOnList[Math.floor(Math.random() * chosedOnList.length)];
          } // 保证连续两个不一样
          frontOn = chosedOn;
          this.fastList.push(chosedOn);
        }
      }
    },
  },
};
</script>
