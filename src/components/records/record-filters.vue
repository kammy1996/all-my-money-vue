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
              :value="amount.value"
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
        { id: '1', name: 'less than 500', value: [0, 500] },
        { id: '2', name: '500 - 2000', value: [500, 2000] },
        { id: '3', name: '2000 - 10000', value: [2000, 10000] },
        { id: '4', name: 'Above 10000', value: [10000, 10000000] },
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
    filterAmounts(newFilters) {
      var newArray = Array.prototype.concat.apply([], newFilters.amount);
      let uniqueArr = [...new Set(newArray)];
      let min = Math.min(...uniqueArr);
      let max = Math.max(...uniqueArr);
      let amount = [min, max];
      return amount;
    },
    cleanFiltersAndCheck() {
      //Creating a deep copy of Filters
      let newFilters = JSON.parse(JSON.stringify(this.filters));

      //Delete keys which are empty array
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key] && newFilters[key].length < 1)
          delete newFilters[key];
      });

      //Making new Amount filter if filtered by Amount
      if (newFilters.amount) {
        newFilters.amount = this.filterAmounts(newFilters);
      }

      if (Object.keys(newFilters).length == 0) {
        this.$store.commit(`records/SET_IS_RECORDS_FILTERED`, false);
        bus.$emit('getAllRecords');
      } else {
        this.$store.commit(`records/SET_IS_RECORDS_FILTERED`, true);
        if (this.isRecordsFiltered) this.getFilteredRecords(newFilters);
      }
    },
    getFilteredRecords(newFilters) {
      let perPage = this.recordOptions.itemsPerPage;
      let page = this.recordOptions.page;

      let queryString = Object.keys(newFilters)
        .map((key) => key + '=' + newFilters[key])
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
      this.$store.commit(`records/GO_TO_FIRST_PAGE_FOR_FILTER`);
      this.filters = {};
      bus.$emit(`filtersResetted`)
    },
  },
};
</script>
