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
      <el-table-column prop="LoanAmount" label="申请额度">
      </el-table-column>
      <el-table-column prop="LoanTerm" label="申请期限">
      </el-table-column>
      <el-table-column prop="credit_level" label="信用等级"> </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope" style="text-align: left;">
          <el-button
            @click.native.prevent="permit_loan(scope.row.sid)"
            type="text"
            size="small"
          >
            通过
          </el-button>

          <el-button
            @click.native.prevent="reject_loan(scope.row.sid)"
            type="text"
            size="small"
            style ="color: red"
          >
            拒绝
          </el-button>
          <el-button
            @click.native.prevent="edit_loan(scope.row.sid, scope.row.amount)"
            type="text"
            size="small"
          >
            修改额度
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "Main3",
  data() {
    return {

      active: 0,
      tableData: [],
    };
  },
  props: ["msg"],
  components: {},
  mounted() {},
  created(){
    this.getData();

  },

  methods: {
    getData() {
          this.$http.get("http://127.0.0.1:8000/loan_approval/credit_lavel").then((res) => {
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
      permit_loan(uid){
          this.$http.post("http://127.0.0.1:8000/loan_approval/permit_loan", {"user_id": uid}).then((res) => {
                this.getData()
          });
      },
      reject_loan(uid){
          this.$http.post("http://127.0.0.1:8000/loan_approval/reject_loan", {"user_id": uid}).then((res) => {
              this.getData()
          });
      },
      edit_loan(uid, amount){
          this.$prompt('请输入金额', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^\d+$/,
              inputErrorMessage: '请输入整数金额'
          }).then(({ value }) => {

              this.$http.post("http://127.0.0.1:8000/loan_approval/edit_loan", {"user_id": uid, "loanAmount": value}).then((res) => {

                  if(res.data.mes == 'error'){
                      this.$message({
                          type: 'error',
                          message: '修改金额必须小于原金额'
                      });
                  }
                  if(res.data.mes == 'accept') {
                      this.$message({
                          type: 'success',
                          message: '修改成功'
                      });
                      this.getData()
                  }

              });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '取消输入'
              });
          });

      },
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
