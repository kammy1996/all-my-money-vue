<template>
  <div>
    <v-row>
      <v-card-title>Filters</v-card-title>

      <v-spacer></v-spacer>
      <v-btn class="mt-4" color="blue" text small @click="resetFilters"
        >reset</v-btn
      >
    </v-row>
    <v-expansion-panels v-model="filterPanel" flat accordion focusable hover>
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
              :value="type.value"
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
          <template
            v-if="filters.account && filters.account.length"
            v-slot:actions
          >
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
          <template
            v-if="filters.category && filters.category.length"
            v-slot:actions
          >
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
          <template
            v-if="filters.amount && filters.amount.length"
            v-slot:actions
          >
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
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import bus from '@/main';

export default {
  name: 'RecordFilters',
  data() {
    return {
      types: [
        { id: '1', name: 'Income', value: 'income' },
        { id: '2', name: 'Expense', value: 'expense' },
      ],
      amounts: [
        {id: '1',name: 'less than 500', value: {min: 0, max: 500}},
        { id: '2', name: '500 - 2000', value: { min: 500, max: 2000 }},
        { id: '3', name: '2000 - 10000', value: { min: 2000, max: 10000}},
        { id: '4', name: 'Above 10000', value: { min: 10000, max: 10000000}},
      ],
      filters: {},
      filterPanel: false,
    };
  },
  mounted() {
    bus.$on(`getFilteredRecords`, () => {
      this.cleanFiltersAndCheck();
    });
  },
  watch: {
    filters: {
      handler() {
        this.cleanFiltersAndCheck();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      accounts: 'records/GET_ACCOUNTS',
      categories: 'records/GET_CATEGORIES',
      labels: 'records/GET_LABELS',
    }),
    ...mapState('records', ['recordOptions', 'isRecordsFiltered']),
  },
  methods: {
    filterAmounts() {

    },
    cleanFiltersAndCheck() {
      //Delete keys which are empty array
      Object.keys(this.filters).forEach((key) => {
        if(key === 'amount') this.filterAmounts();
        if (this.filters[key].length == 0) delete this.filters[key];
      });
      
      if (Object.keys(this.filters).length == 0) {
        this.$store.commit(`records/SET_IS_RECORDS_FILTERED`, false);
        bus.$emit('getAllRecords');
      } else {
        this.$store.commit(`records/SET_IS_RECORDS_FILTERED`, true);
        if (this.isRecordsFiltered) this.getFilteredRecords();
      }
    },
    getFilteredRecords() {
      let perPage = this.recordOptions.itemsPerPage;
      let page = this.recordOptions.page;

      let queryString = Object.keys(this.filters)
        .map((key) => key + '=' + this.filters[key])
        .join(`&`);

      this.$store
        .dispatch('records/GET_TOTAL_FILTERED_RECORDS', queryString)
        .then(() => {
          this.$store.dispatch(`records/GET_FILTERED_RECORDS`, {
            queryString,
            page,
            perPage,
          });
        });
    },
    resetFilters() {
      this.filterPanel = undefined;
      this.filters = {};
    },
  },
};
</script>
