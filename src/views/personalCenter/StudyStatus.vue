<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div
        class="mdui-col-xs-12 mdui-col-sm-8 mdui-col-offset-sm-2 mdui-col-lg-6 mdui-col-offset-lg-3"
      >
        <div class="mdui-card mdui-m-y-5" id="chartCard">
          <div class="mdui-card-content mdui-typo">
            <div class="mdui-row">
              <div class="mdui-col-xs-12">
                <div
                  class="mdui-typo-headline-opacity mdui-text-center mdui-m-y-3"
                >
                  学习情况
                </div>
              </div>
              <div class="mdui-col-xs-12">
                <v-chart class="chart" :option="option" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: calc((100vh - 56px - 56px) * 0.8);
}
</style>

<script>
import { use } from "echarts/core";
import {
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  CanvasRenderer,
]);

export default defineComponent({
  name: "HelloWorld",
  inject: ["globalVariable"],
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "auto",
  },
  data: function () {
    return {};
  },
  setup: () => {
    const rightColor = "#4caf50";
    const wrongColor = "#f44336";
    const hesitateColor = "#ffc107";

    const option = ref({
      title: {
        // text: "清音学习记录",
      },
      toolbox: {
        feature: {
          dataZoom: {
            xAxisIndex: false,
          },
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      color: [rightColor, wrongColor, hesitateColor],
      legend: {
        textStyle: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      grid: {
        left: "3%",
        right: "10%",
        bottom: "3%",
        containLabel: true,
      },
      dataZoom: [
        {
          type: "inside",
        },
        {
          yAxisIndex: 0,
          type: "slider",
          start: 0,
          end: 10,
        },
      ],
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        inverse: true,
        boundaryGap: true,
        axisLabel: { interval: 0, rotate: -30 },
        axisTick: { interval: 0, alignWithLabel: true },
      },
      dataset: {
        source: [["status", "正确", "错误", "犹豫"]],
      },
      series: [
        {
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
        {
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
        {
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
      ],
    });

    return { option };
  },
  created() {
    let dataSetSource = [["status", "正确", "错误", "犹豫"]];
    for (let on in this.globalVariable.studyRecord) {
      for (
        let lineIndex = 0;
        lineIndex <= this.globalVariable.studyRecord[on]["lines"].length;
        lineIndex++
      ) {
        let line = this.globalVariable.studyRecord[on]["lines"][lineIndex];
        if (line) {
          // 防止 undefined
          for (let colIndex in this.globalVariable.studyRecord[on][line]) {
            let onFullName, onHKR;
            if (on == "s") {
              onFullName = "seion";
            } else if (on == "d") {
              onFullName = "dakuon";
            } else if (on == "y") {
              onFullName = "youon";
            }

            onHKR =
              this.globalVariable["gojuuon"][onFullName]["hiragana"][line][
                colIndex
              ] +
              " " +
              this.globalVariable["gojuuon"][onFullName]["katakana"][line][
                colIndex
              ] +
              " " +
              this.globalVariable["gojuuon"][onFullName][
                this.globalVariable["setting"]["romanization"]
              ][line][colIndex];
            dataSetSource.push([
              onHKR,
              this.globalVariable.studyRecord[on][line][colIndex]["right"],
              this.globalVariable.studyRecord[on][line][colIndex]["wrong"],
              this.globalVariable.studyRecord[on][line][colIndex]["hesitate"],
            ]);
          }
        }
      }
    }
    // console.log(dataSetSource);
    this.option.dataset.source = dataSetSource;
  },
  mounted() {
    let cardColor = window.getComputedStyle(
      document.getElementById("chartCard"),
      null
    )["background-color"];
    if (cardColor == "rgb(255, 255, 255)") {
      this.option.darkMode = false;
      this.option.legend.textStyle.color = "rgba(0,0,0,.54)";
    }
  },
});
</script>
