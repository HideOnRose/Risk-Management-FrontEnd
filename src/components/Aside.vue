<template>
  <el-aside width="180px" style="margin-left: -7px">
    <div style="height: 50px; background-color: #26c4fe">
      <br />

      <img
        src="../assets/img/metis-horizon3.png"
        height="130"
        width="130"
        style="margin-top: -55px; margin-left: 15px"
      />
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      router
      mode="vertical"
      background-color="#495164"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <!-- background-color="#f2f2f2"
         -->
      <el-menu-item index="/one">
        <i class="el-icon-success"></i>非欺诈申请队列</el-menu-item
      >
      <el-menu-item index="/two">
        <template slot="title">
          <i class="el-icon-error"></i>欺诈申请队列</template
        >
      </el-menu-item>
      <el-menu-item index="/three">
        <i class="el-icon-edit-outline"></i>贷款额度审核</el-menu-item
      >
      <el-menu-item index="/four">
        <i class="el-icon-document-checked"></i>已通过申请用户</el-menu-item
      >
      <el-menu-item index="/middle">
        <i class="el-icon-document-remove"></i>贷中</el-menu-item
      >
      <el-menu-item index="/after">
        <i class="el-icon-document"></i>贷后</el-menu-item
      >
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      activeIndex: "/one",
    };
  },
  components: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.el-aside {
  font-size: 12px;

}

.el-menu-item {
  font-size: 12px;
}

.el-menu {
  height: 600px;
}

* {
  margin: 0;
  padding: 0;
}
</style>
