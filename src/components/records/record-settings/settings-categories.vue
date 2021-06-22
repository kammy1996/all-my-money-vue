<template>
  <div>
    <v-card>
      <h3 class="settings-title mb-3 ml-5 pt-5">CATEGORIES</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">    
        <p>Add a New Category</p>
        <v-btn @click="categoryDialog = true" rounded color="success" > 
        <v-icon class="mr-2" small>mdi-shape</v-icon> Add Category
        </v-btn>
        <v-dialog
            v-model="categoryDialog"
            width="500"
          >
            <v-card>
                <h2 class="px-5 py-3 settings-title">Add Category</h2>
                <v-divider></v-divider>
                <div class="space-20"></div>
                <div class="pa-5">
                  <div class="row">
                    <div class="col-md-7">
                      <v-text-field   
                          v-model="category.name"
                          label="Category Name"
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
                                <v-icon v-if="category.icon" class="mr-1">{{ category.icon }}</v-icon> 
                                <v-icon v-else class="mr-1" >mdi-label</v-icon> 
                                Pick Icon
                              </v-btn>
                            </template>
                            <v-card width="300x" height="300px">
                                <div class="flex-container">
                                  <div @click="iconSelected(icon)" class="icon cursor-pointer" v-for="(icon,index) in mdiIcons" :key="index" >
                                      <v-icon  >mdi-{{icon}}</v-icon>
                                  </div>
                                </div>
                            </v-card>
                           
                        </v-menu>
                    </div>
                </div>
             
                <div class="space-20"></div>
                 <div class="text-center">
                    <v-btn class="mr-5 px-10" @click="closeCategoryDialog"  large color="rgba(0,0,0,0.8)" dark
                      >Cancel</v-btn
                    >
                    <v-btn class="px-12" large color="success">Save</v-btn>
                  </div>
              </div>
            </v-card>
          </v-dialog>
      </div>
      <v-divider class="mb-5 "></v-divider>
      <div class="your-categories">
      <b class="ml-5">Your Categories</b>
      <div class="space-30"></div>
        <v-data-table
          :headers="headers"
          :items="categories"
        >
          <template v-slot:item.name="{ item }">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.name }}
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
import Icons from '@/assets/icons.js'

export default {
  name:"SettingsCategories",
  
  data() {
    return { 
      mdiIcons:[],
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Status', value: 'status' },
          { text: 'Last Updated', value: 'last-updated' },
          { text: 'Action', value: 'action' }
        ],
      categories: [
        {
          name:'Shopping',
          color:'cyan',
          icon:'mdi-shopping',
          status:'Default',
        },
        {
          name:'Food',
          color:'red',
          icon:'mdi-food-fork-drink',
          status:'Default'
        },
        {
          name:'Utilities',
          color:'yellow',
          icon:'mdi-toolbox',
          status:'Default'
        },
        {
          name:'Vehicle',
          color:'purple',
          icon:'mdi-car',
          status:'Default'
        },
        {
          name:'Home Expense',
          color:'cyan',
          icon:'mdi-home',
          status:'Default'
        },

      ],
    category:{},
    categoryDialog:false,
    }
  },
  mounted() {
    this.mdiIcons = Icons;
     
  },
  methods: { 
    closeCategoryDialog() {
      this.categoryDialog = false;
    },
    iconSelected(icon) {
      let mdiIcon = `mdi-${icon}`;
      this.category.icon = mdiIcon
    }
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
</style>