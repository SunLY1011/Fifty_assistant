<template>
  <div class="mdui-container mdui-typo">
    <div class="mdui-row">
      <div class="mdui-col-xs-12">
        <div class="mdui-typo-display-1 mdui-m-t-3">五十音图</div>
      </div>
      <div class="mdui-col-xs-12">
        <div class="mdui-typo-headline-opacity mdui-m-t-3">清音</div>
      </div>
      <!-- Seion -->
      <div class="mdui-col-xs-12">
        <div class="mdui-table-fluid">
          <table class="mdui-table">
            <thead>
              <tr>
                <th></th>
                <th class="mdui-text-center">あ段</th>
                <th class="mdui-text-center">い段</th>
                <th class="mdui-text-center">う段</th>
                <th class="mdui-text-center">え段</th>
                <th class="mdui-text-center">お段</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="line in globalVariable.gojuuon['seion']['lines']"
                :key="line"
              >
                <td>
                  <div class="mdui-text-center" v-if="line != '-'">
                    {{
                      globalVariable.gojuuon["seion"]["hiragana"][line][0]
                    }}行<br />{{ line }}
                  </div>
                </td>
                <template
                  v-for="(value, index) in globalVariable.gojuuon['seion'][
                    'hiragana'
                  ][line]"
                  :key="index"
                >
                  <td
                    class="mdui-text-center mdui-typo mdui-ripple"
                    v-if="
                      globalVariable.gojuuon['seion']['hiragana'][line]
                        .length == 1
                    "
                    v-bind:name="'s' + '_' + line + '_' + index"
                    v-bind:id="'s' + '_' + line + '_' + index"
                    v-on:click="changeColor('s' + '_' + line + '_' + index)"
                    colspan="5"
                  >
                    <!-- ん -->
                    <TableGojuuonCell
                      on="seion"
                      v-bind:index="index"
                      v-bind:line="line"
                      v-bind:romanization="
                        this.globalVariable.setting.romanization
                      "
                    ></TableGojuuonCell>
                  </td>
                  <td
                    v-else
                    class="mdui-text-center mdui-typo mdui-ripple"
                    v-bind:name="'s' + '_' + line + '_' + index"
                    v-bind:id="'s' + '_' + line + '_' + index"
                    v-on:click="changeColor('s' + '_' + line + '_' + index)"
                  >
                    <TableGojuuonCell
                      on="seion"
                      v-bind:index="index"
                      v-bind:line="line"
                      v-bind:romanization="
                        this.globalVariable.setting.romanization
                      "
                    ></TableGojuuonCell>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mdui-col-xs-12">
        <div class="mdui-typo-headline-opacity mdui-m-t-3">浊音</div>
      </div>
      <!-- Dakuon -->
      <div class="mdui-col-xs-12">
        <div class="mdui-table-fluid">
          <table class="mdui-table">
            <thead>
              <tr>
                <th></th>
                <th class="mdui-text-center">あ段</th>
                <th class="mdui-text-center">い段</th>
                <th class="mdui-text-center">う段</th>
                <th class="mdui-text-center">え段</th>
                <th class="mdui-text-center">お段</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="line in globalVariable.gojuuon['dakuon']['lines']"
                :key="line"
              >
                <td>
                  <div class="mdui-text-center" v-if="line != '-'">
                    {{
                      globalVariable.gojuuon["dakuon"]["hiragana"][line][0]
                    }}行<br />{{ line }}
                  </div>
                </td>
                <template
                  v-for="(value, index) in globalVariable.gojuuon['dakuon'][
                    'hiragana'
                  ][line]"
                  :key="index"
                >
                  <td
                    class="mdui-text-center mdui-typo mdui-ripple"
                    v-bind:name="'d' + '_' + line + '_' + index"
                    v-bind:id="'d' + '_' + line + '_' + index"
                    v-on:click="changeColor('d' + '_' + line + '_' + index)"
                  >
                    <TableGojuuonCell
                      on="dakuon"
                      v-bind:index="index"
                      v-bind:line="line"
                      v-bind:romanization="globalVariable.setting.romanization"
                    ></TableGojuuonCell>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mdui-col-xs-12">
        <div class="mdui-typo-headline-opacity mdui-m-t-3">拗音</div>
      </div>
      <!-- Youon -->
      <div class="mdui-col-xs-12">
        <div class="mdui-table-fluid">
          <table class="mdui-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="line in globalVariable.gojuuon['youon']['lines']"
                :key="line"
              >
                <td>
                  <div class="mdui-text-center" v-if="line != '-'">
                    {{
                      typeof globalVariable.gojuuon["seion"]["hiragana"][
                        line
                      ] == "undefined"
                        ? globalVariable.gojuuon["dakuon"]["hiragana"][line][0]
                        : globalVariable.gojuuon["seion"]["hiragana"][line][0]
                    }}行<br />{{ line }}
                  </div>
                </td>
                <template
                  v-for="(value, index) in globalVariable.gojuuon['youon'][
                    'hiragana'
                  ][line]"
                  :key="index"
                >
                  <td
                    class="mdui-text-center mdui-typo mdui-ripple"
                    v-bind:name="'y' + '_' + line + '_' + index"
                    v-bind:id="'y' + '_' + line + '_' + index"
                    v-on:click="changeColor('y' + '_' + line + '_' + index)"
                  >
                    <TableGojuuonCell
                      on="youon"
                      v-bind:index="index"
                      v-bind:line="line"
                      v-bind:romanization="
                        this.globalVariable.setting.romanization
                      "
                    ></TableGojuuonCell>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mdui-col-xs-12 mdui-m-y-3 mdui-text-center">
        <button
          class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple"
          mdui-dialog="{target: '#romanizationDialog'}"
        >
          <i class="mdui-icon material-icons">settings</i>
        </button>
      </div>
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
</template>

<style>
.mdui-table td,
.mdui-table th {
  padding: 12px 28px;
}
@media (max-width: 599.9px) {
  .mdui-table td,
  .mdui-table th {
    padding: 3px 6px;
  }
}
</style>

<script>
import TableGojuuonCell from "@/components/TableGojuuonCell.vue";

export default {
  name: "Table",
  components: {
    TableGojuuonCell,
  },
  inject: ["globalVariable"],
  mounted() {
    this.$emit("updateAppbarTitle", "五十音图");
    window.mdui.mutation();
  },
  methods: {
    saveSetting: function () {
      localStorage.setItem(
        "setting",
        JSON.stringify(this.globalVariable.setting)
      );
    },
    changeColor: function (elementName) {
      let nameList = elementName.split("_");
      if (
        nameList[0] === "s" &&
        this.globalVariable.gojuuon["seion"]["katakana"][nameList[1]][
          nameList[2]
        ].slice(0, 1) === "("
      ) {
        // nothing here
      } else {
        let element = document.getElementById(elementName);
        if (element.classList.contains("mdui-text-color-theme-accent")) {
          element.classList.remove("mdui-text-color-theme-accent");
        } else {
          element.classList.add("mdui-text-color-theme-accent");
        }
      }
    },
  },
};
</script>
