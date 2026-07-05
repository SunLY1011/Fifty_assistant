<template>
  <div class="mdui-dialog" id="gojuuonSelectorDialog">
    <div class="mdui-dialog-title">选择练习内容</div>
    <div class="mdui-dialog-content">
      <div class="mdui-container-fluid mdui-typo">
        <div class="row">
          <div class="mdui-col-xs-12 mdui-m-y-1">
            <div class="mdui-container mdui-typo">
              <div class="mdui-row">
                <div class="mdui-col-xs-12">
                  <div class="mdui-typo-headline-opacity mdui-m-t-1">
                    练习方向
                  </div>
                </div>
                <GojuuonSelectorFromToSelector />
                <div class="mdui-col-xs-12">
                  <div class="mdui-typo-headline-opacity mdui-m-t-2">清音</div>
                </div>
                <!-- Seion -->
                <div class="mdui-col-xs-12">
                  <div class="mdui-table-fluid">
                    <table class="mdui-table">
                      <thead>
                        <tr>
                          <th>
                            <label class="mdui-checkbox">
                              <input
                                type="checkbox"
                                v-bind:name="'s'"
                                v-bind:id="'s'"
                                v-on:click="selectTable('s')"
                              />
                              <i class="mdui-checkbox-icon"></i>
                            </label>
                          </th>
                          <th class="mdui-text-center">あ段</th>
                          <th class="mdui-text-center">い段</th>
                          <th class="mdui-text-center">う段</th>
                          <th class="mdui-text-center">え段</th>
                          <th class="mdui-text-center">お段</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="line in globalVariable.gojuuon['seion'][
                            'lines'
                          ]"
                          :key="line"
                        >
                          <td>
                            <!--<div class="mdui-text-center" v-if="line != '-'">
                              {{
                                globalVariable.gojuuon["seion"]["hiragana"][
                                  line
                                ][0]
                              }}行<br />{{ line }}
                            </div>-->
                            <label class="mdui-checkbox">
                              <input
                                type="checkbox"
                                v-bind:name="'s' + '_' + line"
                                v-bind:id="'s' + '_' + line"
                                v-on:click="selectLine('s' + '_' + line)"
                              />
                              <i class="mdui-checkbox-icon"></i>
                            </label>
                          </td>
                          <template
                            v-for="(value, index) in globalVariable.gojuuon[
                              'seion'
                            ]['hiragana'][line]"
                            :key="index"
                          >
                            <td
                              class="mdui-text-center mdui-typo mdui-ripple"
                              v-if="
                                globalVariable.gojuuon['seion']['hiragana'][
                                  line
                                ].length == 1
                              "
                              v-bind:name="'s' + '_' + line + '_' + index"
                              v-bind:id="'s' + '_' + line + '_' + index"
                              v-on:click="
                                selectItem(
                                  's' + '_' + line + '_' + index,
                                  'self'
                                )
                              "
                              colspan="5"
                            >
                              <!-- ん -->
                              <GojuuonSelectorTableCell
                                on="seion"
                                v-bind:index="index"
                                v-bind:line="line"
                                v-bind:romanization="
                                  this.globalVariable.setting.romanization
                                "
                              ></GojuuonSelectorTableCell>
                            </td>
                            <td
                              v-else
                              class="mdui-text-center mdui-typo mdui-ripple"
                              v-bind:name="'s' + '_' + line + '_' + index"
                              v-bind:id="'s' + '_' + line + '_' + index"
                              v-on:click="
                                selectItem(
                                  's' + '_' + line + '_' + index,
                                  'self'
                                )
                              "
                            >
                              <GojuuonSelectorTableCell
                                on="seion"
                                v-bind:index="index"
                                v-bind:line="line"
                                v-bind:romanization="
                                  this.globalVariable.setting.romanization
                                "
                              ></GojuuonSelectorTableCell>
                            </td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mdui-col-xs-12">
                  <div class="mdui-typo-headline-opacity mdui-m-t-2">浊音</div>
                </div>
                <!-- Dakuon -->
                <div class="mdui-col-xs-12">
                  <div class="mdui-table-fluid">
                    <table class="mdui-table">
                      <thead>
                        <tr>
                          <th>
                            <label class="mdui-checkbox">
                              <input
                                type="checkbox"
                                v-bind:name="'d'"
                                v-bind:id="'d'"
                                v-on:click="selectTable('d')"
                              />
                              <i class="mdui-checkbox-icon"></i>
                            </label>
                          </th>
                          <th class="mdui-text-center">あ段</th>
                          <th class="mdui-text-center">い段</th>
                          <th class="mdui-text-center">う段</th>
                          <th class="mdui-text-center">え段</th>
                          <th class="mdui-text-center">お段</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="line in globalVariable.gojuuon['dakuon'][
                            'lines'
                          ]"
                          :key="line"
                        >
                          <td>
                            <!--<div class="mdui-text-center" v-if="line != '-'">
                              {{
                                globalVariable.gojuuon["dakuon"]["hiragana"][
                                  line
                                ][0]
                              }}行<br />{{ line }}
                            </div>-->
                            <label class="mdui-checkbox">
                              <input
                                type="checkbox"
                                v-bind:name="'d' + '_' + line"
                                v-bind:id="'d' + '_' + line"
                                v-on:click="selectLine('d' + '_' + line)"
                              />
                              <i class="mdui-checkbox-icon"></i>
                            </label>
                          </td>
                          <template
                            v-for="(value, index) in globalVariable.gojuuon[
                              'dakuon'
                            ]['hiragana'][line]"
                            :key="index"
                          >
                            <td
                              class="mdui-text-center mdui-typo mdui-ripple"
                              v-bind:name="'d' + '_' + line + '_' + index"
                              v-bind:id="'d' + '_' + line + '_' + index"
                              v-on:click="
                                selectItem(
                                  'd' + '_' + line + '_' + index,
                                  'self'
                                )
                              "
                            >
                              <GojuuonSelectorTableCell
                                on="dakuon"
                                v-bind:index="index"
                                v-bind:line="line"
                                v-bind:romanization="
                                  this.globalVariable.setting.romanization
                                "
                              ></GojuuonSelectorTableCell>
                            </td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mdui-col-xs-12">
                  <div class="mdui-typo-headline-opacity mdui-m-t-2">拗音</div>
                </div>
                <!-- Youon -->
                <div class="mdui-col-xs-12">
                  <div class="mdui-table-fluid">
                    <table class="mdui-table">
                      <thead>
                        <tr>
                          <th>
                            <label class="mdui-checkbox">
                              <input
                                type="checkbox"
                                v-bind:name="'y'"
                                v-bind:id="'y'"
                                v-on:click="selectTable('y')"
                              />
                              <i class="mdui-checkbox-icon"></i>
                            </label>
                          </th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="line in globalVariable.gojuuon['youon'][
                            'lines'
                          ]"
                          :key="line"
                        >
                          <td>
                            <!--<div class="mdui-text-center" v-if="line != '-'">
                              {{
                                typeof globalVariable.gojuuon["seion"][
                                  "hiragana"
                                ][line] == "undefined"
                                  ? globalVariable.gojuuon["dakuon"][
                                      "hiragana"
                                    ][line][0]
                                  : globalVariable.gojuuon["seion"]["hiragana"][
                                      line
                                    ][0]
                              }}行<br />{{ line }}
                            </div>-->
                            <label class="mdui-checkbox">
                              <input
                                type="checkbox"
                                v-bind:name="'y' + '_' + line"
                                v-bind:id="'y' + '_' + line"
                                v-on:click="selectLine('y' + '_' + line)"
                              />
                              <i class="mdui-checkbox-icon"></i>
                            </label>
                          </td>
                          <template
                            v-for="(value, index) in globalVariable.gojuuon[
                              'youon'
                            ]['hiragana'][line]"
                            :key="index"
                          >
                            <td
                              class="mdui-text-center mdui-typo mdui-ripple"
                              v-bind:name="'y' + '_' + line + '_' + index"
                              v-bind:id="'y' + '_' + line + '_' + index"
                              v-on:click="
                                selectItem(
                                  'y' + '_' + line + '_' + index,
                                  'self'
                                )
                              "
                            >
                              <GojuuonSelectorTableCell
                                on="youon"
                                v-bind:index="index"
                                v-bind:line="line"
                                v-bind:romanization="
                                  this.globalVariable.setting.romanization
                                "
                              ></GojuuonSelectorTableCell>
                            </td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mdui-col-xs-12 mdui-m-t-2 mdui-text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
      <button
        class="mdui-btn mdui-ripple"
        @click="saveSelection()"
        mdui-dialog-confirm
      >
        确认
      </button>
    </div>
  </div>
