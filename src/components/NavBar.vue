<template>
  <nav>
    <v-app-bar flat class="bg-blue-darken-1">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Task</span>
        <span>Manager</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey">
        <span @click="navigateTo('/')">Quit</span>
        <v-icon @click="navigateTo('/')">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="px-6 py-8">
      <v-icon left @click="navigateTo('/add-task')">mdi-plus-box</v-icon>
      <span @click="navigateTo('/add-task')" class="px-4">Add Task</span>
      <p></p>
      <v-icon left @click="navigateTo('/view-task')">mdi-eye</v-icon>
      <span @click="navigateTo('/view-task')" class="px-4">View Tasks</span>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      drawer: true
    };
  },
  methods: {

    navigateTo(route) {
      this.$router.push(route);
    }

  }
};
</script>

<style scoped></style>
