<template>
  <div>
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header @func="getData"></Header>
        <Main4 :msg="passName"></Main4>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import Main4 from "./Main4";

export default {
  name: "four",
  data() {
    return {
      passName: "",
    };
  },
  components: {
    Aside,
    Header,
    Main4,
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
