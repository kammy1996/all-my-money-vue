<template>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    text: {
      type:String,
      required:true
    },
  },
  data() {
    return {
      snackbar: {
        show:this.show,
        color:this.color,
        text:this.text
      }
    }
  }
};
</script>
