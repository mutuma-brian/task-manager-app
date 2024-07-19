<template>
  <v-app class="bg-grey-lighten-3">
    <v-main>
      <NavBar />
      <v-container >
        <router-view />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; 2024 Task Manager</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  }
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.v-application--wrap {
  min-height: 100vh;
}
</style>
