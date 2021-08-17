<template>
  <div>
    <v-card dense>
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
        class="elevation-1"
      >
        <template v-slot:item.account="{ item }">
          <v-icon size="medium">
            {{ getDependentDetails(item.account, 'account', 'typeIcon') }}
          </v-icon>
          {{ getDependentDetails(item.account, 'account', 'name') }}
        </template>
        <template v-slot:item.category="{ item }">
          <v-icon size="medium">
            {{ getDependentDetails(item.category, 'category', 'icon') }}
          </v-icon>
          {{ getDependentDetails(item.category, 'category', 'name') }}
        </template>
        <template v-slot:item.label="{ item }">
          <v-avatar
            class="mt-n1"
            size="10"
            :color="getDependentDetails(item.label, 'label', 'color')"
          ></v-avatar>
          {{ getDependentDetails(item.label, 'label', 'name') }}
        </template>
        <template v-slot:item.amount="{ item }">
          <b>
            <p class="mt-3" style="color:green" v-if="item.type == 'income'">
              +
              <v-icon color="green" size="medium">mdi-currency-inr </v-icon>
              {{ item.amount }}
            </p>
            <p
              class="mt-3"
              style="color:red"
              v-else-if="item.type == 'expense'"
            >
              -
              <v-icon color="red" size="medium">mdi-currency-inr </v-icon>
              {{ item.amount }}
            </p>
          </b>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editRecord(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="removeRecord(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
       <BooleanDialog
        :dialog="deleteDialog"
        :name="record.source"
        :type="'Record'"
        @confirmed="deleteRecord"
        @cancelled="deleteDialog = false"
      > </BooleanDialog>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import BooleanDialog from '@/components/common/boolean-dialog';

export default {
  name: 'RecordsList',
  data() {
    return {
      checkbox: false,
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
        { text: 'Action', value: 'action', sortable: false },
      ],
      singleSelect: false,
      selected: false,
      searchRecords: '',   
      deleteDialog:false,
    };
  },
  methods: {
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
    editRecord(record) {
      this.$store.commit(`records/TOGGLE_RECORD_DIALOG`, true);
      this.$store.commit('records/SET_EXISTING_RECORD_VALUES',record);
      this.$store.commit('records/SET_RECORD_STATE','update');
    },
    removeRecord(record) {
      this.deleteDialog = true;
      this.$store.commit(`records/SET_RECORD_INFO_TO_DELETE`,record);
    },
    deleteRecord() {
      this.$store.dispatch(`records/DELETE_RECORD`, this.record.id)
      .then(() => { 
        this.deleteDialog = false;
      })
    },
  },
  computed: {
    ...mapGetters({
      records: 'records/GET_RECORDS',
      accounts: 'records/GET_ACCOUNTS',
      categories: 'records/GET_CATEGORIES',
      labels: 'records/GET_LABELS',
    }),
    ...mapState(`records`,['record'])
  },
  components: { 
    BooleanDialog
  }
};
</script>
<style>
.v-data-table-header {
  background: rgba(0, 0, 0, 0.03);
}
.amount-income {
  color: green;
}
.amount-expense {
  color: red;
}
</style>
