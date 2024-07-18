import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'TaskList',
        component: TaskList,
    },
    {
        path: '/create',
        name: 'TaskForm',
        component: TaskForm,
    },
    {
        path: '/edit/:id',
        name: 'EditTask',
        component: TaskForm,
    }

]

const router = createRouter({ routes, history: createWebHistory() })

export default router
