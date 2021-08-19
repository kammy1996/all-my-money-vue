<template>
  <div>
    <div class="space-20"></div>
    <div class="container">
      <p v-if="recordType == 'income'" class="income-style">
        <v-icon color="green">mdi-file-document</v-icon> Income Details
      </p>
      <p center v-else class="expense-style ">
        <v-icon color="red">mdi-file-document</v-icon> Expense Details
      </p>
      <v-divider></v-divider>
      <div class="space-30"></div>
      
      <v-form ref="record" v-model="recordValid">
      <div class="row">
          <div class="col-md-6">
            <v-text-field
              :label="recordText"
              :rules="[(v) => !!v || 'Source is required']"
              v-model="record.source"
              :color="recordType == 'income' ? 'success' : 'red'"
              filled
              dense
            ></v-text-field>
            <div class="row">
              <div class="col-md-6">
                <v-select
                  :items="accounts"
                  item-value="id"
                  :rules="[(v) => !!v || 'Account is required']"
                  v-model="record.account"
                  item-text="name"
                  label="Account"
                  dense
                  :color="recordType == 'income' ? 'success' : 'red'"
                  prepend-icon="mdi-bank"
                  filled
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-menu
                  ref="menu"
                  v-model="recordDate.menu"
                 
                  :close-on-content-click="false"
                  :return-value.sync="record.date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="record.date"
                      label="Select Date"
                      :rules="[(v) => !!v || 'Record Date is required']"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      :color="recordType == 'income' ? 'success' : 'red'"
                      filled
                      dense
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="recordDate.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="recordDate.menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(recordDate.date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <v-text-field
                  label="Amount"
                  v-model="record.amount"
                   :rules="[(v) => !!v || 'Amount is required']"
                  type="number"
                  :prepend-icon="
                    recordType == 'income' ? 'mdi-plus' : 'mdi-minus'
                  "
                  :color="recordType == 'income' ? 'success' : 'red'"
                  filled
                  dense
                ></v-text-field>
              </div>
            </div>
          </div>
          <v-divider class="ma-5" inset vertical></v-divider>
          <div class="col-md-5">
            <div class="row">
              <div class="col-md-6">
                <v-select
                  :items="categories"
                  v-model="record.category"
                  item-text="name"
                  item-value="id"
                  label="Select Category"
                  dense
                  :color="recordType == 'income' ? 'success' : 'red'"
                  filled
                  prepend-icon="mdi-shape"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-select
                  :items="labels"
                  v-model="record.label"
                  item-text="name"
                  item-value="id"
                  label="Select Label"
                  dense
                  :color="recordType == 'income' ? 'success' : 'red'"
                  filled
                  prepend-icon="mdi-label"
                ></v-select>
              </div>
            </div>
            <div class="space-30"></div>
            <v-textarea
              outlined
              v-model="record.note"
              name="input-7-4"
              label="Note"
              rows="3"
              :color="recordType == 'income' ? 'success' : 'red'"
              filled
            ></v-textarea>
          </div>
      </div>
      </v-form>
      <div class="space-50"></div>
      <div class="text-center">
        <v-btn class="mr-5 px-10" @click="closeRecordDialog"  large color="rgba(0,0,0,0.8)" dark
          >Cancel</v-btn
        >
        <v-btn v-if="recordState=='create'" class="px-12" @click="saveRecord" large color="success">Save</v-btn>
        <v-btn v-else class="px-12" @click="updateRecord" large color="success">Update</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex'; 

export default {
  name: 'RecordIncomeExpense',
  data() {
    return {
      recordDate: {},
      recordValid:false,
    };
  },
  watch : { 
    recordState() { 
       if(this.recordState != 'update') { 
        this.$refs.record.reset()
        this.$refs.record.resetValidation()
      }
    }
  },

  computed: {
    ...mapGetters({ 
      accounts: `records/GET_ACCOUNTS`,
      categories: `records/GET_CATEGORIES`,
      labels: `records/GET_LABELS`,
    }),
    ...mapState(`records`,['recordState','record']),
    recordText() {
      if (this.recordType == 'income') return 'Source of Income';
      else return 'Where did you Spend';
    },
  },
  props: {
    recordType: String,
  },
  methods: {
    closeRecordDialog() {
      this.$emit("closeRecordDialog");
    },
    saveRecord() { 
      this.$refs.record.validate();
      if(this.recordValid) { 
        this.$store.commit(`records/SET_RECORD_TYPE`, this.recordType)
        this.$store.dispatch(`records/ADD_RECORD`,this.record)
        .then((res) => { 
          let snackBar = { 
            show:true,
            text:`${res.source} has been added to the ${res.type} Records `,
            color:`green`
          } 
          this.$store.commit(`general/SHOW_SNACKBAR`, snackBar) 
          this.$store.dispatch(`records/GET_TOTAL_RECORDS`)
          this.closeRecordDialog()

        })
      }
    },
    updateRecord() {
      this.$refs.record.validate();
      if(this.recordValid) {   
        this.$store.commit(`records/SET_RECORD_TYPE`, this.recordType)
        this.$store.dispatch(`records/UPDATE_RECORD`, this.record)
        .then((res) => { 
          let snackBar = { 
            show:true,
            text:`${res.type} ${res.source} has been successfully updated`,
            color:`green`
          } 
          this.$store.commit(`general/SHOW_SNACKBAR`, snackBar)
          this.closeRecordDialog();
        })
      }
    }
  }
};
</script>>
