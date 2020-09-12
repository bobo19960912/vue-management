<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          @click="getId(item.id,item.txt)"
          v-for="(item,index) in meauTab"
          :key="index"
          :class="[index==activeId?'current':'']"
        >{{item.txt}}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="medium"
      >
        <el-form-item prop="email">
          <label>邮箱</label>
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="reCheckPass" v-if="isRegister">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.reCheckPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="verification">
          <label>验证</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.verification"
                maxlength="6"
                onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              ></el-input>
            </el-col>
            <el-col :span="9" class="block">
              <el-button type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            style="background:#fab6b6;width:100%;color:#fff;margin-top:20px;display:block"
            @click="submitForm('ruleForm')"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validateUserName,
  validatePassword,
  validateVC,
} from "../../utils/validata";
export default {
  data() {
    //邮箱
    var validateEmail = (rule, value, callback) => {
      //过滤特殊字符
      // this.ruleForm.email = stripscript(value);
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (validateUserName(value)) {
        callback();
      } else {
        callback(new Error("邮箱格式错误"));
      }
    };
    //密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassword(value)) {
        callback();
      } else {
        callback(new Error("密码格式错误"));
      }
    };
    //重复密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassword(value)) {
        if (this.ruleForm.checkPass === this.ruleForm.reCheckPass) {
          callback();
        } else {
          callback(new Error("密码不一致"));
        }
      } else {
        callback(new Error("密码格式错误"));
      }
    };
    //验证码
    var verification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVC(value)) {
        callback();
      } else {
        callback(new Error("验证码格式错误"));
      }
    };

    return {
      meauTab: [
        { txt: "登录", id: 1 },
        { txt: "注册", id: 2 },
      ],
      //点击事件的下标
      activeId: "",
      //表单
      ruleForm: {
        email: "",
        checkPass: "",
        reCheckPass: "",
        verification: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
        reCheckPass: [{ validator: validatePass2, trigger: "blur" }],
        verification: [{ validator: verification, trigger: "blur" }],
      },
      //判断是不是点击注册按钮
      isRegister: false,
    };
  },
  methods: {
    getId(id, txt) {
      this.activeId = id - 1;
      if (txt == "注册") {
        this.isRegister = true;
      } else {
        this.isRegister = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //判断是否点击注册按钮
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  margin: 0 auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.demo-ruleForm {
  margin-top: 30px;
}
.el-form-item {
  margin-bottom: 20px;
}
.block {
  display: block;
}
</style>