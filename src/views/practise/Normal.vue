<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div
        class="mdui-progress"
        v-bind:class="{ 'mdui-invisible': newToHere || done }"
      >
        <div
          class="mdui-progress-determinate mdui-color-theme-accent"
          style="opacity: 1"
          v-bind:style="{ width: (timerProcess / 6) * 100 + '%' }"
        ></div>
      </div>
      <div class="mdui-col-xs-12">
        <div
          class="mdui-float-left mdui-m-y-1"
          v-bind:class="{ 'mdui-invisible': newToHere || done }"
        >
          <i class="mdui-icon material-icons mdui-typo-body-1-opacity"
            >checklist</i
          >
          <span class="mdui-typo-body-1-opacity mdui-m-x-1"
            >{{ rightCount + wrongCount }} /
            {{ test.totalQuestions.length }}</span
          >
          <i class="mdui-icon material-icons mdui-typo-body-1-opacity">timer</i>
          <span class="mdui-typo-body-1-opacity mdui-m-x-1"
            >{{ (6 - timerProcess).toFixed(2) }}s</span
          >
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
      <div
        class="mdui-col-xs-12 mdui-col-lg-6 mdui-col-offset-lg-3 mdui-col-md-8 mdui-col-offset-md-2 mdui-col-sm-10 mdui-col-offset-sm-1 test-area"
      >
        <template v-if="newToHere">
          <div class="mdui-typo-body-1-opacity mdui-text-center">
            选择内容，然后进行练习。
          </div>
          <div class="mdui-col-xs-12 mdui-text-center mdui-m-y-2 mdui-typo">
            <button
              class="mdui-btn mdui-btn-icon mdui-btn-raised mdui-color-theme-accent mdui-ripple"
              v-on:click="prepareQuestions()"
            >
              <i class="mdui-icon material-icons">play_arrow </i>
            </button>
            <div class="mdui-typo-body-1-opacity mdui-m-y-1">开始练习</div>
          </div>
        </template>
        <template v-else>
          <template v-if="refresh">
            <PractiseQuestionCard
              v-bind:questionOn="test.question"
              fontStyle=" font-weight: 200"
            ></PractiseQuestionCard>
            <hr />
            <div class="mdui-row">
              <template v-for="(option, index) in test.options" :key="index">
                <PractiseOptionCard
                  v-bind:optionOn="option"
                  fontStyle="font-weight: 200"
                  v-on:click="click(option)"
                  v-bind:answer="test.question"
                  v-bind:selected="selected"
                >
                </PractiseOptionCard>
              </template>
            </div>
          </template>
          <template v-else> </template>
          <template v-if="done">
            <div class="mdui-typo-body-1-opacity mdui-text-center">
              <i
                class="mdui-icon material-icons mdui-m-y-1"
                style="font-size: 4rem"
                >celebration
              </i>
              <div class="mdui-typo-body-1-opacity mdui-m-y-1">
                恭喜完成练习！
              </div>
              <div class="mdui-typo-body-2-opacity mdui-m-y-1">
                正确：{{ rightCount }} 错误：{{ wrongCount }}
              </div>
            </div>
            <div class="mdui-col-xs-12 mdui-text-center mdui-m-y-2 mdui-typo">
              <button
                class="mdui-btn mdui-btn-icon mdui-btn-raised mdui-color-theme-accent mdui-ripple"
                v-on:click="prepareQuestions()"
              >
                <i class="mdui-icon material-icons">refresh</i>
              </button>
              <div class="mdui-typo-body-1-opacity mdui-m-y-1">再来一组</div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>

  <div class="mdui-dialog" id="helpDialog">
    <div class="mdui-dialog-title">什么是普通模式？</div>
    <div class="mdui-dialog-content">
      <div class="mdui-container mdui-typo">
        <div class="row">
          <div class="mdui-col-xs-12 mdui-m-y-1">
            <p class="mdui-typo-body-2-opacity" style="text-indent: 2em">
              普通模式是普通的练习模式。每一道题目都会有限定时间，您需要在限定时间内完成答题。回答结果将会被记录。
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

