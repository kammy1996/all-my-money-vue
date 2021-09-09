<template>
  <div style="display:inline-block">
    <v-dialog
      fullscreen
      v-model="addSubscription"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" v-bind="attrs" v-on="on" rounded block
          ><v-icon>mdi-plus</v-icon> Subscription</v-btn
        >
      </template>
      <v-card>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="addSubscription = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Subscription</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <div class="add-subscription-form mt-15">
          <div class="container">
            <v-form v-model="isFormValid" ref="subscription">
              <div class="subscription-title mb-5">
                <h2>Add New Subscription</h2>
                <span 
                  >Please fill all the * required information to create a new
                  subscription</span
                >
              </div>
              <v-divider></v-divider>
              <div class="row mt-5">
                <div class="col-md-6 right-border">
                  <div class="row">
                    <div class="col-md-2">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            text
                          >
                            <v-icon v-if="subscription.icon" class="mr-1">{{
                              subscription.icon
                            }}</v-icon>
                            <v-icon v-else class="mr-1">mdi-label</v-icon>
                            Icon
                          </v-btn>
                        </template>
                        <v-card width="300x" height="300px">
                          <div class="flex-container">
                            <div
                              @click="iconSelected(icon)"
                              class="icon cursor-pointer"
                              v-for="(icon, index) in mdiIcons"
                              :key="index"
                            >
                              <v-icon>mdi-{{ icon }}</v-icon>
                            </div>
                          </div>
                        </v-card>
                      </v-menu>
                    </div>
                    <div class="col-md-10">
                      <v-text-field 
                        :rules="[(v) => !!v || 'Subscription Name is required']"
                        outlined dense label="Subscription Name">
                      </v-text-field>
                    </div>
                  </div>

                  <v-select
                    prepend-icon="mdi-shape"
                    v-model="subscription.categories"
                    :items="categories"
                    item-text="name"
                    :rules="[(v) => !!v && v.length > 0 || 'Subscription Category is required']"
                    item-value="value"
                    dense
                    clearable
                    solo
                    class="mb-5"
                    attach
                    chips
                    label="Subscription Category"
                    multiple
                  ></v-select>

                  <div class="row mt-n5">
                    <div class="col-md-6">
                      <v-menu
                        v-model="subscriptionDate.menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="subscriptionDate.actualDate"
                            label="Subscription Due Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            :rules="[(v) => !!v || 'Subscription Date is required']"
                            outlined
                            clearable
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="subscriptionDate.actualDate"
                          @input="subscriptionDate.menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                    <div class="col-md-6">
                      <v-select
                        prepend-icon="mdi-bank"
                        v-model="subscription.account"
                        :items="accounts"
                        item-text="name"
                         :rules="[(v) => !!v || 'Subscription Account is required']"
                        item-value="value"
                        dense
                        clearable
                        outlined
                        class="mb-5"
                        label="Subscription Account"
                      ></v-select>
                    </div>
                  </div>

                  <div class="row mt-n10">
                    <div class="col-md-6">
                      <v-select
                        prepend-icon="mdi-calendar-refresh-outline"
                        v-model="subscription.paymentFrequency"
                        :items="paymentFrequencies"
                        item-text="name"
                        item-value="value"
                        dense
                         :rules="[(v) => !!v || 'Subscription frequency is required']"
                        clearable
                        outlined
                        class="mb-5"
                        label="Payment Frequency"
                      ></v-select>
                    </div>
                    <div class="col-md-6">
                      <v-text-field
                        clearable
                        type="number"
                        prepend-icon="mdi-currency-inr"
                        outlined
                         :rules="[(v) => !!v || 'Subscription Amount is required']"
                        dense
                        label="Amount"
                      >
                      </v-text-field>
                    </div>
                  </div>
                  <v-icon></v-icon>
                </div>

                <div class="col-md-6 pl-10">
                  <div class="payment-notification">
                    <v-switch
                      v-model="isPaymentNofitication"
                      label="Notify for Payment"
                    >
                    <template v-slot:label>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          Payment Notifications 
                          <v-icon
                            color="primary"
                            dark
                            class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-information
                          </v-icon>
                        </template>
                        <span>Configure custom notification with Due Date on your Subscriptions</span>
                      </v-tooltip>
                    </template>
                    </v-switch>
                    
                    <div
                      class="notifications mt-n5"
                      v-if="isPaymentNofitication"
                    >
                      <v-checkbox
                        hide-details
                        v-model="subscription.notification.isDueDateRemind"
                        label="I want to get reminded on the Due date of this Subscription."
                      ></v-checkbox>

                      <div class="row">
                        <div class="col-md-5 ">
                          <v-checkbox
                            hide-details
                            v-model="subscription.notification.beforeDueDate"
                            label="I want to get reminded "
                          ></v-checkbox>
                        </div>
                        <div class="col-md-2 mt-2 ml-n10">
                          <v-text-field
                            single-line
                            type="number"
                            :rules="[(v) => subscription.notification.beforeDueDate && !!v || 'Days is required']"
                            hide-details
                            v-model="subscription.notification.beforeDueDays"
                            flat
                            outlined
                            label="Days"
                            dense
                          >

                          </v-text-field>
                        </div>
                        <div class="col-md-5 mt-4 ml-n3">
                          <span style="opacity:0.7">
                            before the Due Date.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="subscription-note mt-5">
                    <v-textarea
                      outlined  
                      hide-details
                      dense
                      label="Note"
                      rows="3"
                    ></v-textarea>
                  </div>
              
                </div>
              </div>
              <div class="space-30"></div>
              <div class="text-center">
                <v-btn class="mr-5 px-10" @click="closeSubscriptionDialog"  large color="rgba(0,0,0,0.8)" dark
                  >Cancel</v-btn
                >
                <v-btn v-if="subscriptionState=='create'" class="px-12" @click="saveSubscription" large color="success">Save</v-btn>
                <v-btn v-else class="px-12" @click="updateSubscription" large color="success">Update</v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import icons from '@/assets/icons';
import {mapGetters} from 'vuex';

export default {
  name: 'AddSubscription',
  data() {
    return {
      addSubscription: false,
      isFormValid: false,
      mdiIcons: icons,
      subscriptionDate: {
        menu: false,
        actualDate: '',
      },

      isPaymentNofitication: false,
      subscription: {
        name: '',
        icon: '',
        categories: [],
        isNotification: false,
        notification: {
        },
      },
      subscriptionState:'create',
      categories: [
        { name: 'Entertainment', value: 'entertainment' },
        { name: 'Music', value: 'music' },
        { name: 'work', value: 'work' },
      ],
      paymentFrequencies: [
        { name: 'Monthly', value: 'monthly' },
        { name: 'Quaterly', value: 'quaterly' },
        { name: 'Yearly', value: 'yearly' },
      ],
    };
  },
  computed: { 
    ...mapGetters({
      accounts: 'records/GET_ACCOUNTS' 
    })
  },
  methods: { 
    saveSubscription() { 
      this.$refs.subscription.validate();
    },
    closeSubscriptionDialog() {
      this.$refs.subscription.reset();
      this.addSubscription = false;
    },
    updateSubscription() { 

    }
  }
};
</script>

<style scoped>
.right-border {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 30px 0px 0px;
}
</style>
