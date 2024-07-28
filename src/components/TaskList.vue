<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="task in tasks" :key="task.id" @click="openDetailDialog(task)">
          <v-card class="ma-3" elevation="2">
            <v-card-title>
              <v-list-item-title>{{ task.title }}</v-list-item-title>
            </v-card-title>
            <v-card-subtitle>
              Priority: {{ task.priority }} | Due Date: {{ new Date(task.dueDate).toLocaleDateString() }} | Status: {{
                task.completed ? 'Completed' : 'Not Completed' }}
            </v-card-subtitle>
            <v-card-actions>
              <v-icon
                :class="{ 'mdi-check-circle': task.completed, 'mdi-checkbox-blank-circle-outline': !task.completed }"
                @click.stop="toggleCompletion(task)" class="mr-2" small></v-icon>
              <v-btn icon @click.stop="openEditDialog(task)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click.stop="deleteTask(task.id)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ isEdit ? 'Edit Task' : 'Create Task' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="currentTask.title" label="Title" required></v-text-field>
            <v-textarea v-model="currentTask.description" label="Description"></v-textarea>
            <v-select v-model="currentTask.priority" :items="priorities" label="Priority"></v-select>
            <v-text-field v-model="currentTask.dueDate" label="Due Date" type="date"></v-text-field>
            <v-checkbox v-model="currentTask.completed" label="Completed"></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveTask">{{ isEdit ? 'Update' : 'Save' }}</v-btn>
          <v-btn @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="detailDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Task Details</span>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Title:</v-list-item-title>
                <v-list-item-subtitle>{{ currentTask.title }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Description:</v-list-item-title>
                <v-list-item-subtitle>{{ currentTask.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Priority:</v-list-item-title>
                <v-list-item-subtitle>{{ currentTask.priority }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Due Date:</v-list-item-title>
                <v-list-item-subtitle>{{ new Date(currentTask.dueDate).toLocaleDateString() }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Status:</v-list-item-title>
                <v-list-item-subtitle>{{ currentTask.completed ? 'Completed' : 'Not Completed' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="detailDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      dialog: false,
      detailDialog: false,
      isEdit: false,
      currentTask: {
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        completed: false
      },
      priorities: ['High', 'Medium', 'Low'],
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
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
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        this.tasks = this.tasks.map(t => (t.id === result.id ? result : t));
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
    openEditDialog(task) {
      this.currentTask = { ...task };
      this.isEdit = true;
      this.dialog = true;
    },
    async saveTask() {
      try {
        const method = this.isEdit ? 'PUT' : 'POST';
        const url = this.isEdit ? `http://localhost:3000/tasks/${this.currentTask.id}` : 'http://localhost:3000/tasks';
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.currentTask),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        this.tasks = this.tasks.map(t => (t.id === result.id ? result : t));
        this.dialog = false;
      } catch (error) {
        console.error('Failed to save task:', error);
      }
    },
    async deleteTask(id) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        this.fetchTasks(); // Refreshing the task list after deletion
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    openDetailDialog(task) {
      this.currentTask = { ...task };
      this.detailDialog = true;
    },
  },
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
