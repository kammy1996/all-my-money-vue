<template>
  <div id="welcome-area">
    <div class="space-50"></div>
    <div class="space-30"></div>
    <h1 class="pa-50 text-center login-title">
    </h1>
    <div class="space-30"></div>
    <v-card class="welcome-box" width="900px">
      <v-row>
        <v-col cols="6">
          <div class="space-30"></div>
          <v-img src="../../assets/images/login-img.png" width="90%"></v-img>
          <div class="space-20"></div>
          <h2 class="text-center login-title">All My <span >Money</span></h2>
        </v-col>
        <v-col cols="6">
          <div>
            <v-form ref="login" v-model="valid">
              <h2>Login</h2>
              <div class="space-10"></div>
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
                v-on:keyup.enter="login"
              ></v-text-field>
              <div class="space-20"></div>
              <v-btn dark block color="primary" align="left" @click="login">
                Login</v-btn
              >
               <div class="space-20"></div>
              <h4 class="text-center">OR</h4>
              <div class="space-20"></div>
              <div class="google-signin">
                  <v-btn block  @click="googleSignIn"> 
                  <img class="mr-2" src="../../assets/images/google-logo.png" width="4%"> Sign in Using Google</v-btn>
              </div>     
             
             
            </v-form>

            <div class="space-30"></div>
            <p>
              Not Registered yet?
              <router-link :to="{path : 'register'}"><b>Signup </b></router-link>
            </p>
          </div>
        </v-col>
      </v-row>
      <!-- <Snackbar
        v-if="snackbar.show"
        :show="snackbar.show"
        :text="snackbar.text"
        :color="snackbar.color"
      /> -->
    </v-card>
  </div>
</template>

<script>
// import Snackbar from '../../components/common/snackbar';
import Cookie from 'js-cookie';


export default {
  name: 'LoginForm',
  data() {
    return {
      user: {},
      valid: false,
      showPass: false,
      snackbar: {},
    };
  },
  // components: {
  //   Snackbar,
  // },
  mounted() {
    this.$Progress.finish()
  },
  methods: {
    login() {
      this.$refs.login.validate();
      if (this.valid) {
        const user = {
          email: this.user.email,
          password: this.user.password,
        };
        this.snackbar = {};
        this.$store
          .dispatch(`user/USER_LOGIN`, user)
          .then((res) => {
            Cookie.set('token',res.token);
            this.$router.go();
            if(Cookie.get(`token`)) {
              this.$store.commit(`user/LOGIN_USER`,res)
              this.$store.commit(`user/AUTHENTICATE_USER`,true);
              this.$router.push({ name: 'Dashboard' }); 
            }
          })
          .catch((err) => {
            console.log(err)
            // this.$Progress.fail();
            // this.$refs.login.reset();
            // this.snackbar = {
            //   show: true,
            //   color: `red`,
            //   text: `${err.response.data}`,
            // };
          });
      }
    },
    googleSignIn() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // on success do something
          this.$store.dispatch('AUTHENTICATE_GOOGLE_USER',GoogleUser)
          .then(() => {
            this.snackbar = {
              show: true,
              color: `green`,
              text: `You are Successfully Logged In`,
            };
            setTimeout(() => {  
             this.$router.push({ name: 'Index' }); 
            }, 1000);
          })
        })
        .catch(() => {
           this.snackbar = {
              show: true,
              color: `red`,
              text: `something went Wrong`,
            };
        })
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
