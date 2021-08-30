<template>
  <div class="mt-3">
    <v-card dense>
      <div class="row px-7 ">
        <div class="col-md-6">
          <h3 class="settings-title  ml-5 pt-5">YOUR RECORDS</h3>
        </div>
        <div class="col-md-6">
          <div class="row mt-1">
            <div class="col-md-7">
              <v-text-field
                outlined
                readonly
                @click="openDateDropdown"
                @change="clearCustomDate"
                dense
                prepend-icon="mdi-calendar"
                clearable
                v-model="filterDate.customDateText"
                v-if="filterDate.isCustomDate"
                label="Filter By Date"
              >
              </v-text-field>
              <v-select
                v-if="!filterDate.isCustomDate"
                label="Filter By Date"
                item-text="name"
                clearable
                 prepend-icon="mdi-calendar"
                :disabled="isRecordsFiltered"
                ref="dateDropdown"
                item-value="value"
                :items="filterDateOptions"
                @change="toggleDateOptions"
                v-model="filterDate.dateType"
                dense
                outlined
              ></v-select>
              <v-dialog
                ref="customDateDialog"
                v-model="filterDate.dialog"
                :return-value.sync="filterDate.actualDate"
                persistent
                width="290px"
              >
                <v-date-picker
                  v-model="filterDate.actualDate"
                  scrollable
                  color="blue"
                  range
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="filterDate.dialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="setCustomDate">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </div>
            <div class="col-md-5 ">
              <v-select
                :items="customSortings"
                @change="getRelevantRecords"
                v-model="customSort"
                item-text="type"
                item-value="value"
                :disabled="isRecordsFiltered"
                dense
                label="Sort By."
                outlined
              ></v-select>
            </div>
          </div>
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
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="mr-2">
                mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item class="my-n1 cursor-pointer ">
                <v-list-item-title @click="editRecord(item)"
                  ><v-icon small>
                    mdi-pencil
                  </v-icon>
                  Edit</v-list-item-title
                >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="my-n1 cursor-pointer">
                <v-list-item-title @click="openRecordDetailsDialog(item)"
                  ><v-icon small>
                    mdi-information
                  </v-icon>
                  Details</v-list-item-title
                >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="my-n1 cursor-pointer">
                <v-list-item-title @click="removeRecord(item)"
                  ><v-icon small>
                    mdi-delete
                  </v-icon>
                  Delete</v-list-item-title
                >
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
      >
      </BooleanDialog>

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
import bus from '@/main';

