<template>
  <v-container class="landing-page">
    <v-row justify="center">
      <v-col cols="12" sm="6" class="text-center">
        <h1 class="headline">Welcome to Task Manager</h1>
        <v-btn color="primary" class="ma-2" @click="navigateTo('/view-task')">
          <v-icon left>mdi-eye</v-icon>
          View Tasks
        </v-btn>
        <v-btn color="secondary" class="ma-2" @click="navigateTo('/add-task')">
          <v-icon left>mdi-plus-box</v-icon>
          Add Task
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.landing-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.logo {
  max-width: 200px;
}

.headline {
  margin-top: 20px;
  font-size: 2.5rem;
}

.v-btn {
  margin-top: 20px;
}
</style>
