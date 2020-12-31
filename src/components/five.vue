<template>
  <div>
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header></Header>
        <Detail :uid="sid"></Detail>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
import Detail from "./Detail";

export default {
  name: "five",
  data() {
    return {
      sid: this.$route.query.sid,
    };
  },
  components: {
    Aside,
    Header,
    Detail,
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
</style>
