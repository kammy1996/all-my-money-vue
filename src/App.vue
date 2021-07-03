<template>
  <v-app>
    <v-main>
      <NavigationBar v-if="isAuthenticated()" />
      <router-view/>
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
  methods: {
    isAuthenticated() {
      if(Cookie.get(`token`) == undefined) return false;
      else return true;
    }
  },
  components: {
    NavigationBar
  }
};
</script>
