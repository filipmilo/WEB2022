const Register = {template: '<register></register>' }
const Login = {template: '<login></login>' }
const Mainpage = {template: '<mainpage></mainpage>' }
const Navbar = {template: '<navbar></navbar>' }
const Createfacility = {template: '<createfacility></createfacility>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/login', component: Login},
		{ path: '/createFacility', component: Createfacility},
		{ path: '/', component: Mainpage},
		{ path: '/register', name: 'home', component: Register}
	  ]
});

var app = new Vue({
	router,
	el: '#vue-app'
});