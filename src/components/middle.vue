<template>
  <div>
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header @func="getData"></Header>
        <middleMain :msg="passName"></middleMain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import middleMain from "./middleMain";


export default {
  name: "middle",
  data() {
    return {
      passName: "",
    };
  },
  components: {
    Aside,
    Header,
    middleMain,
  },

  mounted() {},

  methods: {
    getData(data) {
      this.passName = data;
    },
  },
};
</script>

<style scoped>
.el-container {
}
</style>
