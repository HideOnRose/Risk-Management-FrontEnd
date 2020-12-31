<template>
  <div>
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header @func="getData"></Header>
        <afterMain :msg="passName"></afterMain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import afterMain from "./afterMain";


export default {
  name: "after",
  data() {
    return {
      passName: "",
    };
  },
  components: {
    Aside,
    Header,
    afterMain,
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