</template>

<script>
import GojuuonSelectorTableCell from "@/components/GojuuonSelectorTableCell.vue";
import GojuuonSelectorFromToSelector from "@/components/GojuuonSelectorFromToSelector.vue";
import mdui from "mdui";

export default {
  components: {
    GojuuonSelectorTableCell,
    GojuuonSelectorFromToSelector,
  },
  methods: {
    selectTable: function (elementName) {
      let on;
      if (elementName == "s") {
        on = "seion";
      } else if (elementName == "d") {
        on = "dakuon";
      } else if (elementName == "y") {
        on = "youon";
      }
      if (document.getElementById(elementName).checked == true) {
        for (let line in this.globalVariable.gojuuon[on]["lines"]) {
          document.getElementById(
            elementName + "_" + this.globalVariable.gojuuon[on]["lines"][line]
          ).checked = true;
          this.selectLine(
            elementName + "_" + this.globalVariable.gojuuon[on]["lines"][line]
          ); // 传递行id
        }
      } else {
        for (let line in this.globalVariable.gojuuon[on]["lines"]) {
          document.getElementById(
            elementName + "_" + this.globalVariable.gojuuon[on]["lines"][line]
          ).checked = false;
          this.selectLine(
            elementName + "_" + this.globalVariable.gojuuon[on]["lines"][line]
          ); // 传递行id
        }
      }
    },
    selectLine: function (elementName) {
      let elements = document
        .getElementById(elementName)
        .parentElement.parentElement.parentElement.querySelectorAll(
          "td[name^='" + elementName + "_']"
        );
      for (let element in elements) {
        let elementName = elements[element].id;
        this.selectItem(elementName, "line"); // 传递行id
      }
    },
    selectItem: function (elementName, from) {
      let saveFlag; // 标识应该删除(add)还是存入(save)“已选择的五十音selectedOn”
      var nameList;
      if (elementName != undefined) {
        nameList = elementName.split("_");
      }
      if (
        nameList == undefined ||
        (nameList[0] == "s" &&
          this.globalVariable.gojuuon["seion"]["katakana"][nameList[1]][
            nameList[2]
          ].slice(0, 1) == "(")
      ) {
        // blank, nothing will be done here
      } else {
        let element = document.getElementById(elementName);
        let lineCheckBox = document.getElementById(
          nameList[0] + "_" + nameList[1]
        );
        if (from == "self") {
          // 自我点选
          if (element.classList.contains("mdui-text-color-theme-accent")) {
            element.classList.remove("mdui-text-color-theme-accent");
            saveFlag = "del";
          } else {
            element.classList.add("mdui-text-color-theme-accent");
            saveFlag = "add";
          }
        } else {
          // from == "line", checkBox 按行选中或表格整体选中
          if (lineCheckBox.checked) {
            // line checked
            if (!element.classList.contains("mdui-text-color-theme-accent")) {
              element.classList.add("mdui-text-color-theme-accent");
              saveFlag = "add";
            }
          } else {
            // line unchecked
            if (element.classList.contains("mdui-text-color-theme-accent")) {
              element.classList.remove("mdui-text-color-theme-accent");
              saveFlag = "del";
            }
          }
        }
        // 加入选择列表
        if (saveFlag == "add") {
          // console.log(nameList[0] + "_" + nameList[1] + "_" + nameList[2]);
          this.globalVariable.selectedOn[nameList[0]][nameList[1]][
            nameList[2]
          ] = true;
        } else if (saveFlag == "del") {
          // 删除
          this.globalVariable.selectedOn[nameList[0]][nameList[1]][
            nameList[2]
          ] = false;
        }
        // 完成操作后检查按行勾选框
        let lineLength = 0,
          trueLength = 0,
          falseLength = 0,
          tableCheckedLineLength = 0;
        for (let on in this.globalVariable.selectedOn[nameList[0]][
          nameList[1]
        ]) {
          lineLength++;
          if (this.globalVariable.selectedOn[nameList[0]][nameList[1]][on]) {
            trueLength++;
          } else {
            falseLength++;
          }
        }
        // console.log(lineLength, trueLength, falseLength);
        if (trueLength == lineLength) {
          lineCheckBox.indeterminate = false;
          lineCheckBox.checked = true;
        } else if (falseLength == lineLength) {
          lineCheckBox.indeterminate = false;
          lineCheckBox.checked = false;
        } else if (trueLength != 0 && falseLength != 0) {
          lineCheckBox.indeterminate = true;
        }
        for (let line in this.globalVariable.selectedOn[nameList[0]]["lines"]) {
          if (
            document.getElementById(
              nameList[0] +
                "_" +
                this.globalVariable.selectedOn[nameList[0]]["lines"][line]
            ).checked
          ) {
            tableCheckedLineLength++;
          }
        }
        // 检查表格勾选框
        if (
          tableCheckedLineLength ==
          this.globalVariable.selectedOn[nameList[0]].lines.length
        ) {
          document.getElementById(nameList[0]).indeterminate = false;
          document.getElementById(nameList[0]).checked = true;
        } else if (tableCheckedLineLength == 0) {
          document.getElementById(nameList[0]).indeterminate = false;
          document.getElementById(nameList[0]).checked = false;
        } else {
          document.getElementById(nameList[0]).indeterminate = true;
        }
        mdui.updateTables(
          document.getElementById(nameList[0]).parentElement.parentElement
            .parentElement.parentElement.parentElement
        );
      }
    },
    saveSelection() {
      localStorage.setItem(
        "selectedOn",
        JSON.stringify(this.globalVariable.selectedOn)
      );
    },
    setSelected() {
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
                // console.log(
                //   on + "_" + line + "_" + colIndex,
                //   this.globalVariable.selectedOn[on][line][colIndex]
                // );
                this.selectItem(on + "_" + line + "_" + colIndex, "self");
              }
            }
          }
        }
      }
    },
  },
  mounted() {
    this.setSelected();
  },
  name: "GojuuonSelectorDialog",
  props: {},
  inject: ["globalVariable"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
