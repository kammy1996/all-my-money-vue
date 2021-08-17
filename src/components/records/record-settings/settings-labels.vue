<template>
  <div>
    <v-card>
      <h3 class=" mb-3 ml-5 pt-5">LABELS</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">    
        <p>Add a New Label</p>
        <v-btn @click="addLabel" rounded color="success" > 
        <v-icon class="mr-2" small>mdi-label</v-icon> Add Label
        </v-btn>
        <v-dialog
            v-model="labelDialog"
            width="500"
          >
            <v-card>
                <h2 class="px-5 py-3 ">Add Label</h2>
                <v-divider></v-divider>
                <div class="space-20"></div>
                <div class="pa-5">
                  <v-form ref="label" v-model="labelValid">
                  <div class="row">
                    <div class="col-md-7">
                      <v-text-field   
                          v-model="label.name"
                          label="label Name"
                          :rules="[(v) => !!v || 'Label Name is required']"
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
                                <v-icon v-if="label.color" class="mr-1" :color="label.color" >mdi-circle</v-icon> 
                                <v-icon v-else class="mr-1"  >mdi-palette</v-icon> 
                                Pick Color
                              </v-btn>
                            </template>
                            <v-color-picker
                            @update:color="setLabelColor"
                            value="#ffff"
                            v-model="label.color"
                            dot-size="25"
                            swatches-max-height="200"
                          ></v-color-picker>
                        </v-menu>
                    </div>
                </div>
             
                <div class="space-20"></div>
                 <div class="text-center">
                    <v-btn class="mr-5 px-10" @click="closeLabelDialog"  large color="rgba(0,0,0,0.8)" dark
                      >Cancel</v-btn
                    >
                    <v-btn
                    class="px-12"
                    @click="saveLabel"
                    v-if="labelState=='create'"
                    large
                    color="success"
                    >Save</v-btn
                  >
                  <v-btn
                    class="px-12"
                    @click="updateLabel"
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
      <div class="your-labels">
      <b class="ml-5">Your Labels</b>
      <div class="space-30"></div>
        <v-data-table
          :headers="headers"
          :items="labels"
        >
          <template v-slot:item.name="{ item }">
            <v-avatar class="mt-n1" size="10" :color="item.color"></v-avatar>
            {{item.name}}
          </template>
           <template v-slot:item.last-updated="{ item }">
            {{ item.lastUpdated | lastUpdated }}
          </template>
           <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editLabel(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="removeLabel(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
       <BooleanDialog
          :dialog="deleteDialog"
          :name="label.name"
          :type="'Label'"
          @confirmed="deleteLabel"
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
  name:"SettingsLabel",
  
  data() {
    return { 
      mdiIcons:[],
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Status', value: 'status' },
          { text: 'Last Updated', value: 'last-updated' },
          { text: 'Action', value: 'action' }
        ],
    label:{},
    labelState:'',
    labelDialog:false,
    labelValid: false,  
    deleteDialog:false,
    }
  },
  components: { 
    BooleanDialog
  },
  filters: {
    lastUpdated(val) {
      return moment(val).format('DD-MM-YYYY');
    },
  },
  computed: { 
    ...mapGetters({
      labels :'records/GET_LABELS'
    }),
  },
  mounted() {
    this.getAllLabels();
  },
  methods: { 
    getAllLabels() { 
      this.$store.dispatch('records/GET_ALL_LABELS');
    },
    closeLabelDialog() {
      this.labelDialog = false;
    },
    setLabelColor(val) { 
      this.$set(this.label,'color',val.hex);
    },
    addLabel() {
      this.label={};
      this.labelDialog = true;
      this.labelState = "create";
    },
    saveLabel() { 
      if(this.label && !this.label.color) this.label.color= '#ffff';
      this.$refs[`label`].validate();
      if(this.labelValid) { 
        this.$store.dispatch(`records/ADD_LABEL`, this.label)
        .then(() => { 
          this.labelDialog = false;
          this.$refs.label.reset();
          this.label = {}
        })
      }
    },
    editLabel(label) {
      this.labelDialog = true;
      this.labelState = "update";
      this.label.name = label.name;
      this.label.color = label.color;
      this.label.id = label.id;
    },
    updateLabel() {
      this.$refs[`label`].validate();
      if(this.labelValid) { 
        this.$store.dispatch(`records/UPDATE_LABEL`, this.label)
        .then(() => {    
          this.labelDialog = false;
          this.$refs.label.reset();
          this.label = {};

        })
      }
    },
    removeLabel(label) { 
      this.label.name = label.name;
      this.label.id = label.id;
      this.deleteDialog = true;
    },
    deleteLabel() {
      this.$store.dispatch(`records/DELETE_LABEL`, this.label.id)
      .then(() => { 
        this.deleteDialog = false;
      })
    }
  }
}
</script>

<style >

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