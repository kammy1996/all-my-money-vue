<template>
  <div>
    <v-card>
      <h3 class="settings-title mb-3 ml-5 pt-5">CATEGORIES</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">    
        <p>Add a New Currency</p>
        <v-btn @click="currencyDialog = true" rounded color="success" > 
        <v-icon class="mr-2" small>mdi-currency-inr</v-icon> Add Currency
        </v-btn>
        <v-dialog
            v-model="currencyDialog"
            width="500"
          >
            <v-card>
                <h2 class="px-5 py-3 settings-title">Add Currency</h2>
                <v-divider></v-divider>
                <div class="space-20"></div>
                <div class="pa-5">
                  <div class="px-5">
                      <v-select
                        outlined    
                        v-model="currency.name"
                        :items="currencies"
                        item-text="name"
                        label="Select Currency"
                        dense
                        >
                        
                        <template v-slot:item="{ item }">
                          <p>{{ item.code}} - {{ item['name_plural'] }}</p>
                        </template>
                        </v-select>
                  </div>
             
                <div class="space-20"></div>
                 <div class="text-center">
                    <v-btn class="mr-5 px-10" @click="closeCurrencyDialog"  large color="rgba(0,0,0,0.8)" dark
                      >Cancel</v-btn
                    >
                    <v-btn class="px-12" large color="success">Save</v-btn>
                  </div>
              </div>
            </v-card>
          </v-dialog>
      </div>
      <v-divider class="mb-5 "></v-divider>
      <div class="your-labels">
      <b class="ml-5">Your Labels</b>
      <div class="space-30"></div>
        <v-data-table
          :headers="headers"
          :items="selectedCurrencies"
          
        >
          <template v-slot:item.currency="{ item }">
            <v-icon  >{{ item.icon}} </v-icon>
            {{item.name}}
          </template>
           <template  v-slot:item.action="{ item }">
            <div v-if="item.status != 'Default'">
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
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import Currencies from '@/assets/currencies';

export default {
  name:"SettingsCurrency",
  data() {
    return { 
      mdiIcons:[],
      headers: [
          { text: 'Currency', value: 'currency' },
          { text: 'Status', value: 'status' },
          { text: 'Last Updated', value: 'last-updated' },
          { text: 'Action', value: 'action' }
        ],
     
    currencyDialog:false,
    currencies:[],
    currency:{},
    selectedCurrencies:[
        {
          name:'Indian Rupee',
          icon:'mdi-currency-inr',
          status:'Default',
        }
      ],
    }
  },
  mounted() {
    this.currencies = Currencies
  },
  methods: { 
    closeCurrencyDialog() {
      this.currencyDialog = false;
    },
  }
}
</script>

<style >
  .settings-title { 
    color: rgba(0,0,0,0.7);
    
  }
 .flex-container {
  display: flex;
  flex-wrap: wrap;
  width:500px;
  background: white;  
  padding:10px;
  margin-right:-30px;
}

.flex-container > div {
  background-color: #f1f1f1;
  padding:0px 5px;
  width: 50px;
  margin:3px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}

.default { 
  opacity:0.5;
}

</style>