Vue.component("Mainpage", {
	data: function () {
		    return {
				message: "Test",
				role: "",
				facilities: null,
				filter: "",
				registerMessage: "",
				filterName: "",
				filterType: "",
				filterLocation: "",
				filterRating: ""
		    }
	},
	template: ` 
<div>
	<div id="signin-buttons">
		<button v-if = "this.role === 'ADMIN'" v-on:click = "showRegisterUser"> Register new users </button>
		<!--<button v-if = "this.role == ''" v-on:click = "showLoginUser"> Login </button>
		<button v-if = "this.role != ''" v-on:click = "logout"> Logout </button>-->
		
	</div>
	<form id="search-form">
		Name:
		<input type="text" v-model = "filterName"></input>
		Type:
		<input type="text" v-model = "filterType"></input>
		Location:
		<input type="text" v-model = "filterLocation"></input>
		Rating:
		<input type="text" v-model = "filterRating"></input>
		<input type="submit" value="Search" v-on:click = "searchForFacility"></input>
	</form>
	<table id="sportObject-table" border="1">
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
			this.filter = this.filterName + "," + this.filterType + "," 
						+ this.filterLocation + "," + this.filterRating;
						
			if(this.filter != "") {
				axios.get("/rest/facilities/search/",  {params: { filter: this.filter}})
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
			
			this.$root.$emit('messageFromChild1ToChild2', 'false');
		
			alert("Logged out");
		}
	},
	mounted () {
		
		this.$root.$on('messageFromChild2ToChild1', (text) => {
			if(text === 'false') {
				this.role = '';
			} else {
				var toParsee = localStorage.getItem('jwt');
				var rolee;
				
				if(!toParsee)
					rolee = ''
				else
					rolee = JSON.parse(toParse).role;
					
				this.role = rolee;
			}
		});
		
		var toParse = localStorage.getItem('jwt');
		var role;
		
		if(!toParse)
			role = ''
		else
			role = JSON.parse(toParse).role;
			
		this.role = role;		
		
		axios
          .get('rest/facilities/')
          .then(response => {
				this.facilities = response.data
			})
		
    }
});