<template>
  <div id="welcome-area">
    <div class="space-50"></div>
    <div class="space-30"></div>
    <h1 class="pa-50 text-center login-title">
    </h1>
    <div class="space-30"></div>
    <v-card class="welcome-box" width="900px">
      <v-row>
        <v-col cols="5">
          <div class="space-30"></div>
          <v-img src="../../assets/images/login-img.png" width="90%"></v-img>
            <div class="space-20"></div>
           <h2 class="text-center login-title">All My <span >Money</span></h2>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="6">
            <div :class="registerMode != 'custom' ? 'space-50' : 'space-10'" ></div>
           <v-btn v-if="registerMode != 'custom'" block dark color="primary" align="left" @click="registerMode = 'custom'" >
                Signup using Email</v-btn
              > 
            <h2 v-else>Sign up</h2>
          <div v-if="registerMode == 'custom'">
           <div class="space-20"></div>
            <v-form ref="register" v-model="valid">
              <div class="space-10"></div>
              <v-text-field
                prepend-icon="mdi-account"
                label="Enter Full Name"
                color="primary"
                :rules="[(v) => !!v || 'Name is required']"
                v-model="user.name"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                label="Enter Email Id"
                color="primary"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]"
                v-model="user.email"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-key"
                v-model="user.password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[(v) => !!v || 'Password is required']"
                :type="showPass ? 'text' : 'password'"
                label="Enter Password"
                name="input-10-1"
                counter
                @click:append="showPass = !showPass"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-key"
                v-model="user.confirmPass"
                :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                :type="showPass1 ? 'text' : 'password'"
                label="Enter Password"
                name="input-10-1"
                counter
                @click:append="showPass1 = !showPass1"
              ></v-text-field>
             
              <div class="space-30"></div>
              <v-btn block dark color="primary" align="left" @click="signup">
                Signup</v-btn
              >  
            </v-form>
          </div>
          <div class="google-signup">
            <div class="space-20"></div>
              <h4 class="text-center">OR</h4>
              <div class="space-20"></div>
              <div class="google-signin">
                  <v-btn block  @click="googleSignIn">
                  <img class="mr-2" src="../../assets/images/google-logo.png" width="4%"> Sign up Using Google</v-btn>
              </div> 
            </div>
             <div class="space-30"></div>
            <p>
              Already Registered?
              <router-link to="/"><b>Login</b></router-link>
            </p>
        </v-col>
      </v-row>
      <Snackbar
        v-if="snackbar.show"
        :show="snackbar.show"
        :text="snackbar.text"
        :color="snackbar.color"
      />
    </v-card>
  </div>
</template>
<script>
// import Snackbar from '../../components/common/snackbar';
import Cookie from 'js-cookie';

export default {
  name: 'RegisterForm',
  // components: {
  //   Snackbar,
  // },
  data() {
    return {
      user: {},
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => v == this.user.password || 'Password must match',
      ],
      valid: false,
      snackbar: {},
      showPass:false,
      showPass1:false,
      registerMode:'',
    };
  },
  methods: {
    signup() {
      this.$refs.register.validate();
      if (this.valid) {

        const userDetails = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.confirmPass,
        };
        this.snackbar = {};
        this.$store
          .dispatch('user/REGISTER_USER', userDetails)
          .then((res) => {
            console.log(res)
            this.$refs.register.reset();
            // this.snackbar = {
            //   show: true,
            //   color: 'green',
            //   text:
            //     `${res}`,
            // };
          })
          .catch((err) => {
            console.log(err)
            // this.$Progress.fail();
            // this.$refs.register.reset();
            // this.snackbar = {
            //   show: true,
            //   color: 'red',
            //   text:
            //     `${err.response.data}`,
            // };
          });
      }
    },
     login() {
      this.$refs.login.validate();
      if (this.valid) {
        Cookie.remove(`token`);
        const user = {
          email: this.user.email,
          password: this.user.password,
        };
        this.snackbar = {};

        this.$store
          .dispatch(`USER_LOGIN`, user)
          .then((res) => {
            if (res.token) Cookie.set('token', res.token);
            this.$router.push({ name: 'Index' });
          })
          .catch((err) => {
            this.$Progress.fail();
            this.$refs.login.reset();
            this.snackbar = {
              show: true,
              color: `red`,
              text: `${err.response.data}`,
            };
          });
      }
    },
    googleSignIn() {
      // this.$gAuth
      //   .signIn()
      //   .then(GoogleUser => {
      //     // on success do something
      //     this.$store.dispatch('AUTHENTICATE_GOOGLE_USER',GoogleUser)
      //     .then((res) => {
      //       if (res.token) Cookie.set('token', res.token);
      //       this.snackbar = {
      //         show: true,
      //         color: `green`,
      //         text: `You are Successfully Logged In`,
      //       };
      //       setTimeout(() => {  
      //        this.$router.push({ name: 'Index' }); 
      //       }, 1000);
      //     })
      //   })
      //   .catch(() => {
      //      this.snackbar = {
      //         show: true,
      //         color: `red`,
      //         text: `something went Wrong`,
      //       };
      //   })
    }
  },
};
</script>
<style lang="scss">
  .login-title { 
    font-weight: 300;
    font-size:28px;
  }
.login-title span { 
    color:green !important;
    font-weight: 500;
  
  }
</style>
