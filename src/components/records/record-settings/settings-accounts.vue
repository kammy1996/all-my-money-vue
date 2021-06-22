<template>
  <div>
    <v-card>
      <h3 class="settings-title mb-3 ml-5 pt-5">ACCOUNTS</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">    
        <p>Add a New Account</p>
        <v-btn rounded color="success" @click="accountDialog = true" > 
        <v-icon  class="mr-2" small>mdi-bank</v-icon> Add Account
        </v-btn>
         <v-dialog
            v-model="accountDialog"
            width="500"
          >
            <v-card>
                <h2 class="px-5 py-3 settings-title">Add Account</h2>
                <v-divider></v-divider>
                <div class="space-20"></div>
                <div class="pa-5">
                  <div class="row">
                    <div class="col-md-7">
                      <v-text-field   
                          v-model="account.name"
                          label="Account Name"
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
                                <v-icon v-if="account.color" class="mr-1" :color="account.color.hex" >mdi-circle</v-icon> 
                                <v-icon v-else class="mr-1"  >mdi-palette</v-icon> 
                                Pick Color
                              </v-btn>
                            </template>
                            <v-color-picker
                            v-model="account.color"
                            dot-size="25"
                            swatches-max-height="200"
                          ></v-color-picker>
                        </v-menu>
                    </div>
                </div>
              <v-select
                outlined    
                v-model="account.type"
                :items="items"
                item-text="name"
                label="Account Type"
                dense
                >
                
                <template v-slot:item="{ item }">
                  <p>
                  <v-icon > {{ item.icon }} </v-icon>
                  {{ item.name }} </p>
                </template>
                </v-select>

                <div class="row">
                    <div class="col-md-8">
                      <v-text-field   
                          v-model="account.name"
                          label="Starting Amount"
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
                          :items="items"
                          item-text="name"
                          dense
                          >
                        </v-select>
                    </div>
                </div>
                  <div class="space-20"></div>
                 <div class="text-center">
                    <v-btn class="mr-5 px-10" @click="closeAccountDialog"  large color="rgba(0,0,0,0.8)" dark
                      >Cancel</v-btn
                    >
                    <v-btn class="px-12" large color="success">Save</v-btn>
                  </div>
              </div>
            </v-card>
          </v-dialog>
      </div>
      <v-divider class="mb-5 "></v-divider>
      <div class="your-categories ml-5">
      <b>Your Accounts</b>
      <div class="space-20"></div>
        <v-data-table
          :headers="headers"
          :items="accounts"
        >
          <template v-slot:item.name="{ item }">
              <v-avatar class="mt-n1" size="10" :color="item.color"></v-avatar>
              {{item.name}}
          </template>
          <template v-slot:item.type="{ item }">
              <v-icon small >
                {{item.typeIcon}}
              </v-icon> {{item.type}}
          </template>
          <template v-slot:item.balance="{ item }">
              <v-icon small >
                {{item.currency}}
              </v-icon> {{item.balance}}
          </template>
           <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name:"SettingsAccounts",
  data() {
    return { 
      account: {},  
       items: [
        {
          name:'General',
          icon:'mdi-wallet'
        }, 
        {
          name:'Cash',
          icon:'mdi-cash'
        },
        {
          name:'Credit Card',
          icon:'mdi-credit-card'
        }, 
        {
          name:'Savings Account',
          icon:'mdi-bank'
        }
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
          { text: 'Action', value: 'action',sortable: false}
        ],
      accounts: [
        {
          name: 'ICICI Bank',
          type:"General",
          typeIcon:'mdi-wallet',
          color:'green',
          balance: 159, 
          currency:"mdi-currency-inr",
          'last-updated': '15-june-2015',
        },
      ],
      accountDialog:false,
    }
  },
  methods: { 
    closeAccountDialog() {
      this.accountDialog = false;
    }
  }
}
</script>

<style >
  .settings-title { 
    color: rgba(0,0,0,0.7);
  }

  .v-data-table-header { 
    background:rgba(0,0,0,0.03)
  }


</style>