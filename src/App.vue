<template>
  <v-app>
    <v-main>
      <NavigationBar v-if="isAuthenticated" />
      <router-view/>
      <vue-progress-bar></vue-progress-bar>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/navigation-bar'
import Cookie from 'js-cookie';

export default {
  name: 'App',
  data: () => ({

  }),
  mounted() { 
    this.$Progress.finish();
    this.setAuth();
  },
  methods: { 
    setAuth() { 
       if(Cookie.get(`token`)) {
        this.$store.commit(`user/AUTHENTICATE_USER`,true);
      } else {
        this.$store.commit(`user/AUTHENTICATE_USER`,false);
      }
    }
  },
  created() { 
    this.$Progress.start();

    this.$router.beforeEach((to,from,next) => { 
      if (to.meta.progress != undefined ) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      } 
      this.$Progress.start() 
      next()

      this.$router.afterEach(() => { 
        this.$Progress.finish();
      })
    })
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters[`user/GET_USER_AUTHENTICATION_STATUS`];
    }
  },
  components: {
    NavigationBar
  }
};
</script>
