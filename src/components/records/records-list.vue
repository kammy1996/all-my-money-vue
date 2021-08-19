<template>
  <div class="mt-3">
    <v-card dense>
      <div class="row pl-5 mb-1">
        <div class="col-md-8">
          <h3 class="settings-title mb-3 ml-5 pt-5">YOUR RECORDS</h3>
        </div>
        <div class="col-md-3 ml-15 mt-2">
          <template class="">
            <v-select
              :items="customSortings"
              @change="getRecords"
              v-model="customSort"
              item-text="type"
              item-value="value"
              dense
              label="Sort By."
              outlined
            ></v-select>
        </template>
        </div>
      </div>
      <v-data-table
        :headers="headers"
        :items="records"
        :options.sync="recordOptions"
        :server-items-length="totalRecords"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.date="{ item }">
          {{ item.date | recordDate }}
        </template>
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
          <v-menu
            bottom
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
           
              
                <v-icon v-bind="attrs"
                v-on="on"  class="mr-2" >
                  mdi-dots-vertical
                </v-icon>
            </template>
            <v-list>
              <v-list-item class="my-n1 cursor-pointer ">
                <v-list-item-title @click="editRecord(item)"><v-icon small
                   >
                  mdi-pencil
                </v-icon> Edit</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="my-n1 cursor-pointer">
                <v-list-item-title @click="openRecordDetailsDialog(item)"  ><v-icon small
                   >
                  mdi-information
                </v-icon> Details</v-list-item-title>
              </v-list-item >
              <v-divider></v-divider>
              <v-list-item  class="my-n1 cursor-pointer">
                <v-list-item-title @click="removeRecord(item)"><v-icon small
                   >
                  mdi-delete
                </v-icon> Delete</v-list-item-title>
              </v-list-item>
            </v-list> 
          </v-menu>
        </template>
      </v-data-table>
       <BooleanDialog
        :dialog="deleteDialog"
        :name="record.source"
        :type="'Record'"
        @confirmed="deleteRecord"
        @toggleDialog="deleteDialog = !deleteDialog"
        @cancelled="deleteDialog = false"
      > </BooleanDialog>

      <RecordDetails
        :dialog="recordDetailsDialog"
        :record="record"
        @toggleDialog="recordDetailsDialog = !recordDetailsDialog"
        :accounts="accounts"
        :categories="categories"
        :labels="labels"
        >
      </RecordDetails>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import BooleanDialog from '@/components/common/boolean-dialog';
import RecordDetails from '@/components/records/record-details';
import moment from 'moment';

export default {
  name: 'RecordsList',
  data() {
    return {
      checkbox: false,
        customSortings:[
        {
          type : 'Date (Newest Records)',
          value: '-1'
        }, {
          type : 'Date (Oldest Records)',
          value: '1'
        }
      ],
      customSort:"-1",
      recordOptions:{},
      headers: [
        {
          text: 'Date',
          value: 'date',
          sortable: false
        },
        {
          text: 'Source',
          value: 'source',
          sortable: false
        },
        { text: 'Account', value: 'account',sortable: false },
        { text: 'Category', value: 'category',sortable: false },
        { text: 'Label', value: 'label',sortable: false },
        { text: 'Amount', value: 'amount', sortable: false},
        { text: 'Action', value: 'action', sortable: false },
      ],
      singleSelect: false,
      selected: false,  
      deleteDialog:false,
      recordDetailsDialog : false
    };
  },
  watch: { 
    recordOptions: {
      handler () {
        this.getTotalRecords();
        this.getRecords()
      },
      deep: true,
    },
  },

  filters : { 
    recordDate(val) {
      return moment(val).format('D MMM')
    }
  },
  methods: {
    getTotalRecords() { 
      this.$store.dispatch(`records/GET_TOTAL_RECORDS`) 
    },
    getRecords() { 
       let order = this.customSort;
       let itemsPerPage = this.recordOptions.itemsPerPage;
       let page  = this.recordOptions.page;
      
       this.$store.dispatch(`records/GET_RECORDS`, {itemsPerPage, page,order})
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
    editRecord(record) {
      this.$store.commit(`records/TOGGLE_RECORD_DIALOG`, true);
      this.$store.commit('records/SET_EXISTING_RECORD_VALUES',record);
      this.$store.commit('records/SET_RECORD_STATE','update');
    },
    removeRecord(record) {
      this.deleteDialog = true;
      this.$store.commit(`records/SET_RECORD_INFO_TO_DELETE`,record);
    },
    openRecordDetailsDialog(record) { 
      this.recordDetailsDialog = true;
      this.$store.commit('records/SET_EXISTING_RECORD_VALUES',record);
    },
    deleteRecord() {
      if(this.record.id && this.record.source) { 
        this.$store.dispatch(`records/DELETE_RECORD`, this.record.id)
        .then(() => { 
          let snackBar = { 
              show:true,
              text:`${this.record.source} has been Sucessfully Deleted`,
              color:`green`
            } 
          this.$store.commit(`general/SHOW_SNACKBAR`, snackBar)
          this.getTotalRecords(); 
          this.deleteDialog = false;
        })
      }
    },
  },
  computed: {
    ...mapGetters({
      records: 'records/GET_RECORDS',
      accounts: 'records/GET_ACCOUNTS',
      categories: 'records/GET_CATEGORIES',
      labels: 'records/GET_LABELS',
    }),
    ...mapState(`records`,['record','totalRecords'])
  },
  components: { 
    BooleanDialog,
    RecordDetails
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
