<template>
  <div class="mdui-text-center mdui-m-a-2 mdui-float-left">
    <div
      class="mdui-typo-display-3"
      v-bind:class="{
        'mdui-text-color-green': resultGreen,
        'mdui-text-color-red': resultRed,
        'mdui-text-color-amber': resultAmber,
      }"
      v-on:click="changeColor"
      style="cursor: pointer; user-select: none"
    >
      {{ question }}
    </div>
    <div
      class="mdui-typo-title"
      v-bind:class="{
        'mdui-invisible': !showAnswer,
      }"
    >
      {{ answer }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: "",
      status: "",
      resultGreen: false,
      resultRed: false,
      resultAmber: false,
      showAnswer: false,
      from:
        this.globalVariable["setting"]["from"] == "romanization"
          ? this.globalVariable["setting"]["romanization"]
          : this.globalVariable["setting"]["from"],
      to:
        this.globalVariable["setting"]["to"] == "romanization"
          ? this.globalVariable["setting"]["romanization"]
          : this.globalVariable["setting"]["to"], // 决定是罗马字还是平假名片假名
    };
  },
  name: "FastModeCell",
  props: {
    selectedOneOn: String, // 进行测试的那个五十音
    index: Number,
  },
  beforeMount() {
    if (this.selectedOneOn != undefined) {
      let nameList, on;
      nameList = this.selectedOneOn.split("_");
      if (nameList[0] == "s") {
        on = "seion";
      } else if (nameList[0] == "d") {
        on = "dakuon";
      } else if (nameList[0] == "y") {
        on = "youon";
      }
      this.question = this.globalVariable.gojuuon[on][this.from][nameList[1]][
        nameList[2]
      ]; // [清/浊/拗][平/片/罗][行][列]
      this.answer = this.globalVariable.gojuuon[on][this.to][nameList[1]][
        nameList[2]
      ]; // [清/浊/拗][平/片/罗][行][列]W
    }
  },
  methods: {
    changeColor() {
      let nameList;
      if (this.selectedOneOn != undefined) {
        nameList = this.selectedOneOn.split("_");
      }
      if (!this.resultGreen && !this.resultRed && !this.resultAmber) {
        this.showAnswer = true; // 显示答案
        this.resultGreen = true; // 黑变绿，正确
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["right"]++; // 计数
      } else if (this.resultGreen && !this.resultRed && !this.resultAmber) {
        // 绿变红，错误
        this.resultGreen = false;
        this.resultRed = true;
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["right"]--;
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["wrong"]++;
      } else if (!this.resultGreen && this.resultRed && !this.resultAmber) {
        this.resultRed = false;
        this.resultAmber = true; // 红变黄，生疏
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["wrong"]--;
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["hesitate"]++;
      } else if (!this.resultGreen && !this.resultRed && this.resultAmber) {
        this.resultAmber = false;
        this.resultGreen = true; // 黄变绿，正确
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["hesitate"]--;
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["right"]++;
      }
      localStorage.setItem(
        "studyRecord",
        JSON.stringify(this.globalVariable.studyRecord)
      );
    },
  },
  inject: ["globalVariable"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
