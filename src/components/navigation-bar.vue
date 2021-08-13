<template>
  <div>
    <v-app-bar color="blue accent-4" dark fixed>
      <v-toolbar-title><v-icon>mdi-cash</v-icon> All My Money</v-toolbar-title>
      <v-row class="mx-15">
        <v-col cols="2">
          <router-link class="no-link" :to="{ name: 'Dashboard' }">
            <v-btn text>
              <v-icon class="mr-1">mdi-view-dashboard</v-icon> Dashboard
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="2">
          <router-link class="no-link" :to="{ name: 'Networth' }">
            <v-btn text> <v-icon>mdi-currency-inr</v-icon>Net Worth </v-btn>
          </router-link>
        </v-col>
        <v-col cols="2">
          <router-link class="no-link" :to="{ name: 'Goals' }">
            <v-btn text>
              <v-icon class="mr-1">mdi-flag-triangle</v-icon> Goals
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="2">
          <router-link class="no-link" :to="{ name: 'Records' }">
            <v-btn text>
              <v-icon class="mr-1">mdi-file-document</v-icon> Records
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="2">
          <router-link class="no-link" :to="{ name: 'Subscription' }">
            <v-btn text>
              <v-icon class="mr-1">mdi-playlist-check</v-icon> subscription
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="2">
          <router-link class="no-link" :to="{ name: 'Subscription' }">
            <v-btn text>
              <v-icon class="mr-1">mdi-google-analytics</v-icon> Analytics
            </v-btn>
          </router-link>
        </v-col>
      </v-row>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom min-width="120px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class = "cursor-pointer" list-item-title>  <v-switch
              v-model="themeSwitch"
              @change="changeTheme"
              label="Dark"
            ></v-switch>
          </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              @click="logout"
              class="cursor-pointer"
              list-item-title
              >Log out</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  name: 'NavigationBar',
  data() {
    return {
      themeSwitch:false
    };
  },
  computed:  {
    isDark() { 
      return this.$store.getters[`general/IS_THEME_DARK`];
    }
  },
  mounted() { 
    this.themeSwitch = this.isDark;
    this.$vuetify.theme.isDark = this.isDark;
  },
  methods: {
    logout() {
      Cookie.remove('token');
      this.$store.commit(`RESET_ALL_MODULES`);
      if (Cookie.get(`token`) == undefined) {
        this.$store.commit('user/USER_LOG_OUT');
        this.$store.commit('user/AUTHENTICATE_USER', false);
        this.$router.go();
        this.$router.push({ name: 'LoginForm' });
      }
    },
    changeTheme() { 
     this.$store.commit(`general/TURN_ON_DARK_MODE`,this.themeSwitch);
     this.$vuetify.theme.isDark = this.isDark;
    }
  },
};
</script>
<style scoped>
.navigation-link {
  color: white;
  text-decoration: none;
}
</style>
