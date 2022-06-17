const Register = {template: '<register></register>' }
const Login = {template: '<login></login>' }
const Mainpage = {template: '<mainpage></mainpage>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/login', component: Login},
		{ path: '/mainpage', component: Mainpage},
		{ path: '/:isAdmin?', name: 'home', component: Register}
	  ]
});

var app = new Vue({
	router,
	el: '#vue-app'
});