<template>
  <v-app>
    <v-main>
      <NavigationBar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/navigation-bar'


export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    NavigationBar
  }
};
</script>
