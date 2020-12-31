<template>
  <div>
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header @func="getData"></Header>
        <Main :msg="passName"></Main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";
import one from "./one";
import two from "./two";
import three from "./three";
import four from "./four";

export default {
  name: "one",
  data() {
    return {
      passName: "",
    };
  },
  components: {
    Aside,
    Header,
    Main,
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
