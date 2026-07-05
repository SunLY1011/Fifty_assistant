<template>
  <div class="mdui-row">
    <div class="mdui-col-xs-12 mdui-m-y-1">
      <div class="mdui-card mdui-hoverable mdui-ripple">
        <div
          class="mdui-card-content mdui-text-center"
          v-bind:style="fontStyle"
        >
          <div class="mdui-m-y-2" style="font-size: 6em; line-height: 1em">
            {{ question }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PractiseQuestionCard",
  props: {
    fontStyle: String,
    questionOn: String,
    // globalVariable,
  },
  data: function () {
    return {
      question: "",
      from:
        this.globalVariable["setting"]["from"] == "romanization"
          ? this.globalVariable["setting"]["romanization"]
          : this.globalVariable["setting"]["from"],
    };
  },
  inject: ["globalVariable"],
  beforeMount() {
    if (this.questionOn != undefined) {
      let nameList, on;
      nameList = this.questionOn.split("_");
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
