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
<div id="mainpage-div">
	<div id="signin-buttons">
		<button v-if = "this.role === 'ADMIN'" v-on:click = "showRegisterUser"> Register new users </button>
	</div>
	<div id="so-div">
		<div>
			<form>
				<div class="form-group">
					<input type="text" v-model = "filterName" placeholder="Name" class="form-control" id="first-input"></input>
					<input type="text" v-model = "filterType" placeholder="Type" class="form-control"></input>
					<input type="text" v-model = "filterLocation" placeholder="Location" class="form-control"></input>
					<input type="text" v-model = "filterRating" placeholder="Rating" class="form-control"></input>

					<input type="submit" value="Search" v-on:click = "searchForFacility" class="btn btn-primary"></input>
				</div>
			</form>
		</div>

		<div v-for="(f, index) in facilities" id="list-div">
			<div class="img-div">
				<img src="Hattrick.png"/>
			</div>
			<div id="info-div">
				<router-link class="nav-link" to="/">
					{{ f.name }}
				</router-link>
				<hr class="separator"></hr>
				<div id="type-content-div">
					<p class="so-p" id="p-type"> Type: {{ f.type }} </p>
					<p class="so-p" id="p-content"> Content: {{ f.content }} </p>
				</div>
				<p class="so-p" id="p-location"> Location: {{ f.location.address.split(',')[1] }} </p>
				<p class="so-p" id="p-avgRating"> Rating: {{ f.avgRating }} </p>
				<p class="so-p" id="p-workingHours"> Working Hours: {{ f.workingHours }} </p>
			</div>
			
		</div>
	</div>
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
	
		}
	},
	watch: {
		filterName(value) {
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