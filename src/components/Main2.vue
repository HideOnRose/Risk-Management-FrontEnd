<template>
  <el-main style="font-size: 12px;">
    <el-table
      :data="search(msg)"
      style="width: 100%;"
      max-height="100%"
      height="500"
    >
      <el-table-column prop="sid" label="姓名">

      </el-table-column>

      <el-table-column prop="ip" label="IP"> </el-table-column>

      <el-table-column prop="city" label="城市"> </el-table-column>
      <el-table-column prop="make" label="厂商"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" style="text-align: left;">
          <el-button
            @click.native.prevent="confirm(scope.row.sid)"
            type="text"
            size="small"
          >
            通过
          </el-button>

          <el-button
            @click.native.prevent="deny(scope.row.sid)"
            type="text"
            size="small"
            style="color: red"
          >
            拒绝
          </el-button>

        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "Main2",
  data() {
    return {
      active: 0,
      tableData: [],
    };
  },
  props: ["msg"],
  components: {},
  mounted() {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("http://127.0.0.1:8000/loan_approval").then((res) => {
        if (res.code == 404) {
          console.log("获取数据失败");
        } else {
          this.tableData = res.data;

        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    update() {},
      confirm(sid){
              this.$http
                  .post("http://127.0.0.1:8000/loan_approval/pass_approval", {"sid": sid})
                  .then((res) => {
                      this.getData()
                  });
      },
      deny(sid){
          this.$http
              .post("http://127.0.0.1:8000/loan_approval/reject_approval", {"sid": sid})
              .then((res) => {
                  this.getData()
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
