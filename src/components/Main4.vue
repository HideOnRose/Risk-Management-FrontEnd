<template>
  <el-main style="font-size: 12px;">
    <el-table
      :data="search(msg)"
      style="width: 100%;"
      max-height="100%"
      height="500"
    >

      <el-table-column prop="sid" label="姓名">
        <template slot-scope="scope"
        ><a @click.prevent="detail(scope.row.sid)" style="color: #599DD4;">{{
          scope.row.sid
          }}</a></template
        >
      </el-table-column>

      <el-table-column prop="gender" label="性别">
      </el-table-column>
      <el-table-column prop="LoanAmount" label="贷款额度"> </el-table-column>
      <el-table-column prop="LoanTerm" label="贷款期限">
      </el-table-column>

      <el-table-column label="状态">
          <label style="color: #C0C4CC;">已完成</label>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "Main4",
  data() {
    return {

      active: 0,
      tableData: [],
    };
  },
  props: ["msg"],
  components: {},
    created(){
      this.getData()
    },
  mounted() {},
  methods: {
      getData() {
          this.$http.get("http://127.0.0.1:8000/loan_approval/pass_list").then((res) => {
              if (res.code == 404) {
                  console.log("获取数据失败");
              } else {
                  this.tableData = res.data;

              }
          });
      },


    detail(name) {
      this.$router.push({
        path: "five",
        query: {
          sid: name,
        },
      });
    },

    search(msg) {
      var newList = [];
      newList = this.tableData.filter((item) => {
        if (item.sid.includes(msg)) {
          return true;
        }
      });
      console.log(newList);
      return newList;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.el-button {
  margin-left: 2px;
  font-size: 14px;
}
.el-table {
  font-size: 14px;
}
</style>
