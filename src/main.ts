import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import App from './App.vue';
import router from './router';

// PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

// Configure PrimeVue
app.use(PrimeVue, {
    ripple: true,
    inputStyle: 'filled'
});

// Install ToastService
app.use(ToastService);

// Install other plugins
app.use(createPinia());
app.use(router);

app.mount('#app');