<template>
  <div>
    <v-card  dense>
      <div class="row px-5 mb-1">
        <div class="col-md-7">
          <h3 class="settings-title mb-3 ml-5 pt-5">YOUR RECORDS</h3>
        </div>
        <div class="col-md-5">
          <v-text-field
              v-model="searchRecords"
              append-icon="mdi-magnify"
              label="Search Records"
              single-line
              hide-details
            ></v-text-field>
        </div>
        
        </div>
       <v-data-table
        
        :headers="headers"
        :items="records"
        :search="searchRecords"
        item-key="name"
        show-select
        class="elevation-1"
      >
      <template v-slot:item.account=" {item} ">
       <v-icon> {{ recordAccountIcon(item.account) }} </v-icon>
            {{ recordAccount(item.account) }}
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name:'RecordsList',
  data() {
    return { 
      checkbox:false,
       headers: [
          {
            text: 'Date',
            value: 'date',
          },
          {
            text: 'Source',
            value: 'source',
          },
          { text: 'Account', value: 'account' },
          { text: 'Category', value: 'category' },
          { text: 'Label', value: 'label' },
          { text: 'Amount', value: 'amount' },
          { text: 'Action', value: 'action',sortable: false}
        ],
      
      singleSelect:false,
      selected:false,
      searchRecords:''
    }
  },
  methods : { 
    recordAccount(id) { 
      const filtered = this.accounts.filter(account => account.id == id);
      return filtered[0].name
    },
    recordAccountIcon(id) { 
      const filtered = this.accounts.filter(account => account.id == id);
      console.log(filtered[0]);
      return filtered[0].typeIcon;
    }
  },
  computed: { 
    ...mapGetters({
      records : 'records/GET_RECORDS',
      accounts:'records/GET_ACCOUNTS',
      categories:'records/GET_CATEGORIES',
      labels:'records/GET_LABELS'
    }),
  },
}
</script>
<style >
   .v-data-table-header { 
    background:rgba(0,0,0,0.03)
  }  
  .amount-income { 
    color:green
  }
  .amount-expense { 
    color:red
  }
</style>