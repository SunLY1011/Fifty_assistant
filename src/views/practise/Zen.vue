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
          <button
            class="mdui-btn mdui-btn-icon mdui-ripple"
            mdui-dialog="{target: '#settingDialog'}"
            mdui-tooltip="{content: '设定'}"
          >
            <i class="mdui-icon material-icons">settings</i>
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
              fontStyle="font-family: 'Noto Serif SC'; font-weight: 200"
            ></PractiseQuestionCard>
            <hr />
            <div class="mdui-row">
              <template v-for="(option, index) in test.options" :key="index">
                <PractiseOptionCard
                  v-bind:optionOn="option"
                  fontStyle="font-family: 'Noto Serif SC'; font-weight: 200"
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
                >self_improvement
              </i>
              <div class="mdui-typo-body-1-opacity mdui-m-y-1">再接再厉。</div>
              <div class="mdui-typo-body-2-opacity mdui-m-y-1">
                <!--正确：{{ rightCount }} 错误：{{ wrongCount }}-->
                {{ zenSentence }}
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

  <div class="mdui-dialog" id="settingDialog">
    <div class="mdui-dialog-title">设置</div>
    <div class="mdui-dialog-content" style="overflow: visible">
      <div class="mdui-container mdui-typo">
        <div class="row">
          <div class="mdui-col-xs-12 mdui-m-y-1">
            <div class="mdui-typo-subheading-opacity">背景音</div>
          </div>
          <div class="mdui-col-xs-12 mdui-m-b-2">
            <select
              v-model="globalVariable.setting.zenBg"
              id="bg"
              class="mdui-select"
              mdui-select
            >
              <option value="../audio/鹿威.m4a" selected>鹿威</option>
              <option value="../audio/水车.m4a">水车</option>
              <option value="none">无</option>
            </select>
          </div>
          <div class="mdui-col-xs-12 mdui-m-y-1">
            <div class="mdui-typo-subheading-opacity">背景音音量</div>
          </div>
          <div class="mdui-col-xs-12 mdui-m-b-1">
            <label class="mdui-slider">
              <input
                v-model="globalVariable.setting.bgVolume"
                type="range"
                step="0.01"
                min="0"
                max="1.0"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="setPlayer"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>

  <div class="mdui-dialog" id="helpDialog">
    <div class="mdui-dialog-title">什么是禅模式？</div>
    <div class="mdui-dialog-content">
      <div class="mdui-container mdui-typo">
        <div class="row">
          <div class="mdui-col-xs-12 mdui-m-y-1">
            <p class="mdui-typo-body-2-opacity" style="text-indent: 2em">
              禅模式灵感来源于日本禅宗。在禅模式中，我们<strong>不希望您有太大的压力，希望您抛弃对于成败得失的执念，专心于屏幕上的五十音</strong>。
            </p>
            <p class="mdui-typo-body-2-opacity" style="text-indent: 2em">
              在禅模式中，学习流程与普通练习相同，但<strong>答题过程没有时间限制，同时该模式下的作答结果不会在后台进行记录</strong>。此外，我们也为您提供数种空灵的背景音乐，您可以自行选用是否开启。
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
      // rightCount: 0,
      // wrongCount: 0,
      // timer: null,
      // timerProcess: 0,
      zenSentence: "",
    };
  },
  mounted() {
    mdui.mutation();
    this.$emit("updateAppbarTitle", "禅模式");
    this.setPlayer();
  },
  inject: ["globalVariable"],
  components: {
    GojuuonSelectorDialog,
    PractiseOptionCard,
    PractiseQuestionCard,
  },
  methods: {
    setPlayer: function () {
      if (this.bg != "none") {
        this.$refs.audio.src = this.globalVariable.setting.zenBg;
        this.$refs.audio.volume = this.globalVariable.setting.bgVolume;
        this.$refs.audio.load();
        this.$refs.audio.play();
        localStorage.setItem(
          "setting",
          JSON.stringify(this.globalVariable.setting)
        );
      } else {
        this.$refs.audio.pause();
      }
    },
    oneZenSentence: function () {
      let sentences = [
        "菩提本无树，明镜亦非台，本来无一物，何处惹尘埃。——六祖惠能",
        "一切有为法，如梦幻泡影，如露亦如电，应作如是观。——《金刚经》",
        "人身难得，六情难具，口辩难中，才聪难致，寿命难获，明人难遭，直言难有，大心难发，经法难闻，如来难值。——《五苦章句经》",
        "人身难得，如优昙花。得人身者，如爪上土；失人身者，如大地土。——《涅盘经》",
        "色不异空，空不异色；色即是空，空即是色。——《般若波罗蜜多心经》",
        "是日已过，命亦随减，如少水鱼，斯有何乐，大众当勤精进，如救头燃，但念无常，慎勿放逸。——普贤菩萨警众偈",
        "一切众生，皆具如来智慧德相，但因妄想执着，不能证得。——《华严经》",
        "菩萨有一法。能断一切诸恶道苦。何等为一。谓于昼夜常念思惟。观察善法。令诸善法。念念增长。不容毫分。不善间杂。是即能令诸恶永断。善法圆满。——《十善业道经》",
        "善护口业，不讥他过；善护身业，不犯律仪；善护意业， 清净无染。 ——《无量寿经》",
        "诸恶莫作，诸善奉行；自净其意，是诸佛教。——七佛通戒偈",
        "能行说之可，不能勿空语。虚伪无诚信，智者所屏弃。——《法句经》",
        "若人无实语，小人中小人。实是法之阶，明中第一明。实是解脱道，财中第一财，救中第一救。《正法念处经》",
        "所言诚实，如说修行。——《华严经》",
        "不好责彼，务自省身。——《法句经》",
        "不自尊举，不自赞叹。——《华严经》",
        "不现异相，彰已有德。——《华严经》",
        "所言诚实，如说修行。——《华严经》",
        "心不离世间，亦不住世间，非于世间外，修行一切智。——《华严经》",
        "佛法在世间，不离世间觉；离世觅菩提，犹如求兔角。——《六祖坛经·般若品》",
        "一切诸佛身，皆有无尽相，出现虽无量，色相终不尽。——《华严经》",
        "言行忠信，表里相应。——《佛说无量寿经》",
      ];
      return sentences[Math.floor(Math.random() * sentences.length)];
    },
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
      // this.rightCount = 0;
      // this.wrongCount = 0;
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
      if (this.test.totalQuestions.length == 0) {
        mdui.alert("你还没有选择学习内容。请先选择后再进行学习。", "空之境界");
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
          // if (this.timer == null) {
          //   this.timer = setInterval(() => {
          //     this.timerProcess += 0.04;
          //     if (this.timerProcess > 6) {
          //       this.timerProcess = 0;
          //       clearInterval(this.timer);
          //       this.timer = null;
          //       this.click("N/A"); // 超时未选中
          //     }
          //   }, 40);
          // }
        } else {
          // this.status = "done";
          this.refresh = false;
          this.done = true;
          this.zenSentence = this.oneZenSentence();
          mdui.alert("您完成了一组练习。", "完成");
        }
      }
    },
    click: function (option) {
      clearInterval(this.timer);
      this.timer = null;
      // let nameList = this.test.question.split("_");
      this.clicked = true;
      this.selected = option;
      // if (option == this.test.question) {
      //   this.rightCount++;
      //   this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
      //     nameList[2]
      //   ]["right"]++;
      // } else {
      //   this.wrongCount++;
      //   this.globalVariable["studyRecord"][nameList[0]][nameList[1]][
      //     nameList[2]
      //   ]["wrong"]++;
      // }
      // localStorage.setItem(
      //   "studyRecord",
      //   JSON.stringify(this.globalVariable.studyRecord)
      // );
      setTimeout(() => {
        //设置延迟执行
        this.clicked = false;
        this.refresh = false;
        // this.timerProcess = 0;
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
