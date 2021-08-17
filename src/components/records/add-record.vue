<template>
  <div >
    <v-dialog
      v-model="recordDialog"
      fullscreen
      hide-overlay
      
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        
      <v-btn color="success" @click="openRecordDialog" v-bind="attrs"
        v-on="on" rounded block ><v-icon>mdi-plus</v-icon> Add Record</v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="closeRecordDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Record</v-toolbar-title>
          
        </v-toolbar>
         <router-view></router-view>
        <div class="space-30"></div>
          
          <v-tabs
          centered
          v-model="recordType"
          icons-and-text
          style="border"
          class="ma-50"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab 
            href="#income">
            Income
            <v-icon>mdi-plus</v-icon>
          </v-tab>

          <v-tab  
            href="#expense">
            Expense
            <v-icon>mdi-minus</v-icon>
          </v-tab>

          <v-tab 
             href="#transfer">
            Transfer  
            <v-icon>mdi-import</v-icon>
          </v-tab>

          <v-tab-item id="income">
            <record-income-expense
              :recordType="recordType"
              @closeRecordDialog="closeRecordDialog"
             > 
            </record-income-expense>
          </v-tab-item>
          <v-tab-item id="expense" >
            <record-income-expense
              :recordType="recordType"
              @closeRecordDialog="closeRecordDialog"
             > 
            </record-income-expense>
          </v-tab-item>
          <v-tab-item id="transfer">
            transfer
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import RecordIncomeExpense from './record-income-expense';
import { mapState } from 'vuex';

export default {
  name:'AddRecord',
  data() {
    return {    
      recordType:'',
    }
  },
  watch: { 
    recordState() { 
      if(this.recordState == 'update') { 
        this.recordType = this.record.type;
        
      }
    }
  },
  computed: { 
    recordDialog :  {
      get() { 
        return this.$store.state.records.isRecordDialog;
      },
      set(val) { 
        this.$store.commit(`records/TOGGLE_RECORD_DIALOG`,val)
      }
    },
    ...mapState(`records`,['record','recordState'])
  },
  components: {
    RecordIncomeExpense
  },
  methods: {
   openRecordDialog() { 
      this.$store.commit('records/SET_RECORD_STATE','create');
    },
    closeRecordDialog() { 
      this.recordType = '';
      this.$store.commit('records/SET_RECORD_STATE','');
      this.$store.commit(`records/RESET_RECORD_VALUES`)
      this.recordDialog = false;
    }
  }
}
</script>