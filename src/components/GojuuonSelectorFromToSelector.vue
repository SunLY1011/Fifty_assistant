<template>
  <div class="mdui-col-xs-5 mdui-m-y-1">
    <template v-if="refreshToSelector">
      <select
        id="gojuuonSelectorFromSelect"
        class="mdui-select"
        mdui-select="{position: 'bottom'}"
        v-model="from"
      >
        <option
          v-bind:value="item[1]"
          v-for="(item, index) in fromToNameValue"
          v-bind:key="index"
        >
          {{ fromToNameValue[index][0] }}
        </option>
      </select>
    </template>
  </div>
  <div class="mdui-col-xs-2 mdui-m-y-1 mdui-text-center">
    <button class="mdui-btn mdui-btn-icon" v-on:click="swapFromTo">
      <i class="mdui-icon material-icons">swap_horiz</i>
    </button>
  </div>
  <div class="mdui-col-xs-5 mdui-m-y-1">
    <template v-if="refreshToSelector">
      <select
        id="gojuuonSelectorToSelect"
        class="mdui-select"
        mdui-select="{position: 'bottom'}"
        v-model="to"
      >
        <template
          v-for="(item, index) in fromToNameValue"
          v-bind:key="(index, from)"
        >
          <option
            v-bind:value="item[1]"
            v-bind:disabled="item[1] == from ? true : false"
          >
            {{ fromToNameValue[index][0] }}
          </option>
        </template>
      </select>
    </template>
  </div>
</template>

<script>
import mdui from "mdui";

export default {
  name: "GojuuonSelectorFromToSelector",
  props: {},
  data() {
    return {
      // fromSelect: new mdui.Select("#gojuuonSelectorFromSelect", {
      //   position: "bottom",
      // }),
      // toSelect: new mdui.Select("#gojuuonSelectorToSelect", {
      //   position: "bottom",
      // }),
      from: this.globalVariable.setting["from"],
      to: this.globalVariable.setting["to"],
      refreshFromSelector: true,
      refreshToSelector: true,
      fromToNameValue: [
        ["平假名", "hiragana"],
        ["片假名", "katakana"],
        ["罗马字", "romanization"],
      ],
    };
  },
  inject: ["globalVariable"],
  mounted() {
    mdui.mutation();
  },
  watch: {
    from(val) {
      // 监听来源方向选择
      if (val == this.to) {
        for (let i = 0; i < this.fromToNameValue.length; i++) {
          if (this.fromToNameValue[i][1] != val) {
            this.to = this.fromToNameValue[i][1];
            break;
          }
        }
      }
      this.refreshFromTo();
      this.saveFromTo();
    },
    to(val) {
      val;
      mdui.mutation();
      this.saveFromTo();
    },
  },
  methods: {
    swapFromTo() {
      let temp;
      temp = this.to;
      this.to = this.from;
      this.from = temp;
      this.refreshFromTo();
    },
    refreshFromTo() {
      this.refreshFromSelector = false;
      this.refreshToSelector = false;

      let fromSelectDivs = document.getElementById("gojuuonSelectorFromSelect")
        .parentElement;
      // 循环删除 mdui 所创建的多余的已经没用的div
      for (let i = fromSelectDivs.childNodes.length - 1; i >= 0; i--) {
        if (fromSelectDivs.childNodes[i].nodeName == "SELECT") {
          break;
        } else {
          fromSelectDivs.removeChild(fromSelectDivs.childNodes[i]);
        }
      }
      let toSelectDivs = document.getElementById("gojuuonSelectorToSelect")
        .parentElement;
      // 循环删除 mdui 所创建的多余的已经没用的div
      for (let i = toSelectDivs.childNodes.length - 1; i >= 0; i--) {
        if (toSelectDivs.childNodes[i].nodeName == "SELECT") {
          break;
        } else {
          toSelectDivs.removeChild(toSelectDivs.childNodes[i]);
        }
      }

      // 下一刻恢复刷新
      this.$nextTick(() => {
        this.refreshFromSelector = true;
        this.refreshToSelector = true;
        // 再下一刻初始化
        this.$nextTick(() => {
          mdui.mutation();
        });
      });
    },
    saveFromTo() {
      this.globalVariable.setting["from"] = this.from;
      this.globalVariable.setting["to"] = this.to;
      localStorage.setItem(
        "setting",
        JSON.stringify(this.globalVariable.setting)
      );
    },
  },
  computed: {
    // newFromToNameList() {
    //   let newFromToNameList = [];
    //   for (let i = 0; i < this.fromToValueList.length; i++) {
    //     if (this.fromToValueList[i] != this.from) {
    //       newFromToNameList.push(this.fromToNameList[i]);
    //     }
    //   }
    //   return newFromToNameList;
    // },
    // newFromToValueList() {
    //   let newFromToValueList = [];
    //   for (let i = 0; i < this.fromToValueList.length; i++) {
    //     if (this.fromToValueList[i] != this.from) {
    //       newFromToValueList.push(this.fromToValueList[i]);
    //     }
    //   }
    //   return newFromToValueList;
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
