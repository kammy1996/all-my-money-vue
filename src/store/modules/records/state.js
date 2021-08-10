const state = { 
  accounts:[],
  labels:[],
  categories: [
    {
      name:'Shopping',
      icon:'mdi-shopping',
      status:'Default',
    },
    {
      name:'Food',
      icon:'mdi-food-fork-drink',
      status:'Default'
    },
    {
      name:'Utilities',
      icon:'mdi-toolbox',
      status:'Default'
    },
    {
      name:'Vehicle',
      icon:'mdi-car',
      status:'Default'
    },
    {
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