<template>
  <div>
    <v-row>
    <v-card-title>Filters</v-card-title>

    <v-spacer></v-spacer>
    <v-btn class="mt-4" color="blue" text small @click="resetFilters">reset</v-btn>
    </v-row>
    <v-expansion-panels  flat accordion focusable hover >
      <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Type
           <template v-if="filters.type && filters.type.length" v-slot:actions>
              <v-icon color="success">
                mdi-check-circle
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
           <div v-for="type in types" :key="type.id">
                <v-checkbox
                  multiple
                  v-model="filters.type"
                  :value="type.id"
                  @change="typeChecked"
                  :label="type.name"
                  dense
                  hide-details
                ></v-checkbox>
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Accounts
           <template v-if="filters.account && filters.account.length" v-slot:actions>
              <v-icon color="success">
                mdi-check-circle
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <div v-for="account in accounts" :key="account.id">
                <v-checkbox
                  multiple
                  v-model="filters.account"
                  :value="account.id"
                  @change="accountChecked"
                  :label="account.name"
                  dense
                  hide-details
                ></v-checkbox>
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Categories
           <template v-if="filters.category && filters.category.length" v-slot:actions>
              <v-icon color="success">
                mdi-check-circle
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="category in categories" :key="category.id">
                <v-checkbox
                  multiple
                  v-model="filters.category"
                  :value="category.id"
                  @change="categoryChecked"
                  :label="category.name"
                  dense
                  hide-details
                ></v-checkbox>
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Labels
            <template v-if="filters.label && filters.label.length" v-slot:actions>
              <v-icon color="success">
                mdi-check-circle
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="label in labels" :key="label.id">
                <v-checkbox
                  multiple
                  v-model="filters.label"
                  :value="label.id"
                  @change="labelChecked"
                  :label="label.name"
                  dense
                  hide-details
                ></v-checkbox>
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Amount
            <template v-if="filters.amount && filters.amount.length" v-slot:actions>
              <v-icon color="success">
                mdi-check-circle
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="amount in amounts" :key="amount.id">
                <v-checkbox
                  multiple
                  v-model="filters.amount"
                  :value="amount.id"
                  @change="amountChecked"
                  :label="amount.name"
                  dense
                  hide-details
                ></v-checkbox>
              </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  </div>  
</template>
<script>
import {mapGetters} from 'vuex'; 

export default{
  name:'RecordFilters',
  data() { 
    return { 
      types:[
        { id:'1',name: 'Income' },
        { id: '2', name: 'Expense' }
      ],
      amounts:[
        { id:'1',name: 'less than 500' },
        { id: '2', name: '500 - 2000' },
        { id: '3', name: '2000 - 10000' },
        { id: '4', name: 'Above 10000' },
      ],
      filters:{},
     
    }
  },
  computed: { 
    ...mapGetters({
      accounts: 'records/GET_ACCOUNTS',
      categories: 'records/GET_CATEGORIES',
      labels: 'records/GET_LABELS',
    }),
  },
  methods: { 
    resetFilters() { 
      this.filters = {};
    },
    accountChecked() { 
      console.log(this.filters.account)
    },
    typeChecked() {

      },
    categoryChecked() {

      },
    labelChecked() {

    },
    amountChecked() {

      }
  }
}
</script>


