import { createRouter, createWebHashHistory } from "vue-router";
import store from "./store";

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

router.beforeEach((to, from, next) => {
    const authRequiredRoutes = ["Appointments"];
    const authNotRequiredRoutes = ["Login", "Register"];

    const currentUser = store.getters._getCurrentUser;

    if (authNotRequiredRoutes.indexOf(to.name) > -1 && currentUser) next(false);

    if (authRequiredRoutes.indexOf(to.name) > -1) {
        if (currentUser) next();
        else next({ name: "Login" });
    } else {
        next();
    }
})

export default router;