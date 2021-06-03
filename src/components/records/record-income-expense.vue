<template>
  <div>
    <div class="space-20"></div>
    <div class="container">
      <p v-if="recordType == 'income'" class="record-title">
        <v-icon color="green">mdi-file-document</v-icon> Income Details
      </p>
      <p center v-else class="expense-title ">
        <v-icon color="red">mdi-file-document</v-icon> Expense Details
      </p>
      <v-divider></v-divider>
      <div class="space-30"></div>

      <div class="row">
        <div class="col-md-6">
          <v-text-field
            :label="recordText"
            :color="recordType == 'income' ? 'success' : 'red'"
            filled
            dense
          ></v-text-field>
          <div class="row">
            <div class="col-md-6">
              <v-select
                :items="items"
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
                :return-value.sync="recordDate.date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="recordDate.date"
                    label="Select Date"
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
            <div class="col-md-7">
              <v-text-field
                label="Amount"
                :prepend-icon="
                  recordType == 'income' ? 'mdi-plus' : 'mdi-minus'
                "
                :color="recordType == 'income' ? 'success' : 'red'"
                filled
                dense
              ></v-text-field>
            </div>
            <div class="col-md-5">
              <v-select
                :items="items"
                label="Currency"
                dense
                :color="recordType == 'income' ? 'success' : 'red'"
                filled
                prepend-icon="mdi-currency-inr"
              ></v-select>
            </div>
          </div>
        </div>
        <v-divider class="ma-5" inset vertical></v-divider>
        <div class="col-md-5">
          <div class="row">
            <div class="col-md-6">
              <v-select
                :items="items"
                label="Select Category"
                dense
                :color="recordType == 'income' ? 'success' : 'red'"
                filled
                prepend-icon="mdi-shape"
              ></v-select>
            </div>
            <div class="col-md-6">
              <v-select
                :items="items"
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
            name="input-7-4"
            label="Note"
            rows="3"
            :color="recordType == 'income' ? 'success' : 'red'"
            filled
          ></v-textarea>
        </div>
      </div>
      <div class="space-50"></div>
      <div class="text-center">
        <v-btn class="mr-5 px-10" @click="closeRecordDialog"  large color="rgba(0,0,0,0.8)" dark
          >Cancel</v-btn
        >
        <v-btn class="px-12" large color="success">Save</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecordIncomeExpense',
  data() {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      recordDate: {},
    };
  },
  computed: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.record-title {
  color: rgba(0, 0, 0, 0.5);
  font-size: 22px;
  color: green;
}

.expense-title {
  color: rgba(0, 0, 0, 0.5);
  font-size: 22px;
  color: red;
}
</style>
