<template>
  <div>
    <v-card>
      <h3 class=" mb-3 ml-5 pt-5">ACCOUNTS</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">
        <p>Add a New Account</p>
        <v-btn rounded color="success" @click="addAccount">
          <v-icon class="mr-2" small>mdi-bank</v-icon> Add Account
        </v-btn>
        <v-dialog v-model="accountDialog" width="500">
          <v-card>
            <h2 class="px-5 py-3 ">Add Account</h2>
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
                            v-if="account"
                            class="mr-1"
                            :color="account.color"
                            >mdi-circle</v-icon
                          >
                          <v-icon v-else class="mr-1">mdi-palette</v-icon>
                          Pick Color
                        </v-btn>
                      </template>
                      <v-color-picker
                        @update:color="setAccountColor"
                        dot-size="25"
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
                      v-model="account.balance"
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
          <template  v-slot:item.balance="{ item }">
            <v-icon small v-if="item.balance">
              {{ item.currency }}
            </v-icon>
            {{ item.balance }}
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
       <BooleanDialog
          :dialog="deleteDialog"
          :name="account.name"
          :type="'Account'"
          @confirmed="deleteAccount"
          @cancelled="deleteDialog = false"
        > </BooleanDialog>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import BooleanDialog from '@/components/common/boolean-dialog';

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
  components: {
    BooleanDialog  
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
    setAccountColor(val) { 
      this.$set(this.account,'color',val.hex);
    },
    getAllAccounts() { 
      this.$store.dispatch(`records/GET_ALL_ACCOUNTS`)
    },
    typeIcon(val) {
      const selectedType = this.accountTypes.filter((type) => type.name == val);
      if(selectedType.length) return selectedType[0].icon;
    },
    closeAccountDialog() {
      this.accountDialog = false;
    },
    editAccount(account) {
      this.accountState = 'update';
      this.accountDialog = true;

      const { name, color, type, balance, currency, id} = account;
      this.account.name = name;
      this.account.color = color;
      this.account.type = type ; 
      this.account.balance = balance;
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
        let snackbar = { 
          show:true,
          color:'green',
          text:`Account ${this.account.name} has been Sucessfully Deleted`
        }
        this.$store.commit(`general/SHOW_SNACKBAR`,snackbar);
      })
    },
    updateAccount() {     
      this.$refs[`account`].validate();
      if(this.formValid && this.accountState =='update') { 
        this.$store.dispatch(`records/UPDATE_ACCOUNT`, this.account)
        .then((res) => { 
          this.accountDialog = false;
          this.$refs.account.reset();
          this.account = {};
          let snackbar = { 
            show:true,
            color:'green',
            text:`Account ${res.name} has been Sucessfully Updated`
          }
        this.$store.commit(`general/SHOW_SNACKBAR`,snackbar);
        })
      }
    },
    addAccount(){
      this.account= {};
      this.accountState="create";
      this.accountDialog = true;
    },
    getAccountTypeIcon(type) { 
      return this.accountTypes.filter(t => t.name == type )[0].icon;
    },
    saveAccount() {
      if(this.account && !this.account.color) this.account.color= '#ffff';
      if(this.account.type) this.account.typeIcon = this.getAccountTypeIcon(this.account.type)
      this.$refs[`account`].validate();
      if (this.formValid) {
        this.$store
          .dispatch(`records/ADD_ACCOUNT`, this.account)
          .then((res) => {
            let snackbar = { 
              show:true,
              color:'green',
              text:`Account ${res.name} has been Sucessfully Added`
            }
            this.$store.commit(`general/SHOW_SNACKBAR`,snackbar);
            this.accountDialog = false;     
            this.$refs.account.reset();
            this.account = {};
            
          })
      }
    },
  },
};
</script>

<style>


.v-data-table-header {
  background: rgba(0, 0, 0, 0.03);
}
</style>
