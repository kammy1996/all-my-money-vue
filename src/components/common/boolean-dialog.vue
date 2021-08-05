<template>
  <div>
    <v-dialog
        v-model="dialog"
        max-width="450"
      >
        <v-card class="pa-5">
          <h3>
            {{ type }} "{{ name }}" will be permanently deleted ? 
          </h3>
          <div class="space-30"></div>
          <v-card-actions >
            <v-spacer></v-spacer>

            <v-btn
              color="grey"
              dark
              @click="cancel"
            >
              Cancel
            </v-btn>

            <v-btn
              color="red"
              dark
              @click="confirm"
            >
              Yes
            </v-btn>
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
    confirm() {
      this.$emit(`confirmed`)
    },
    cancel() {
      this.$emit(`cancelled`)
    }
  }
  
})
</script>
