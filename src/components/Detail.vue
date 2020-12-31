<template>
  <el-main>
    <table border="0">
      <td style="width: 26%; vertical-align: top">
        <div class="info">
          <el-form label-position="right" label-width="90px" size="mini">
            <el-form-item label="申请人姓名">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.sid" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="性别">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.gender" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="是否已婚">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.married" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="教育程度">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.edu" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="是否个体户">
              <el-col :span="15">
                <el-input
                  :disabled="true"
                  v-model="tableData.selfEmployed"
                  size="mini"
                  class="rt-input"
                ></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="年收入">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.income" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="户口">
              <el-col :span="15">
                <el-input
                  :disabled="true"
                  v-model="tableData.propertyArea"
                  size="mini"
                  class="rt-input"
                ></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="贷款额度">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.LoanAmount" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="贷款期限">
              <el-col :span="15">
                <el-input :disabled="true" v-model="tableData.LoanTerm" size="mini" class="rt-input"></el-input
              ></el-col>
            </el-form-item>
          </el-form>
        </div>
      </td>
      <td style="width: 26%; vertical-align: top;">
        <div class="info">
          <el-form label-position="right" label-width="90px" size="mini">
            <el-form-item label="是否黑名单">
              <el-col :span="15">
                <el-input :disabled="true" v-model="blacklist" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="一层黑户数">
              <el-col :span="15">
                <el-input :disabled="true" v-model="network1" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="二层黑户数">
              <el-col :span="15">
                <el-input :disabled="true" v-model="network2" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="持有电话数">
              <el-col :span="15">
                <el-input :disabled="true" v-model="phone" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="大额转账数">
              <el-col :span="15">
                <el-input :disabled="true" v-model="rmt" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="正常交易数">
              <el-col :span="15">
                <el-input :disabled="true" v-model="clear" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="违约交易数">
              <el-col :span="15">
                <el-input :disabled="true" v-model="breach" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
            <el-form-item label="被拒绝交易">
              <el-col :span="15">
                <el-input :disabled="true" v-model="reject" size="mini" class="rt-input"></el-input
                ></el-col>
            </el-form-item>
          </el-form>
        </div>
      </td>
      <td>
        <div class="graph">
          <div class="flexRow kgWidgetContainer">
            <div class="editBox flexColumn">
              <Visualization
                @clickNode="handleClickNode"
                :records="records"
                :clearAll="clearAll"
              ></Visualization>
            </div>
          </div>
        </div>
      </td>
    </table>
  </el-main>
</template>

<script>
import { Visualization } from "components/D3Visualization";
import { v1 as neo4j } from "neo4j-driver-alias";
import { setting } from "config/index";
export default {
  name: "Detail",
  props: ["uid"],
  data() {
    return {
      tableData: {},
      query: "",
      records: [],
      clearAll: false,
        blacklist:'',
        network1:"",
        network2:"",
        phone: "",
        rmt: "",
        breach:"",
        clear: "",
        reject:"",

    };
  },
  components: {
    Visualization,
  },
  mounted() {
    this.getDetail(this.uid);
    this.driver = neo4j.driver(
      setting.neo4jUrl,
      neo4j.auth.basic(setting.neo4jUserName, setting.neo4jPassword)
    );
    this.query =
      "match (s:`person`)-[a]-(b) where s.personID= '" +
      this.uid +
      "' RETURN *";
    this.executeQuery();
  },
  methods: {
    getDetail(id) {
      this.$http
        .post("http://127.0.0.1:8000/loan_approval/show_details", {
          user_id: id,
        })
        .then((res) => {
          if (res.code == 404) {
            console.log("获取数据失败");
          } else {
            this.tableData = res.data["0"];
          }
        });

        this.$http
            .post("http://127.0.0.1:8000/loan_approval/findUserInfo", {
                user_id: id,
            })
            .then((res) => {
                if (res.code == 404) {
                    console.log("获取数据失败");
                } else {

                    this.blacklist = res.data["0"].userInfo;
                    if(this.blacklist == 0){
                        this.blacklist = "No"
                    }
                    if(this.blacklist == 1){
                        this.blacklist = "Yes"
                    }
                }
            });
        this.$http
            .post("http://127.0.0.1:8000/loan_approval/findNetwork1FlagNum", {
                user_id: id,
            })
            .then((res) => {
                if (res.code == 404) {
                    console.log("获取数据失败");
                } else {

                    this.network1 = res.data["0"].num

                }
            });

        this.$http
            .post("http://127.0.0.1:8000/loan_approval/findNetwork2FlagNum", {
                user_id: id,
            })
            .then((res) => {
                if (res.code == 404) {
                    console.log("获取数据失败");
                } else {

                    this.network2 = res.data["0"].num

                }
            });
        this.$http
            .post("http://127.0.0.1:8000/loan_approval/findUserPhoneNum", {
                user_id: id,
            })
            .then((res) => {
                if (res.code == 404) {
                    console.log("获取数据失败");
                } else {

                    this.phone = res.data["0"].num

                }
            });

        this.$http
            .post("http://127.0.0.1:8000/loan_approval/findUserRmtNum", {
                user_id: id,
            })
            .then((res) => {
                if (res.code == 404) {
                    console.log("获取数据失败");
                } else {

                    this.rmt = res.data["0"].num

                }
            });

        this.$http
            .post("http://127.0.0.1:8000/loan_approval/findUserTxConditionNum", {
                user_id: id,
            })
            .then((res) => {
                if (res.code == 404) {
                    console.log("获取数据失败");
                } else {

                    this.breach = res.data["0"].default
                    this.clear = res.data["0"].clear
                    this.reject = res.data["0"].reject

                }
            });

    },
    handleClickNode(item) {},
    executeQuery() {
      let me = this;
      me.records = [];
      this.clearAll = true;
      var session = this.driver.session();

      let query = this.query;
      if (query == "") return;

      session
        .run(query, {})
        .then(function (result) {
          me.clearAll = false;
          me.records = result.records;
          session.close();
        })
        .catch(function (error) {
          console.log("查询语句不合法");
        });
    },

  },
  watch: {
    records: {
      handler: function (val, oldVal) {},
      deep: true,
    },
  },
};
</script>

<style scoped>
input {
  border: 0.5px solid;
  border-radius: 3px;
  outline: none;
}

.info {
  float: left;
  line-height: 30px;
}

.el-form-item {
  margin-top:  -10px;
  margin-left: -15px;
}

.graph {
  float: right;
  height: 50%;
}

.kgWidget .kgWidgetContainer {
  box-sizing: border-box;
  padding-top: 60px;
  font-size: 12px;
}

.kgWidget .flexBox {
  display: -webkit-box;
  display: flex;
}

.kgWidget .editBoxItem {
  padding: 12px 0;
  padding-left: 10px;
  box-sizing: border-box;
}

.editBox {
  font-size: 12px;
  color: #333;
  width: 100%;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.editBox {
  -webkit-box-flex: 1;
  flex: 1;
  min-height: 40px;
}

.editBox .editArea {
  min-height: 361px;
  display: -webkit-box;
  display: flex;
  width: 100%;
  position: relative;
  background: #fff;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
}

.editBox .editWidgetContainer {
  width: 100%;
  padding: 0 14px;
  box-sizing: border-box;
  padding-top: 10px;
}

.editBox .editWidgetList {
  width: 100%;
  display: -webkit-box;
  display: flex;
}

.rt-input /deep/ .el-input__inner {
  color: rgb(92, 112, 234) !important;
  cursor: pointer;

}


</style>
