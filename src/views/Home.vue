<template>
  <div class="mdui-container mdui-typo">
    <div class="mdui-row">
      <div
        class="mdui-col-md-11 mdui-col-offset-md-1 mdui-col-sm-12 mdui-m-t-3"
      >
        <div class="mdui-typo-display-1">学习</div>
      </div>
    </div>
    <div class="mdui-row">
      <div class="mdui-col-md-4 mdui-col-offset-md-1 mdui-col-xs-6 mdui-m-y-2">
        <div
          class="mdui-card mdui-hoverable mdui-ripple"
          v-on:click="this.$router.push('/table')"
        >
          <div class="mdui-card-media">
            <img
              loading="lazy"
              src="~@/assets/img/manuel-cosentino-n--CMLApjfI-unsplash.jpg"
            />
            <div
              class="mdui-card-media-covered mdui-card-media-covered-gradient"
            >
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">五十音图</div>
                <div class="mdui-card-primary-subtitle">五十音図</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mdui-row">
      <div
        class="mdui-col-md-11 mdui-col-offset-md-1 mdui-col-sm-12 mdui-m-t-3"
      >
        <div class="mdui-typo-display-1" id="practice">练习</div>
      </div>
    </div>
    <div class="mdui-row">
      <div class="mdui-col-md-4 mdui-col-offset-md-1 mdui-col-xs-6 mdui-m-y-2">
        <div
          class="mdui-card mdui-hoverable mdui-ripple"
          v-on:click="this.$router.push('/practise/normal')"
        >
          <div class="mdui-card-media">
            <img
              loading="lazy"
              src="~@/assets/img/mark-x-_eXhjCNyha8-unsplash.jpg"
            />
            <div
              class="mdui-card-media-covered mdui-card-media-covered-gradient"
            >
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">普通模式</div>
                <div class="mdui-card-primary-subtitle">レギュラーモード</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdui-col-md-4 mdui-col-offset-md-1 mdui-col-xs-6 mdui-m-y-2">
        <div
          class="mdui-card mdui-hoverable mdui-ripple"
          v-on:click="this.$router.push('/practise/fast')"
        >
          <div class="mdui-card-media">
            <img
              loading="lazy"
              src="~@/assets/img/joan-tran-MzfsoOm9GVQ-unsplash.jpg"
            />
            <div
              class="mdui-card-media-covered mdui-card-media-covered-gradient"
            >
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">快速模式</div>
                <div class="mdui-card-primary-subtitle">クイックモード</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdui-col-md-4 mdui-col-offset-md-1 mdui-col-xs-6 mdui-m-y-2">
        <div
          class="mdui-card mdui-hoverable mdui-ripple"
          v-on:click="this.$router.push('/practise/zen')"
        >
          <div class="mdui-card-media">
            <img
              loading="lazy"
              src="~@/assets/img/kari-shea-B8JFJWzAC9s-unsplash.jpg"
            />
            <div
              class="mdui-card-media-covered mdui-card-media-covered-gradient"
            >
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">禅模式</div>
                <div class="mdui-card-primary-subtitle">禅モード</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mdui-col-md-4 mdui-col-offset-md-1 mdui-col-xs-6 mdui-m-y-2">
        <div
          class="mdui-card mdui-hoverable mdui-ripple"
          v-on:click="this.$router.push('/practise/review')"
        >
          <div class="mdui-card-media">
            <img
              loading="lazy"
              src="~@/assets/img/danis-lou-jfZfdQtcH6k-unsplash.jpg"
            />
            <div
              class="mdui-card-media-covered mdui-card-media-covered-gradient"
            >
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">复习模式</div>
                <div class="mdui-card-primary-subtitle">復習モード</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mdui-row">
      <div
        class="mdui-col-md-11 mdui-col-offset-md-1 mdui-col-sm-12 mdui-m-t-3"
      >
        <div class="mdui-typo-display-1">个人</div>
      </div>
    </div>
    <div class="mdui-row">
      <div class="mdui-col-md-4 mdui-col-offset-md-1 mdui-col-xs-6 mdui-m-y-2">
        <div
          class="mdui-card mdui-hoverable mdui-ripple"
          v-on:click="this.$router.push('/personalCenter')"
        >
          <div class="mdui-card-media">
            <img
              loading="lazy"
              src="~@/assets/img/sorasak-_UIN-pFfJ7c-unsplash.jpg"
            />
            <div
              class="mdui-card-media-covered mdui-card-media-covered-gradient"
            >
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">个人中心</div>
                <div class="mdui-card-primary-subtitle">センター</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mdui-card-media img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  created() {
    this.$emit("updateAppbarTitle", "主页");
  },
};
</script>
