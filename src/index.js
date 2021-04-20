


window.Vue = require('vue') // подключаем Vue 

import vuetify from './js/vuetify.js'



import regeneratorRuntime from "regenerator-runtime";

Vue.component('main-page', require('./components/mainPage/mainPage.vue').default) // Основная страница

import "./sass/main.sass"






// создаем экземпляр vue где подключаем самое главное переадрасицию, визуализацию элемнетов и хранилище
new Vue({
  vuetify,
  el: "#app" 
})