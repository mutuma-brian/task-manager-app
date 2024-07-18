<template>
  <v-container>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="task.title" label="Title" required></v-text-field>
      <v-textarea v-model="task.description" label="Description"></v-textarea>
      <v-select v-model="task.priority" :items="priorities" label="Priority" required></v-select>
      <v-text-field v-model="task.dueDate" label="Due Date" type="date" required></v-text-field>
      <v-btn type="submit" color="primary">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      },
      priorities: ['high', 'medium', 'low'],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.fetchTask();
    }
  },
  methods: {
    fetchTask() {
      axios.get(`/api/tasks/${this.$route.params.id}`).then(response => {
        this.task = response.data;
      });
    },
    handleSubmit() {
      if (this.$route.params.id) {
        axios.put(`/api/tasks/${this.$route.params.id}`, this.task).then(() => {
          this.$router.push('/');
        });
      } else {
        axios.post('/api/tasks', this.task).then(() => {
          this.$router.push('/');
        });
      }
    },
  },
};
</script>
