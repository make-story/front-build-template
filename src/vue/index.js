import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

/**
 * 뷰 어플리케이션에 라우터 플러그인을 추가한다.
 */
//Vue.use(VueRouter);

new Vue({
	render: h => h(App),
}).$mount('#root');
//new Vue(App);