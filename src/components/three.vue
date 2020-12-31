<template>
  <div>
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header @func="getData"></Header>
        <Main3 :msg="passName"></Main3>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import Main3 from "./Main3";

export default {
  name: "three",
  data() {
    return {
      passName: "",
    };
  },
  components: {
    Aside,
    Header,
    Main3,
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
  height: 100%;
}
</style>
