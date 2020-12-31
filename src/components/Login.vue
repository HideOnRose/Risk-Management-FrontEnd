<template>
  <div class="container demo-1">
    <div class="content">
      <div id="large-header" class="large-header">
        <canvas id="demo-canvas"></canvas>
        <div class="logo_box">
          <h3 style="margin-top: -20px; margin-left: 10px;">
            Metis 智能风控管理系统
          </h3>
          <h4>欢迎你</h4>
          <form>
            <div class="input_outer">
              <span class="u_user"></span>
              <input
                name="logname"
                v-model="user"
                class="text"
                style="color: #ffffff !important;"
                type="text"
                placeholder="请输入账户"
                autocomplete="off"
              />
            </div>

            <div class="input_outer">
              <span class="us_uer"></span>
              <input
                name="logpass"
                v-model="password"
                class="text"
                style="
                  color: #ffffff !important;
                  position: absolute;
                  z-index: 100;
                  margin-top: -10px;
                "
                value=""
                type="password"
                placeholder="请输入密码"
                @keyup.enter="doLogin"
              />
            </div>
            <div class="mb2">
              <a
                class="act-but submit"
                href="javascript:;"
                style="color: #ffffff; font-size: 15px;"
                @click="doLogin"
                >登录</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import one from "./one.vue";
import two from "./two.vue";
import three from "./three.vue";
import four from "./four.vue";
import five from "./five.vue";
import middle from "./middle.vue";
import after from "./after.vue";
export default {
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  components: {},
  mounted() {},
  methods: {
    doLogin() {
      if (this.user == "" || this.password == "") {
        this.emptyMess();
      } else {
        var userdata = { username: this.user, password: this.password };
        this.$http.post("http://127.0.0.1:8000/", userdata).then((res) => {
          if (res.data.code == 1000) {
            sessionStorage.setItem("login", true);

            const newRoutes = [
              {
                path: "/one",
                name: "one",
                component: one,
              },
              {
                path: "/two",
                name: "two",
                component: two,
              },
              {
                path: "/three",
                name: "three",
                component: three,
              },
              {
                path: "/four",
                name: "four",
                component: four,
              },
              {
                path: "/five",
                name: "five",
                component: five,
              },
                {
                    path: "/middle",
                    name: "middle",
                    component: middle,
                },
                {
                    path: "/after",
                    name: "after",
                    component: after,
                },

            ];
            this.$router.addRoutes(newRoutes);
            this.$router.push({ path: "one" });
          } else {
            // console.log("登录失败!");
            this.wrongMess();
            sessionStorage.setItem("login", false);
          }
        });
      }
    },

    emptyMess() {
      this.$alert("请输入账号密码！", "登录失败", {
        confirmButtonText: "确定",
      });
    },

    wrongMess() {
      this.$alert("账号或密码错误！", "登录失败", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/css/normalize.css";
@import "../assets/css/demo.css";
@import "../assets/css/component.css";
</style>
