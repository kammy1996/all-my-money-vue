<template>
  <div style="display:inline-block">
    <v-btn rounded @click="openCategoryDialog" color="black" dark>
      <v-icon>mdi-plus</v-icon>Category</v-btn
    >
    <v-dialog width="525" v-model="categoryDialog">
      <v-card class="pa-5">
        <h3 class="pb-2">Add New Subscription Category</h3>
        <v-divider></v-divider>
        <div class="space-20"></div>
        <div class="categories-list">
          <v-chip-group
            
            v-model="isCategorySelected"
            active-class="primary--text"
            column
          >
            <v-chip
              close
              @click="editCategory(category)"
              @click:close="removeCategory(category.id)"
              v-for="category in categories"
              :key="category.id"
            >
              <v-icon class="mr-1" small>{{ category.icon }}</v-icon>
              {{ category.name }}
            </v-chip>
          </v-chip-group>
        </div>

        <div class="space-10"></div>
        <div class="row">
          <div class="col-md-9">
            <a
              ><b
                ><p
                  @click.prevent="showAddCategory = !showAddCategory"
                  class="ml-2 mt-2"
                >
                  Add Another Category
                </p></b
              ></a
            >
          </div>
          <div class="col-md-3" v-if="showAddCategory">
            <a class="cursort-pointer" @click.prevent="clearCategory"
              ><b><p class="mt-2">Clear</p></b></a
            >
          </div>
        </div>

        <v-form v-model="categoryValid" ref="category">
          <div class="row" v-if="showAddCategory">
            <div class="col-md-3">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on" text>
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
            <div class="col-md-1"></div>
            <div class="col-md-7">
              <v-text-field
                outlined
                dense
                :rules="[(v) => !!v || 'Category Name is required']"
                v-model="category.name"
                label="Category Name"
              ></v-text-field>
            </div>
            <div class="text-center" style="margin-left:30%">
              <v-btn
                small
                class="ml-50 mr-5 px-8 py-5"
                @click="closeCategoryDialog"
                color="rgba(0,0,0,0.8)"
                dark
                >Cancel</v-btn
              >
              <v-btn
                v-if="categoryState == 'create'"
                small
                class="px-8 py-5"
                @click="saveSubscriptionCategory"
                color="success"
                >Save</v-btn
              >
              <v-btn
                v-if="categoryState == 'update'"
                small
                class="px-8 py-5"
                @click="updateSubscriptionCategory"
                color="success"
                >Update</v-btn
              >
            </div>
          </div>
        </v-form>
        <div class="space-20"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import icons from '@/assets/icons';
import { mapGetters } from 'vuex';

export default {
  name: 'AddSubscriptionCategory',
  data() {
    return {
      categoryDialog: false,
      categoryState: 'create',
      mdiIcons: icons,
      isCategorySelected:null, 
      categoryValid: false,
      showAddCategory: false,
      category: {},
    };
  },
  computed: {
    ...mapGetters({
      categories: 'subscription/GET_SUBSCRIPTION_CATEGORIES',
    }),
  },
  watch: {
    showAddCategory() {
      this.category = {};
    },
  },
  methods: {
    openCategoryDialog() { 
      this.showAddCategory = false;
      this.categoryDialog = true;
    },
    clearCategory() {
      this.$refs.category.reset();
      this.category.icon = '';
      this.isCategorySelected = null;
      this.categoryState = 'create';
    },
    iconSelected(icon) {
      let mdiIcon = `mdi-${icon}`;
      this.category.icon = mdiIcon;
    },
    removeCategory(id) {
      if(id.length < 3) return
      else {
        this.$store.dispatch(`subscription/DELETE_SUBSCRIPTION_CATEGORY`,id)
        .then(() => { 
          this.clearCategory();
          this.showAddCategory = false;
        })
      } 

    },
    closeCategoryDialog() {
      this.categoryDialog = false;
      this.isCategorySelected = null;
      this.showAddCategory = false;
    },
    editCategory(category) {
      if(category.id.length < 3) {
        this.clearCategory();
        this.showAddCategory = false;
      } else { 
        this.categoryState = 'update';
        this.showAddCategory = true;
        this.$nextTick(() => {
          this.$set(this.category, 'name', category.name);
          this.$set(this.category, 'icon', category.icon);
          this.$set(this.category, 'id', category.id);
        });
      }
     
    },
    updateSubscriptionCategory() {
      this.$refs.category.validate();
      if(this.categoryValid) { 
        if(this.category && !this.category.icon) this.category.icon = 'mdi-shape'; 
        this.$store.dispatch('subscription/UPDATE_SUBSCRIPTION_CATEGORY', this.category)
        .then(() => { 
          this.categoryDialog = false;
          this.clearCategory();
        })
      }
    },
    saveSubscriptionCategory() {
      this.$refs.category.validate();
      if (this.categoryValid) {
        if (this.category && !this.category.icon) this.category.icon = 'mdi-shape';
        this.$store
          .dispatch(`subscription/ADD_SUBSCRIPTION_CATEGORY`, this.category)
          .then(() => {
            this.clearCategory();
            this.showAddCategory = false;
        });
      }
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
