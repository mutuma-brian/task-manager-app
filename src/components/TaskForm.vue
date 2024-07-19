<template>
  <v-container>
    <!-- Form for creating a task -->
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="task.title" label="Title" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="task.description" label="Description"></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-select v-model="task.priority" :items="priorities" label="Priority"></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="task.dueDate" label="Due Date" type="date"></v-text-field>
        </v-col>
        <v-col cols="12">
          <!-- This will set the status of the task -->
          <v-checkbox v-model="task.completed" label="Completed"></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-btn type="submit" class="bg-blue-darken-3">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'TaskForm',
  data() {
    return {
      task: {
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        completed: false,
      },
      tasks: [],
      priorities: ['High', 'Medium', 'Low'],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.task)
        });
        const newTask = await response.json();
        if (response.ok) {
          this.tasks.push(newTask);
          this.resetForm();
          alert('Task saved successfully!');
        } else {
          console.error('Error saving task:', newTask);
          alert('Error saving task.');
        }
      } catch (error) {
        console.error('Error saving task:', error);
        alert('Error saving task.');
      }
    },
    async fetchTasks() {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) throw new Error('Network response was not ok');
        this.tasks = await response.json();
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    },
    async toggleCompletion(task) {
      try {
        const updatedTask = { ...task, completed: !task.completed };
        const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        this.tasks = this.tasks.map(t => (t._id === result._id ? result : t));
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
    editTask(task) {
      this.task = { ...task };
    },
    async deleteTask(id) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        this.fetchTasks();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    resetForm() {
      this.task = {
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        completed: false,
      };
    }
  },
  created() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}

.v-card-title,
.v-card-subtitle {
  font-weight: bold;
}

.v-icon {
  color: #1976d2;
  cursor: pointer;
}

.v-btn {
  margin: 0;
}
</style>
