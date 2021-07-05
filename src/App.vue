<template>
  <v-app>
    <v-main>
      <NavigationBar v-if="isAuthenticated" />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/navigation-bar'

export default {
  name: 'App',
  data: () => ({

  }),
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
