<template>
  <span
    class="mdui-typo-headline-opacity mdui-m-x-1"
    v-if="
      globalVariable.gojuuon[on]['hiragana'][line][index].slice(0, 1) != '('
    "
  >
    {{ globalVariable.gojuuon[on]["hiragana"][line][index] }}
  </span>
  <span
    class="mdui-typo-headline-opacity mdui-m-x-1"
    v-if="
      globalVariable.gojuuon[on]['katakana'][line][index].slice(0, 1) != '('
    "
  >
    {{ globalVariable.gojuuon[on]["katakana"][line][index] }}
  </span>
  <br />
  <span
    class="mdui-typo-subheading-opacity mdui-m-x-1"
    v-if="
      globalVariable.gojuuon[on][romanization][line][index].slice(0, 1) != '('
    "
  >
    {{ globalVariable.gojuuon[on][romanization][line][index] }}
  </span>
</template>

<script>
export default {
  name: "TableGojuuonCell",
  props: {
    on: String,
    line: String,
    index: Number,
    romanization: String,
    // globalVariable,
  },
  inject: ["globalVariable"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mdui-typo-headline-opacity {
  font-size: 24px;
}
.mdui-typo-subheading-opacity {
  font-size: 16px;
}
@media (max-width: 599.9px) {
  .mdui-typo-headline-opacity {
    font-size: 18px;
  }
  .mdui-typo-subheading-opacity {
    font-size: 12px;
  }
}
</style>
