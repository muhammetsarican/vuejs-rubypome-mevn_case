import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: "Appointments",
        path: "/appointments",
        component: () => import("@/views/AppointmentComponent.vue")
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/auth/LoginComponent.vue")
    },
    {
        name: "Register",
        path: "/register",
        component: () => import("@/views/auth/RegisterComponent.vue")
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;