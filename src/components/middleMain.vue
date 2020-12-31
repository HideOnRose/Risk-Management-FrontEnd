<template>
  <el-main style="font-size: 12px">
    <el-table
      :data="search(msg)"
      style="width: 100%"
      max-height="100%"
      height="500"
    >
      <el-table-column prop="sid" label="客户姓名">
        <template slot-scope="scope"
          ><a @click.prevent="detail(scope.row.sid)" style="color: #599dd4">{{
            scope.row.sid
          }}</a></template
        >
      </el-table-column>
      <el-table-column prop="LoanAmount" label="贷款额度">
        <template slot-scope="scope">{{ scope.row.LoanAmount }}</template>
      </el-table-column>
      <el-table-column label="已支付额度">
        <template slot-scope="scope"> {{ parseInt(scope.row.Payment) }}</template>
      </el-table-column>
      <el-table-column prop="Spend" label="消费总额">
        <template slot-scope="scope">{{ parseInt(scope.row.Spend) }}</template>
      </el-table-column>
      <!--<el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column> -->
      <el-table-column prop="label" label="逾期概率">
        <template slot-scope="scope" :style="colorChange(scope.row.label)">
          <span :style="colorChange(scope.row.label)">
          {{ scope.row.label.toFixed(3)}}
           </span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" style="text-align: left">
          <el-button
            @click.native.prevent="open(scope.row.sid)"
            type="text"
            size="small"
          >
            警告
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "middleMain",
  data() {
    return {
      active: 0,
      tableData: [
      ],
    };
  },
  components: {},
  created() {
    this.getData();
  },
  mounted() {},
  props: ["msg"],
  methods: {
    getData() {
      this.$http
        .get("http://127.0.0.1:8000/loan_approval/behavior_score")
        .then((res) => {
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
    confirm(sid) {
      this.$http
        .post("http://127.0.0.1:8000/loan_approval/pass_approval", { sid: sid })
        .then((res) => {
          this.getData();
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
    send_mail(id, content) {
      this.$http
        .post("http://127.0.0.1:8000/loan_approval/send_email", {
          user_id: id,
          content: content,
        })
        .then((res) => {});
    },

    open(id) {
      this.$prompt("请输入邮件内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: id + ",您的贷款即将到期，请及时还款！",
      })
        .then(({ value }) => {
          this.send_mail(id, value);
          this.$message({
            type: "success",
            message: "成功发送邮件！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
      colorChange(value){
          if (value < 0.1) {
              return 'color: green';
          } else {

              let valueB = value - 0.1 ;
              let p =  1 - value;
              let pr = 1- valueB / 0.9;

              if (pr > 1){
                  pr = 1;
              }
              let r = parseInt(200 - pr * 200).toString(16);
              if(r.length < 2){
                  r = '0'+r;
              }
              let g = parseInt(p * 187).toString(16);
              if (g.length < 2) {
                  g = '0' + g;
              }
              return "color: " + '#' + r + g + '00';//红绿蓝

        }
      }
  },


};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.el-button{
  margin-left: 2px;
  font-size: 14px;
}
.el-table {
  font-size: 14px;
}
</style>
