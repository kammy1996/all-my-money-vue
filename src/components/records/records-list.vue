<template>
  <div>
    <v-card class="pa-3" height="70px" dense>
      <v-row>
        <div class="col-md-1">
          <!-- checkbox -->
          <v-checkbox
            v-model="checkbox"
          ></v-checkbox>
        </div>
        <div class="col-md-3">
          <!-- Source of Income  -->
          <p>got it from Salary</p>
        </div>
        <div class="col-md-1">
          <!-- Account  -->
          <p>ICICI</p>
        </div>
        <div class="col-md-2">
          <!-- Category  -->
          <p>Utilities</p>
        </div>
        <div class="col-md-1">
          <!-- Labels  -->
          <p>Label</p>
        </div>
        <v-spacer></v-spacer>
        <div class="col-md-2">
          <!-- Amount  -->
          <h3>5000</h3>
        </div>
        <div class="col-md-1">
          <!-- Settings  -->
          <v-icon>mdi-dots-vertical</v-icon>
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name:'RecordsList',
  data() {
    return { 
      checkbox:false,
    }
  }
}
</script>