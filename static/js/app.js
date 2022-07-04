const Register = {template: '<register></register>' }
const Login = {template: '<login></login>' }
const Mainpage = {template: '<mainpage></mainpage>' }
const Navbar = {template: '<navbar></navbar>' }
const Profile = {template: '<profile></profile>'}
const Createfacility = {template: '<createfacility></createfacility>' }
const Facilitypage = {template: '<facilitypage></facilitypage>'}
const Allusers = {template: '<allusers></allusers>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/login', component: Login},
		{ path: '/createFacility', component: Createfacility},
		{ path: '/', component: Mainpage},
		{ path: '/register', name: 'home', component: Register},
		{ path: '/profile', component: Profile},
		{ path: '/facilityPage', name: 'facilityPage', component: Facilitypage},
		{ path: '/allUsers', component: Allusers}
	  ]
});

var app = new Vue({
	router,
	el: '#vue-app'
});