const Register = {template: '<register></register>' }
const Login = {template: '<login></login>' }
const Mainpage = {template: '<mainpage></mainpage>' }
const Navbar = {template: '<navbar></navbar>' }
const Profile = {template: '<profile></profile>'}
const Createfacility = {template: '<createfacility></createfacility>' }
const Facilitypage = {template: '<facilitypage></facilitypage>'}
const Allusers = {template: '<allusers></allusers>'}
const Trainings = {template: '<trainings></trainings>'}
const Membership = {template: '<membership></membership>'}
const Enroll = {template: '<enroll></enroll>'}
const Comments = {template: '<comments></comments>'}


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/login', component: Login},
		{ path: '/createFacility', component: Createfacility},
		{ path: '/', component: Mainpage},
		{ path: '/register', name: 'home', component: Register},
		{ path: '/profile', component: Profile},
		{ path: '/facilityPage', name: 'facilityPage', component: Facilitypage},
		{ path: '/allUsers', component: Allusers},
		{ path: '/trainings', component: Trainings},
		{ path: '/membership', component: Membership},
		{ path: '/enroll', component: Enroll}

	  ]
});

var app = new Vue({
	router,
	el: '#vue-app'
});