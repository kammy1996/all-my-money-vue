<template>
  <div class="background-wrapper">
    <div  class="records">
      <div class="space-20"></div>
      <div class="ma-5 text-center" style="border:1px solid rgba(0,0,0,0.1)">
        <h2>Glance View</h2>
      </div>
      <div class="custom-container">
        <div class="row">
          <div class="col-md-3">
            <v-card class="pa-5" rounded>
              <v-card-title>Records</v-card-title>
              <AddRecord />
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
  </div>
</template>

<script>
import AddRecord from '../../components/records/add-record';
import RecordsList from '../../components/records/records-list';

export default {
  name: 'Records',
  data() {
    return {
    };
  },
  mounted() { 
    this.getRecordDependencies();
  },
  components: {
    AddRecord,
    RecordsList,
  },
  methods: { 
     getRecordDependencies() { 
       this.$store.dispatch(`records/GET_ALL_CATEGORIES`);
       this.$store.dispatch(`records/GET_ALL_LABELS`);
       this.$store.dispatch(`records/GET_ALL_ACCOUNTS`);
    }
  }
};
</script>
<style>

</style>
