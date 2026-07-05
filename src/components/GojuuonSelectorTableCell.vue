<template>
  <span
    class="mdui-typo-body-1-opacity"
    v-if="
      globalVariable.gojuuon[on]['hiragana'][line][index].slice(0, 1) != '('
    "
  >
    {{ globalVariable.gojuuon[on]["hiragana"][line][index] }}
  </span>
  <span
    class="mdui-typo-body-1-opacity"
    v-if="
      globalVariable.gojuuon[on]['katakana'][line][index].slice(0, 1) != '('
    "
  >
    {{ globalVariable.gojuuon[on]["katakana"][line][index] }}
  </span>
  <br />
  <span
    class="mdui-typo-body-1-opacity"
    v-if="
      globalVariable.gojuuon[on][romanization][line][index].slice(0, 1) != '('
    "
  >
    {{ globalVariable.gojuuon[on][romanization][line][index] }}
  </span>
</template>

<script>
export default {
  name: "GojuuonSelectorTableCell",
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
<style scoped></style>
