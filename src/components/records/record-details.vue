<template>
  <div>
    <v-dialog
      max-width="600"
      height="auto"
      v-model="dialog"
      @click:outside="toggleDialog"
    >
      <v-card style="overflow:hidden;">
        <v-card-title style="color:white" :class="record.type=='income'? 'income-gradient' : 'expense-gradient'" class="px-5 py-3">
          
          <v-icon class="mr-1" color="white" medium>mdi-information</v-icon> Record Details
        
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <p><v-icon>mdi-calendar</v-icon> {{ record.date | recordDate }}</p>
          </v-col>
        </v-row>
        <div class="space-10"></div>
        <div class="pl-7">
          <p><b>Source </b>: {{ record.source }}</p>
          <p>
            <b>Account</b> :
            <v-icon size="medium">
              {{ getDependentDetails(record.account, 'account', 'typeIcon') }}
            </v-icon>
            {{ getDependentDetails(record.account, 'account', 'name') }}
          </p>
          <p v-if="record.category">
            <b>Category</b> :
            <v-icon size="medium">
              {{ getDependentDetails(record.category, 'category', 'icon') }}
            </v-icon>
            {{ getDependentDetails(record.category, 'category', 'name') }}
          </p>
          <p v-if="record.label">
            <b>Label</b> :
            <v-avatar
              class="mt-n1"
              size="10"
              :color="getDependentDetails(record.label, 'label', 'color')"
            ></v-avatar>
            {{ getDependentDetails(record.label, 'label', 'name') }}
          </p>

          <p v-if="record.note"><v-icon>mdi-note</v-icon> {{ record.note }}</p>

          <p><v-icon>mdi-clock</v-icon> {{ record.lastUpdate | lastUpdatedDate }}</p>

          <v-row class="mb-5">
            <v-col cols="9"></v-col>
            <v-col cols="3">
              <h2
                :class="
                  record.type == 'income' ? 'income-style' : 'expense-style'
                "
              >
                
                <v-icon
                  :color="record.type == 'income' ? 'green' : 'red'"
                > mdi-currency-inr</v-icon>{{ record.amount }}
              </h2>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'RecordDetails',
  props: {
    dialog: Boolean,
    record: Object,
    categories: Array,
    labels: Array,
    accounts: Array,
  },
  filters : {
    lastUpdatedDate(val) { 
      return moment(val).format('MMMM D, YYYY')
    },
    recordDate(val) { 
      return moment(val).format('MMMM D, YYYY')
    },
  },
  methods: {
    toggleDialog() {
      this.$emit(`toggleDialog`);
    },
    
    getDependentDetails(id, list, prop) {
      let listToFilter;
      switch (list) {
        case 'account':
          listToFilter = this.accounts;
          break;
        case 'category':
          listToFilter = this.categories;
          break;
        case 'label':
          listToFilter = this.labels;
          break;
      }
      const filtered = listToFilter.filter((int) => int.id == id);
      if (filtered.length) return filtered[0][prop];
    },
  },
};
</script>

<style scoped>
  .expense-gradient { 
    background-image:linear-gradient(90deg,#be1313, #eb3434)
  }
  .income-gradient { 
    background-image:linear-gradient(90deg,#0c8017, #0e9e1d)
  }
</style>
