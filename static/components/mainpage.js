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
		<button v-if = "this.role == undefined || this.role === 'ADMIN'" v-on:click = "showRegisterUser"> {{this.registerMessage}} </button>
		<button v-if = "this.role == undefined" v-on:click = "showLoginUser"> Login </button>
		<button v-if = "this.role != undefined" v-on:click = "logout"> Logout </button>
		
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
			router.push(`/register/${this.role}`);
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
			window.localStorage.removeItem('jwt')
			alert("Logged out")
			this.role = undefined
			this.registerMessage = 'Register'
		}
	},
	mounted () {
		this.role = this.$route.params.role;
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