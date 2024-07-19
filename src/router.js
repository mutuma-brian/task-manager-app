import LandingPage from './components/LandingPage.vue'
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/', 
        component: LandingPage,
        name: 'LandingPage'
    },

    { 
        path: '/view-task', 
        component: TaskList,
        name: 'TaskList'
    },

    { 
        path: '/add-task', 
        component: TaskForm,
        name: 'TaskForm'
    },

    { 
        path: '/edit-task/:taskId',  
        component: TaskForm,
        props: true 
    }

]

const router = createRouter({ routes, history: createWebHistory() })

export default router
