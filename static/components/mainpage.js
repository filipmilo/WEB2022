Vue.component("Mainpage", {
	data: function () {
		    return {
				message: "Test",
				role: "",
				facilities: null,
				search: "",
				filter: "",
				registerMessage: ""
		    }
	},
	template: ` 
<div>
	<div >
		<button v-if = "this.role == '' || this.role === 'ADMIN'" v-on:click = "showRegisterUser"> {{this.registerMessage}} </button>
		<button v-if = "this.role == ''" v-on:click = "showLoginUser"> Login </button>
		<button v-if = "this.role != ''" v-on:click = "logout"> Logout </button>
		
	</div>
	<form>
		<input type="text" v-model = "search"></input>
		<!--<input type="text" ></input>-->
		<select name="cars" id="cars" v-model = "filter">
			  <option value="Name">Name</option>
			  <option value="Type">Type</option>
			  <option value="Location">Location</option>
			  <option value="Rating">Average grade</option>
		</select>
		<input type="submit" value="Search" v-on:click = "searchForFacility"></input>
	</form>
	<table border="1">
		<tr>
			<td>Name</td>
			<td>Type</td>
			<td>Content</td>
			<td>Status</td>
			<td>Location</td>
			<td>Rating</td>
			<td>Working Hours</td>
		</tr>
		
		<tr v-for="(f, index) in facilities">
			<td>{{ f.name }}</td>
			<td>{{ f.type }}</td>
			<td>{{ f.content }}</td>
			<td v-if="f.status">Open</td>
			<td v-else>Closed</td>
			<td>{{ f.location.address.split(',')[1] }}</td>
			<td>{{ f.avgRating }}</td>
			<td>{{ f.workingHours }}</td>
		</tr>
	</table>
</div>
`
	, 
	methods : {
		showRegisterUser: function() {
			router.push(`/register`);
		},
		showLoginUser: function() {
			router.push(`/login`);
		},
		searchForFacility: function() {
			event.preventDefault();
			console.log(this.filter)
			console.log(this.search)
			if(this.search != "") {
				axios.get("/rest/facilities/search/",  {params: { search: this.search, filter: this.filter }})
	    		.then(response => {
					this.facilities = response.data
				}).catch(error => {
	    			console.log(error.response)
				});	
			} else {
				axios.get('rest/facilities/')
		        .then(response => {
					this.facilities = response.data
				})
			}
	
		},
		logout: function() {
			localStorage.removeItem('jwt');
			this.role = '';
			this.registerMessage = 'Register';
		
			alert("Logged out");
		}
	},
	mounted () {
		this.role = this.$route.params.role;
		
		var toParse = localStorage.getItem('jwt');
		var role;
		
		if(!toParse)
			role = ''
		else
			role = JSON.parse(toParse).role;
			
		this.role = role;		

		if(this.role === 'ADMIN') {
			this.registerMessage = 'Register new accounts'
		} else {
			this.registerMessage = 'Register'
		}
		
		axios
          .get('rest/facilities/')
          .then(response => {
				this.facilities = response.data
			})
		
    }
});