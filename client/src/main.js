import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from "axios";
import { appAxios } from './utils/appAxios';

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$appAxios = appAxios;

app.use(router);
app.use(store);
app.mount('#app');
