import { createApp } from './vendor/vue.esm-browser.js';

const CounterButtonApp = {
    data() {
        return {
            count: 0,
        }
    }
}

createApp(CounterButtonApp).mount('#app');