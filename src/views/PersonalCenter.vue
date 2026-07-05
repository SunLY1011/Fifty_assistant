<template>
  <router-view />
</template>

<script>
import mdui from "mdui";

export default {
  data() {
    return {
      romanization: "hepburn-romanization",
    };
  },
  inject: ["globalVariable"],
  mounted() {
    this.$emit("updateAppbarTitle", "个人中心");
    mdui.mutation();
  },
};
</script>