export default {
  name: 'RecordsList',
  data() {
    return {
      checkbox: false,
      customSortings: [
        {
          type: 'Date (Newest Records)',
          value: '-1',
        },
        {
          type: 'Date (Oldest Records)',
          value: '1',
        },
      ],
      filterDateOptions: [
        {
          name: 'Last 7 days',
          value: '7 Days',
        },
        {
          name: 'Last 30 Days',
          value: '30 Days',
        },
        {
          name: 'Last 90 Days',
          value: '90 Days',
        },
        {
          name: 'Custom Range',
          value: 'custom',
        },
      ],
      filterDate: {
        isCustomDate: false,
        customDate: {},
        customDateText: '',
        dialog: false,
        dateType: '',
        actualDate: '',
      },
      recordOptions: {},
      customSort: '-1',
      headers: [
        {
          text: 'Date',
          value: 'date',
          sortable: false,
        },
        {
          text: 'Source',
          value: 'source',
          sortable: false,
        },
        { text: 'Account', value: 'account', sortable: false },
        { text: 'Category', value: 'category', sortable: false },
        { text: 'Label', value: 'label', sortable: false },
        { text: 'Amount', value: 'amount', sortable: false },
        { text: 'Action', value: 'action', sortable: false },
      ],
      singleSelect: false,
      selected: false,
      deleteDialog: false,
      recordDetailsDialog: false,
    };
  },
  watch: {
    recordOptions: {
      handler() {
        this.getRelevantRecords();
      },
      deep: true,
    },
    'filterDate.dateType'(val) { 
      if(val == null) { 
        this.filterDate.customDate = {};
      }
    }
  },
  filters: {
    recordDate(val) {
      return moment(val).format('D MMM');
    },
  },
  mounted() {
    this.$store.commit('records/SET_IS_RECORDS_FILTERED', false);
    bus.$on(`getAllRecords`, () => {
      this.getRecords();
    });
  },
  methods: {
    getRecords() {
      let order = this.customSort;
      let itemsPerPage = this.recordOptions.itemsPerPage;
      let page = this.recordOptions.page;

      this.$store.dispatch(`records/GET_TOTAL_RECORDS`).then(() => {
        this.$store.dispatch(`records/GET_RECORDS`, {
          itemsPerPage,
          page,
          order,
        });
      });
    },
    getRelevantRecords() {
      this.$store.commit(`records/SET_RECORD_OPTIONS`, this.recordOptions);
      if (this.isRecordsFiltered) {
        bus.$emit(`getFilteredRecords`, this.customSort);
      } else {
        if (this.filterDate.customDate.startDate && this.filterDate.customDate.endDate  ) {
          let date = this.filterDate.customDate;
          this.fetchRecordsAsPerDate(date.startDate, date.endDate);
        } else {
          this.getRecords();
        }
      }
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
      this.$store.commit('records/SET_EXISTING_RECORD_VALUES', record);
      this.$store.commit('records/SET_RECORD_STATE', 'update');
    },
    removeRecord(record) {
      this.deleteDialog = true;
      this.$store.commit(`records/SET_RECORD_INFO_TO_DELETE`, record);
    },
    openRecordDetailsDialog(record) {
      this.recordDetailsDialog = true;
      this.$store.commit('records/SET_EXISTING_RECORD_VALUES', record);
    },
    deleteRecord() {
      if (this.record.id && this.record.source) {
        this.$store
          .dispatch(`records/DELETE_RECORD`, this.record.id)
          .then(() => {
            let snackBar = {
              show: true,
              text: `${this.record.source} has been Sucessfully Deleted`,
              color: `green`,
            };
            this.$store.commit(`general/SHOW_SNACKBAR`, snackBar);
            this.getTotalRecords();
            this.deleteDialog = false;
          });
      }
    },
    openDateDropdown() {
      this.filterDate.isCustomDate = false;
      this.$nextTick(() => {
        if(this.filterDate.dateType == 'custom') { 
          this.$refs.dateDropdown.isMenuActive = true;
        }
      });
    },
    clearCustomDate() { 
      if(!this.customDateText) {
        this.filterDate.customDate = {};
        this.getRecords();
      }
    },
    toggleDateOptions() {
      if (this.filterDate.dateType == 'custom') {
        this.filterDate.dialog = true;
      } 
      else if (this.filterDate.dateType) {
        this.createDateRange();
      } 
      else {
        this.getRecords();
      }
    },
    createDateRange() {
      if (this.filterDate.dateType) {
        let startDate;
        let endDate = moment().format('YYYY-MM-DD');

        switch (this.filterDate.dateType) {
          case '7 Days':
            startDate = moment()
              .subtract(7, 'd')
              .format('YYYY-MM-DD');
            break;
          case '30 Days':
            startDate = moment()
              .subtract(30, 'd')
              .format('YYYY-MM-DD');
            break;
          case '90 Days':
            startDate = moment()
              .subtract(90, 'd')
              .format('YYYY-MM-DD');
            break;
        }

        let date = this.filterDate.customDate;
        date.startDate = startDate;
        date.endDate = endDate;
        this.fetchRecordsAsPerDate(date.startDate, date.endDate);
      }
    },
    fetchRecordsAsPerDate(startDate, endDate) {
      let order = this.customSort;
      let perPage = this.recordOptions.itemsPerPage;
      let page = this.recordOptions.page;

      this.$store
        .dispatch(`records/GET_TOTAL_DATE_FILTERED_RECORDS`, {
          startDate,
          endDate,
        })
        .then(() => {
          this.$store.dispatch(`records/GET_DATE_FILTERED_RECORDS`, {
            perPage,
            page,
            order,
            startDate,
            endDate,
          });
        });
    },
    setCustomDate() {
      if (this.filterDate.actualDate && this.filterDate.actualDate.length > 1) {
        this.filterDate.dialog = false;
        this.filterDate.isCustomDate = true;
       
        let dates = this.filterDate.actualDate.map((d) => new Date(d));
        let date = this.filterDate.customDate;
        date.startDate = moment(new Date(Math.min.apply(null, dates))).format(
          `YYYY-MM-DD`
        );
        date.endDate = moment(new Date(Math.max.apply(null, dates))).format(
          `YYYY-MM-DD`
        );

        this.filterDate.customDateText = `${date.startDate} to ${date.endDate}`;
        this.fetchRecordsAsPerDate(date.startDate, date.endDate);
        this.filterDate.dateType = '';
      } else {
        let snackBar = {
          show: true,
          text: `Please select a valid Date Range`,
          color: `red`,
        };
        this.$store.commit(`general/SHOW_SNACKBAR`, snackBar);
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
    ...mapState(`records`, ['record', 'totalRecords', 'isRecordsFiltered']),
  },
  components: {
    BooleanDialog,
    RecordDetails,
  },
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
