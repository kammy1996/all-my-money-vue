<template>
  <div>
    <v-card>
      <h3 class="settings-title mb-3 ml-5 pt-5">CATEGORIES</h3>
      <v-divider class="mb-5 "></v-divider>
      <div class="add-categories ml-5 mb-5">    
        <p>Add a New Label</p>
        <v-btn @click="labelDialog = true" rounded color="success" > 
        <v-icon class="mr-2" small>mdi-label</v-icon> Add Label
        </v-btn>
        <v-dialog
            v-model="labelDialog"
            width="500"
          >
            <v-card>
                <h2 class="px-5 py-3 settings-title">Add Label</h2>
                <v-divider></v-divider>
                <div class="space-20"></div>
                <div class="pa-5">
                  <div class="row">
                    <div class="col-md-7">
                      <v-text-field   
                          v-model="label.name"
                          label="label Name"
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
                                <v-icon v-if="label.color" class="mr-1" :color="label.color.hex" >mdi-circle</v-icon> 
                                <v-icon v-else class="mr-1"  >mdi-palette</v-icon> 
                                Pick Color
                              </v-btn>
                            </template>
                            <v-color-picker
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
          :items="labels"
        >
          <template v-slot:item.name="{ item }">
            <v-avatar class="mt-n1" size="10" :color="item.color"></v-avatar>
            {{item.name}}
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
      labels: [
        {
          name:'Work',
          color:'cyan',
          status:'Default',
        },
      ],
    label:{},
    labelDialog:false,
    }
  },
  methods: { 
    closeLabelDialog() {
      this.labelDialog = false;
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
</style>