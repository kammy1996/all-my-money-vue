<template>
  <div>
    <v-row >
      <v-col v-for="account in accounts" :key="account.id" cols="2">
        <v-card height="80" :style="`border-top:5px solid ${account.color}`">
          <v-card-title class="pb-0 pt-1">
          <v-icon small color="black">{{ account.typeIcon }}</v-icon>
           <span class="ml-2">{{ account.name }}</span></v-card-title>
          <v-card-title class="ml-4 pt-0">
          <v-icon small color="black">mdi-currency-inr</v-icon>
          {{ account.balance }} </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name:"RecordAccountsGlance",
  data() { 
    return { 

    }
  },
  computed: { 
    ...mapGetters({
      accounts: 'records/GET_ACCOUNTS'
    })
  }
}
</script>
