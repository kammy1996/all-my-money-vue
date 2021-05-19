<template>
  <div>
     <v-app-bar
      color="blue accent-4"
      dark
    >
      <v-toolbar-title><v-icon>mdi-cash</v-icon> All My Money</v-toolbar-title>
      <v-row class='mx-15'>
        <v-col cols='2'>
          <v-btn text >
           <router-link class="navigation-link" :to="{name: 'Dashboard'}"> <v-icon>mdi-view-dashboard</v-icon> Dashboard</router-link>
          </v-btn>
        </v-col>
        <v-col cols='2'>
          <v-btn text >
           <router-link class="navigation-link" :to="{name: 'Networth'}"><v-icon>mdi-currency-inr</v-icon>Net Worth</router-link>
          </v-btn>
        </v-col>
        <v-col cols='2'>
          <v-btn text >
           <router-link class="navigation-link" :to="{name: 'Goals'}"><v-icon>mdi-flag-triangle</v-icon> Goals</router-link>
          </v-btn>
        </v-col>
         <v-col cols='2'>
          <v-btn text >
           <router-link class="navigation-link" :to="{name: 'Records'}"><v-icon>mdi-file-document</v-icon> Records</router-link>
          </v-btn>
        </v-col>
        <v-col cols='2'>
          <v-btn text >
           <router-link class="navigation-link" :to="{name: 'Subscription'}"><v-icon>mdi-playlist-check</v-icon> subscription</router-link>
          </v-btn>
        </v-col>
        <v-col cols='2'>
          <v-btn text >
           <router-link class="navigation-link" :to="{name: 'Subscription'}"><v-icon>mdi-google-analytics</v-icon> Analytics</router-link>
          </v-btn>
        </v-col>
      </v-row>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'NavigationBar',
    data() {
      return { 
        
      }
    },
  }
</script>
<style scoped>
  .navigation-link{
    color:white;
    text-decoration: none;
  }
</style>
