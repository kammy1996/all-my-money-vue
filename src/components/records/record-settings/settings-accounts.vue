<template>
  <div>
    <v-card>
      <h3 class="settings-title mb-3 ml-5 pt-5">ACCOUNTS</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">
        <p>Add a New Account</p>
        <v-btn rounded color="success" @click="addAccount">
          <v-icon class="mr-2" small>mdi-bank</v-icon> Add Account
        </v-btn>
        <v-dialog v-model="accountDialog" width="500">
          <v-card>
            <h2 class="px-5 py-3 settings-title">Add Account</h2>
            <v-divider></v-divider>
            <div class="space-20"></div>
            <div class="pa-5">
              <v-form ref="account" v-model="formValid">
                <div class="row">
                  <div class="col-md-7">
                    <v-text-field
                      v-model="account.name"
                      label="Account Name"
                      :rules="[(v) => !!v || 'Account Name is required']"
                      dense
                      outlined
                    ></v-text-field>
                  </div>
                  <div class="col-md-5">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          text
                        >
                          <v-icon
                            v-if="account.color"
                            class="mr-1"
                            :color="accountState == 'create' ? account.color.hex : account.color"
                            >mdi-circle</v-icon
                          >
                          <v-icon v-else class="mr-1">mdi-palette</v-icon>
                          Pick Color
                        </v-btn>
                      </template>
                      <v-color-picker
                        v-model="account.color"
                        dot-size="25"
                        hex
                        swatches-max-height="200"
                      ></v-color-picker>
                    </v-menu>
                  </div>
                </div>
                <v-select
                  outlined
                  v-model="account.type"
                  :items="accountTypes"
                  item-text="name"
                  label="Account Type"
                  :rules="[(v) => !!v || 'Select Account Type']"
                  dense
                >
                  <template v-slot:item="{ item }">
                    <p>
                      <v-icon> {{ item.icon }} </v-icon>
                      {{ item.name }}
                    </p>
                  </template>
                </v-select>

                <div class="row">
                  <div class="col-md-8">
                    <v-text-field
                      v-model="account.startBalance"
                      label="Starting Amount"
                      type="number"
                      dense
                      outlined
                      placeholder="0"
                    ></v-text-field>
                  </div>
                  <div class="col-md-4">
                    <v-select
                      outlined
                      label="Currency"
                      v-model="account.currency"
                      :rules="[(v) => !!v || 'Select Currency']"
                      :items="currencies"
                      item-text="code"
                      item-value="symbol"
                      dense
                    >
                      <template v-slot:item="{ item }">
                        <p>
                          <v-icon size="medium"> {{ item.symbol }} </v-icon>
                          {{ item.code }}
                        </p>
                      </template>
                    </v-select>
                  </div>
                </div>
                <div class="space-20"></div>
                <div class="text-center">
                  <v-btn
                    class="mr-5 px-10"
                    @click="closeAccountDialog"
                    large
                    color="rgba(0,0,0,0.8)"
                    dark
                    >Cancel</v-btn
                  >
                  <v-btn
                    class="px-12"
                    @click="saveAccount"
                    v-if="accountState=='create'"
                    large
                    color="success"
                    >Save</v-btn
                  >
                  <v-btn
                    class="px-12"
                    @click="updateAccount"
                    v-else
                    large
                    color="success"
                    >Update</v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-card>
        </v-dialog>
      </div>
      <v-divider class="mb-5 "></v-divider>
      <div class="your-categories ml-5">
        <b>Your Accounts</b>
        <div class="space-20"></div>
        <v-data-table :headers="headers" :items="accounts">
          <template v-slot:item.name="{ item }">
            <v-avatar class="mt-n1" size="10" :color="item.color"></v-avatar>
            {{ item.name }}
          </template>
          <template v-slot:item.type="{ item }">
            <v-icon small>
              {{ typeIcon(item.type) }}
            </v-icon>
            {{ item.type }}
          </template>
          <template v-slot:item.balance="{ item }">
            <v-icon small>
              {{ item.currency }}
            </v-icon>
            {{ item.startBalance }}
          </template>
          <template v-slot:item.last-updated="{ item }">
            {{ item.lastUpdated | lastUpdated }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editAccount(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="removeAccount(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
       <v-dialog
        v-model="deleteDialog"
        max-width="450"
      >
        <v-card class="pa-5">
          
          <h3>
            Account "{{ account.name }}" will be permanently deleted ? 
          </h3>
          <div class="space-30"></div>
          <v-card-actions >
            <v-spacer></v-spacer>

            <v-btn
              color="grey"
              dark
              @click="deleteDialog = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="red"
              dark
              @click="deleteAccount"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'SettingsAccounts',
  data() {
    return {
      account: {},
      formValid: false,
      deleteDialog:false,
      accountState: '',
      accountTypes: [
        {
          name: 'General',
          icon: 'mdi-wallet',
        },
        {
          name: 'Cash',
          icon: 'mdi-cash',
        },
        {
          name: 'Credit Card',
          icon: 'mdi-credit-card',
        },
        {
          name: 'Savings Account',
          icon: 'mdi-bank',
        },
        {
          name: 'Debit Card',
          icon: 'mdi-credit-card',
        },
        {
          name: 'Current Account',
          icon: 'mdi-bank',
        },
      ],
      headers: [
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        { text: 'Name', value: 'name' },
        { text: 'Balance', value: 'balance' },
        { text: 'Last Updated', value: 'last-updated' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      accountDialog: false,
    };
  },
  mounted() { 
    this.getAllAccounts();
  },
  computed: {
    ...mapGetters('records', {
      currencies: 'GET_CURRENCIES',
      accounts: 'GET_ACCOUNTS',
    }),
  },
  filters: {
    lastUpdated(val) {
      return moment(val).format('DD-MM-YYYY');
    },
  },
  methods: {
    getAllAccounts() { 
      this.$store.dispatch(`records/GET_ALL_ACCOUNTS`)
    },
    typeIcon(val) {
      return this.accountTypes.filter((type) => type.name == val)[0].icon;
    },
    closeAccountDialog() {
      this.accountDialog = false;
    },
    editAccount(account) {
      this.accountState = 'update';
      this.accountDialog = true;

      const { name, color, type, startBalance, currency, id} = account;
      this.account.name = name;
      this.account.color = color;
      this.account.type = type ; 
      this.account.startBalance = startBalance;
      this.account.currency = currency;
      this.account.id = id;
    },
    removeAccount(account) {
      this.account.name = account.name;
      this.account.id = account.id;
      this.deleteDialog = true;
    },  
    deleteAccount() { 
      this.$store.dispatch(`records/DELETE_ACCOUNT`,this.account.id)
      .then(() => { 
        this.deleteDialog = false
      })
    },
    updateAccount() {     
      this.$refs[`account`].validate();
      if(this.formValid && this.accountState =='update') { 
        this.$store.dispatch(`records/UPDATE_ACCOUNT`, { 
         account:this.account
        })
        .then(() => { 
          this.accountDialog = false;
          this.account = {};
          this.$refs[`account`].reset();
        })
      }
    },
    addAccount(){
      this.account = {};
      this.accountState="create";
      this.accountDialog = true;
    },
    saveAccount() {
      if (this.account.color && this.account.color.hex) {
        this.account.color = this.account.color.hex;
      }
      this.$refs[`account`].validate();
      if (this.formValid) {
        this.$store
          .dispatch(`records/ADD_ACCOUNT`, {
            account: this.account,
          })
          .then(() => {
            this.accountDialog = false;
          })
      }
    },
  },
};
</script>

<style>
.settings-title {
  color: rgba(0, 0, 0, 0.7);
}

.v-data-table-header {
  background: rgba(0, 0, 0, 0.03);
}
</style>
