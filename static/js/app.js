const Register = {template: '<register></register>' }
const Login = {template: '<login></login>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: Register},
		{ path: '/login', component: Login}
	  ]
});

var app = new Vue({
	router,
	el: '#vue-app'
});

/*var app = new Vue({
	el: '#vue-app',
	data: {
		name: 'Stefan',
		job: 'Ninja',
		website: 'https://www.google.com/',
		websiteTag:'<a href="https://www.google.com/">WebsiteTag</a>'
	},
	methods: {
		greet: function(time){
			return 'Good ' + time + ' ' + this.name;
		}
	}
})*/