<template>
  <div class="background-wrapper">
    <div class="custom-container">
    <div  class="records">
      <div class="space-20"></div>
      <div class="my-5 text-center">
        <AccountsGlance 
        />
      </div>
        <div class="row">
          <div class="col-md-3">
            <v-card class="pa-5" rounded>
              <v-card-title>Records</v-card-title>
              <AddRecord />
              <div class="space-20"></div>
              <RecordFilters />
              <div class="space-30"></div>
              <div class="settings">
                <router-link class="no-link" :to="{ name: 'RecordSettings' }">
                  <v-btn block dark>
                    <v-icon class="mr-1">mdi-cog</v-icon> Settings
                  </v-btn>
                </router-link>
              </div>
            </v-card>
          </div>
          <div class="col-md-9">
            <RecordsList />
          </div>
        </div>
      </div>
    </div>
      <Snackbar
        class="mb-10"
        v-if="snackbar.show"
        :show="snackbar.show"
        :text="snackbar.text"
        :color="snackbar.color"
      ></Snackbar>
  </div>
</template>

<script>
import AddRecord from '../../components/records/add-record';
import RecordsList from '../../components/records/records-list';
import RecordFilters from '@/components/records/record-filters';
import AccountsGlance from '@/components/records/record-accounts-glance'
import { mapState } from 'vuex';
import Snackbar from '@/components/common/snackbar';

export default {
  name: 'Records',
  data() {
    return {
    };
  },
  watch: { 
    snackbar : {
      handler() {      
        setTimeout(() => {  
          this.snackbar.show = false;
        }, 2500);
      },
      deep:true
    } 
  },
  mounted() { 
    this.getRecordDependencies();
    this.$store.commit(`general/RESET_SNACKBAR`)
  },
  components: {
    AddRecord,
    RecordsList,
    Snackbar,
    RecordFilters,
    AccountsGlance
  },
  methods: { 
     getRecordDependencies() { 
       this.$store.dispatch(`records/GET_ALL_CATEGORIES`);
       this.$store.dispatch(`records/GET_ALL_LABELS`);
       this.$store.dispatch(`records/GET_ALL_ACCOUNTS`);
    },
  },
  computed:{
    ...mapState(`general`,['snackbar'])
  }
};
</script>
<style>

</style>
