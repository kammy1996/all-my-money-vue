<template>
  <div>
    <v-card>
      <h3 class=" mb-3 ml-5 pt-5">CATEGORIES</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">
        <p>Add a New Category</p>
        <v-btn @click="addCategory" rounded color="success">
          <v-icon class="mr-2" small>mdi-shape</v-icon> Add Category
        </v-btn>
        <v-dialog v-model="categoryDialog" width="500">
          <v-card>
            <h2 class="px-5 py-3 ">Add Category</h2>
            <v-divider></v-divider>
            <div class="space-20"></div>
            <div class="pa-5">
              <v-form ref="category" v-model="categoryValid">
                <div class="row">
                  <div class="col-md-7">
                    <v-text-field
                      v-model="category.name"
                      label="Category Name"
                      :rules="[(v) => !!v || 'Category Name is required']"
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
                          <v-icon v-if="category.icon" class="mr-1">{{
                            category.icon
                          }}</v-icon>
                          <v-icon v-else class="mr-1">mdi-label</v-icon>
                          Pick Icon
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
                </div>
              </v-form>

              <div class="space-20"></div>
              <div class="text-center">
                <v-btn
                  class="mr-5 px-10"
                  @click="closeCategoryDialog"
                  large
                  color="rgba(0,0,0,0.8)"
                  dark
                  >Cancel</v-btn
                >
                <v-btn
                  class="px-12"
                  @click="saveCategory"
                  v-if="categoryState == 'create'"
                  large
                  color="success"
                  >Save</v-btn
                >
                <v-btn
                  class="px-12"
                  @click="updateCategory"
                  v-else
                  large
                  color="success"
                  >Update</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-dialog>
      </div>
      <v-divider class="mb-5 "></v-divider>
      <div class="your-categories">
        <b class="ml-5">Your Categories</b>
        <div class="space-30"></div>
        <v-data-table :headers="headers" :items="categories">
          <template v-slot:item.name="{ item }">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.name }}
          </template>
          <template  v-slot:item.last-updated="{ item }">
            <span v-if="item.status =='Custom'">{{ item.lastUpdated | lastUpdated }}</span>
          </template>
          <template v-slot:item.action="{ item }">
            <div v-if="item.status == 'Custom'">
              <v-icon small class="mr-2" @click="editCategory(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="removeCategory(item)">
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
       <BooleanDialog
          :dialog="deleteDialog"
          :name="category.name"
          :type="'Category'"
          @confirmed="deleteCategory"
          @cancelled="deleteDialog = false"
        > </BooleanDialog>
    </v-card>
  </div>
</template>

<script>
import Icons from '@/assets/icons.js';
import { mapGetters } from 'vuex';
import moment from 'moment';
import BooleanDialog from '@/components/common/boolean-dialog';

export default {
  name: 'SettingsCategories',

  data() {
    return {
      mdiIcons: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Last Updated', value: 'last-updated' },
        { text: 'Action', value: 'action' },
      ],
      category: {},
      categoryDialog: false,
      categoryState: '',
      categoryValid:false,
      deleteDialog:false
    };
  },
  filters: {
    lastUpdated(val) {
      return moment(val).format('DD-MM-YYYY');
    },
  },
  components: {
    BooleanDialog  
  },
  mounted() {
    this.mdiIcons = Icons;
    this.getAllCategories();
  },
  computed: {
    ...mapGetters('records', {
      categories: 'GET_CATEGORIES',
    }),
  },
  methods: {
    getAllCategories() { 
      this.$store.dispatch(`records/GET_ALL_CATEGORIES`);
    },
    closeCategoryDialog() {
      this.categoryDialog = false;
    },
    addCategory() {
      this.categoryDialog = true;
      this.categoryState = 'create';
    },
    editCategory(category) { 
      
      this.categoryDialog = true;
      this.categoryState = 'update';
      this.category.name = category.name;
      this.category.icon = category.icon;
      this.category.id = category.id;
      // this.category = category
    },
    saveCategory() {
      this.$refs.category.validate();
      let defaultIcon = `mdi-shape`
      if(!this.category.icon) this.category.icon = defaultIcon;
      if(this.categoryValid) { 
        this.$store.dispatch(`records/ADD_CATEGORY`,this.category)
        .then(() => { 
          this.categoryDialog = false;
          this.category = {}
           this.$refs.category.reset();
        })
      }
    },
    deleteCategory() { 
      this.$store.dispatch(`records/DELETE_CATEGORY`,this.category.id)
      .then(() => { 
        this.deleteDialog = false
      })
    },
    updateCategory() {
      this.$refs.category.validate();
      if(this.categoryValid){ 
        this.$store.dispatch(`records/UPDATE_CATEGORY`,this.category)
        .then(() => { 
          this.categoryDialog = false;
          this.category = {}
          this.$refs.category.reset();
        })
      }
    },
    removeCategory(category) { 
      this.category.name = category.name;
      this.category.id = category.id;
      this.deleteDialog = true;
    },
    iconSelected(icon) {
      let mdiIcon = `mdi-${icon}`;
      this.category.icon = mdiIcon;
    },
  },
};
</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  background: white;
  padding: 10px;
  margin-right: -30px;
}

.flex-container > div {
  background-color: #f1f1f1;
  padding: 0px 5px;
  width: 50px;
  margin: 3px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}
</style>
