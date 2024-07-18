<template>
  <v-container>
    <v-btn color="primary" @click="$router.push('/create')">Create Task</v-btn>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="task in tasks"
          :key="task.id"
          @click="editTask(task.id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>
              Priority: {{ task.priority }} | Due Date: {{ task.dueDate }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="deleteTask(task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      axios.get('/api/tasks').then(response => {
        this.tasks = response.data;
      });
    },
    editTask(id) {
      this.$router.push(`/edit/${id}`);
    },
    deleteTask(id) {
      axios.delete(`/api/tasks/${id}`).then(() => {
        this.fetchTasks();
      });
    },
  },
};
</script>