<style>
.test-area {
  display: flex;
  flex-direction: column;
  min-height: 500px;
  padding-top: calc((100vh - 500px - 64px - 192px - 40px) * 0.8);
}
@media (max-width: 1023.9px) {
  .test-area {
    display: flex;
    flex-direction: column;
    min-height: 500px;
    padding-top: calc((100vh - 500px - 56px - 40px) * 0.8);
  }
}
</style>

<script>
import mdui from "mdui";
import GojuuonSelectorDialog from "@/components/GojuuonSelectorDialog.vue";
import PractiseOptionCard from "@/components/PractiseOptionCard.vue";
import PractiseQuestionCard from "@/components/PractiseQuestionCard.vue";
import { ref } from "vue";

export default {
  data() {
    return {
      newToHere: true,
      clicked: false,
      selected: "",
      refresh: false,
      done: false,
      rightCount: 0,
      wrongCount: 0,
      timer: null,
      timerProcess: 0,
    };
  },
  mounted() {
    mdui.mutation();
    this.$emit("updateAppbarTitle", "普通模式");
    // this.setPlayer();
  },
  inject: ["globalVariable"],
  components: {
    GojuuonSelectorDialog,
    PractiseOptionCard,
    PractiseQuestionCard,
  },
  methods: {
    shuffle: function (input) {
      for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
      return input;
    },
    prepareQuestions: function () {
      let chosedOnList = [];
      this.done = false;
      this.rightCount = 0;
      this.wrongCount = 0;
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
      this.test.totalQuestions = this.shuffle(chosedOnList);
      this.test.questionsQuery = [...this.test.totalQuestions]; // ES6 Deep copy

      this.nextQuestion();
    },
    nextQuestion: function () {
      this.selected = "";

      mdui.mutation();
      if (this.test.totalQuestions.length == 0) {
        mdui.alert("你还没有选择学习内容！请先选择后再进行学习。", "空空如也");
      } else {
        this.newToHere = false;
        if (this.test.questionsQuery.length > 0) {
          this.test.question = this.test.questionsQuery[0];
          this.test.questionsQuery.shift();
          this.test.questionsQuery = [...this.test.questionsQuery];
          let options = [];
          options.push(this.test.question);
          for (let i = 0; i < 3; i++) {
            let randOn = this.test.totalQuestions[
              Math.floor(Math.random() * this.test.totalQuestions.length)
            ];
            while (options.includes(randOn)) {
              randOn = this.test.totalQuestions[
                Math.floor(Math.random() * this.test.totalQuestions.length)
              ];
            }
            options.push(randOn); // 添加其他选项
          }
          this.test.options = [...this.shuffle(options)];
          console.log(this.test.question, this.test.options);
          // this.status = "refresh";
          this.refresh = true;
          if (this.timer == null) {
            this.timer = setInterval(() => {
              this.timerProcess += 0.04;
              if (this.timerProcess > 6) {
                this.timerProcess = 0;
                clearInterval(this.timer);
                this.timer = null;
                this.click("N/A"); // 超时未选中
              }
            }, 40);
          }
        } else {
          // this.status = "done";
          this.refresh = false;
          this.done = true;
          mdui.alert("恭喜您完成一组练习。", "完成");
        }
      }
    },
    click: function (option) {
      clearInterval(this.timer);
      this.timer = null;
      let nameList = this.test.question.split("_");
      this.clicked = true;
      this.selected = option;
      if (option == this.test.question) {
        this.rightCount++;
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["right"]++;
      } else {
        this.wrongCount++;
        this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
          nameList[2]
        ]["wrong"]++;
      }
      localStorage.setItem(
        "studyRecord",
        JSON.stringify(this.globalVariable.studyRecord)
      );
      setTimeout(() => {
        //设置延迟执行
        this.clicked = false;
        this.refresh = false;
        this.timerProcess = 0;
        // this.status = "";
        this.$nextTick(() => {
          this.nextQuestion();
        });
      }, 2000);
    },
  },
  setup: () => {
    let test = ref({
      question: "",
      options: [],
      questionsQuery: [],
      totalQuestions: [],
    });
    return { test };
  },
};
</script>
