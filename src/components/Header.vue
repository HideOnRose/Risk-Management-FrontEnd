<template>
  <el-header style="text-align: right; font-size: 12px; height: 50px; ">
    <label style="color: #409EFF;">查找： </label>
      <input
      type="text"
      v-model="searchContent"
      placeholder="请输入搜索内容"
      class="form-control"
    >
    </input>
      <!-- <i class="el-icon-search" style="position: relative; right: 50px;">
      </i> -->



    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">

      </el-dropdown-menu>
    </el-dropdown>
    <el-button
      @click.native.prevent="exit()"
      type="text"
      size="small"
      style="margin-right: 20px;"
    >
      退出
    </el-button>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchContent:""
    };
  },
  components: {},
  mounted() {},
  methods: {
    passInfo(){
      this.$emit('func', this.searchContent)
    },
    exit(){
      this.$router.push({ path: "/" });
    }
  },
  watch:{
    searchContent: function(){
      this.passInfo()
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.el-header {
  line-height: 60px;
  background-color: #495164;
  /* #f2f2f2; */
}

.el-button + .el-button {
  margin-left: 2px;
}

input {
  height: -5px;
  font-size: smaller;
  margin-right: 30px;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px;
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 2px 2px;
}
</style>
