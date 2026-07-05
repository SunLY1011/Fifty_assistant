<template>
  <div class="mdui-col-xs-6 mdui-m-y-1">
    <div class="mdui-card mdui-hoverable mdui-ripple">
      <div
        class="mdui-card-content mdui-text-center"
        v-bind:style="fontStyle"
        v-bind:class="{
          'mdui-color-green':
            selected == '' ? false : optionOn == answer ? true : false,
          'mdui-color-red':
            selected == optionOn ? (optionOn == answer ? false : true) : false,
        }"
      >
        <div class="mdui-m-y-2" style="font-size: 4em; line-height: 1em">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PractiseOptionCard",
  props: {
    fontStyle: String,
    optionOn: String, // 自身选项
    answer: String, // 正确答案
    selected: String, // 选中的选项
  },
  inject: ["globalVariable"],
  data: function () {
    return {
      option: "",
      to:
        this.globalVariable["setting"]["to"] == "romanization"
          ? this.globalVariable["setting"]["romanization"]
          : this.globalVariable["setting"]["to"], // 决定是罗马字还是平假名片假名
    };
  },
  beforeMount() {
    if (this.optionOn != undefined) {
      let nameList, on;
      nameList = this.optionOn.split("_");
      if (nameList[0] == "s") {
        on = "seion";
      } else if (nameList[0] == "d") {
        on = "dakuon";
      } else if (nameList[0] == "y") {
        on = "youon";
      }
      this.option = this.globalVariable.gojuuon[on][this.to][nameList[1]][
        nameList[2]
      ]; // [清/浊/拗][平/片/罗][行][列]
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
