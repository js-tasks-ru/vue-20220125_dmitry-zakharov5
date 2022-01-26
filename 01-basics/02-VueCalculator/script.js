import { createApp } from './vendor/vue.esm-browser.js';

const VueCalculator = {
    data() {
        return {
            buttonValue: 'sum',
            firstOperand: 0,
            secondOperand: 0,
        }
    },

    computed: {
        calculate() {
            if (this.buttonValue === 'sum') { return this.firstOperand + this.secondOperand }
            if (this.buttonValue === 'subtract') { return this.firstOperand - this.secondOperand }
            if (this.buttonValue === 'multiply') { return this.firstOperand * this.secondOperand }
            if (this.buttonValue === 'divide') { return this.firstOperand / this.secondOperand }
        }
    }
}

createApp(VueCalculator).mount('#app');