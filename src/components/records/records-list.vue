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
      <template v-slot:item.account="{ item }">
        <v-avatar
          size="10"
          :color="item.account.color"
          class="mr-1"
        >
        </v-avatar> {{item.account.name}}
      </template>
      <template v-slot:item.category="{ item }">
       
          <v-icon small >
            {{item.category.icon}}
          </v-icon>
          
        {{item.category.name}}
      </template>
      <template v-slot:item.label="{ item }">
        <v-chip
          :color="item.label.color"
          dark
          small
        >
          {{item.label.name}}
        </v-chip>
      </template>
      <template v-slot:item.record="{ item }">
          <div v-if="item.record.type =='income'">
            <h3 class="amount-income"> + 
            <v-icon :color="item.record.color" small>{{item.record.currency}}</v-icon> 
            <span>{{item.record.amount}}</span></h3>
          </div>
          <div v-else-if="item.record.type =='expense'">
            <h3 class="amount-expense"> - 
            <v-icon :color="item.record.color" small>{{item.record.currency}}</v-icon> 
            <span>{{item.record.amount}}</span></h3>
          </div>
      </template>
      <template v-slot:item.action="{  }">
        <v-icon>mdi-dots-vertical</v-icon>
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
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
          { text: 'Amount', value: 'record' },
          { text: 'Action', value: 'action',sortable: false}
        ],
      records: [
        {
          date:'04 June',
          source: 'got Salary', 
            category: {
              name:'utility',
              color:'green',
              icon:'mdi-shape'
            },
            account: {
              name:'ICICI Bank',
              color:'purple',
              icon:'mdi-bank'

            },
            label: {
              name:'personal',
              color:'orange'
            },
            record: {
              type:'income',
              amount: 5000,
              currency:'mdi-currency-inr',
              color:'green'
          }
        },
        {
          date:'04 June',
          source: 'watched Movie', 
            category: {
              name:'utility',
              color:'green',
              icon:'mdi-shape'
            },
            account: {
              name:'ICICI Bank',
              color:'purple',
              icon:'mdi-bank'
            },
            label: {
              name:'personal',
              color:'orange'
            },
            record: {
              type:'expense',
              amount: 450,
              currency:'mdi-currency-inr',
              color:'red'
          }
        }
      ],
      singleSelect:false,
      selected:false,
      searchRecords:''
    }
  }
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