<template>
  <div>
    <v-dialog
        v-model="dialog"
        max-width="450"
        @click:outside="toggleDialog"
        clossable
      >
        <v-card class="pa-5">
          <h4 class="mb-2">
           <div class="text-center mb-2"><v-icon color="red" size="40px" >mdi-information </v-icon></div>   
            <div class="text-center"> {{ type }} "{{ name }}" will be permanently deleted ?</div> 
          </h4>
          <template v-if="type != 'Record'">
            <v-divider></v-divider>
            <v-card-subtitle   class="ml-n5 mt-1 text-center">All the Associated Records with this {{ type }} will be Affected.</v-card-subtitle>
          </template>
          <div class="space-20"></div>
          <v-card-actions>
          
          <div style="margin-left:23%" >
            <v-btn
              color="darkgrey"
              dark
              @click="cancel"
            >
              Cancel
            </v-btn>

            <v-btn
              color="red"
              class="ml-3"
              dark
              @click="confirm"
            >
              Confirm
            </v-btn>
              
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
<script>

export default ({
  name:'BooleanDialog',
  props: {
    dialog:Boolean,
    name:String,
    type:String
  },
  methods: { 
    toggleDialog() { 
      this.$emit(`toggleDialog`)
    },
    confirm() {
      this.$emit(`confirmed`)
    },
    cancel() {
      this.$emit(`cancelled`)
    }
  }
  
})
</script>
