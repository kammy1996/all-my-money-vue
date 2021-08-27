const state = { 
  records:[],
  accounts:[],
  recordState:'',
  totalRecords:0,
  recordType:'',
  record: {
    id:'',
    source: '',
    type:'',
    account:'',
    date:'',
    amount:'',
    category:'',
    label:'',
    note:''
  },
  recordOptions:{},
  isRecordsFiltered:false,
  isRecordDialog:false,
  labels:[],
  categories: [
    {
      id:'1',
      name:'Shopping',
      icon:'mdi-shopping',
      status:'Default',
    },
    {
      id:'2',
      name:'Food',
      icon:'mdi-food-fork-drink',
      status:'Default'
    },
    {
      id:'3',
      name:'Utilities',
      icon:'mdi-toolbox',
      status:'Default'
    },
    {
      id:'4',
      name:'Vehicle',
      icon:'mdi-car',
      status:'Default'
    },
    {
      id:'5',
      name:'Home Expense',
      icon:'mdi-home',
      status:'Default'
    },

  ],
  currencies : [
      {
      "symbol": "mdi-currency-inr",
      "name": "Indian Rupee",
      "symbol_native": "টকা",
      "decimal_digits": 2,
      "rounding": 0,
      "code": "INR",
      "name_plural": "Indian rupees"
    },
  ],
}

export default state;