Vue.component("Mainpage", {
	data: function () {
		    return {
				message: "Test",
				role: "",
				facilities: null,
				search: "",
				registerMessage: "",
				searchName: "",
				searchType: "",
				searchLocation: "",
				searchRating: "",
				sortName: 0,
				sortLocation: 0,
				sortRating: 0
		    }
	},
	template: ` 
<div id="mainpage-div">
	<div id="signin-buttons">
		<button v-if = "this.role === 'ADMIN'" v-on:click = "showRegisterUser"> Register new users </button>
		<button v-if = "this.role === 'ADMIN'" v-on:click = "createSportsFacility"> Create Sports Facility </button>
	</div>
	<div id="so-div">
		<div>
			<form>
				<div class="search-group">
					<div class="searchName-group">
						<input type="text" v-model = "searchName" placeholder="Name" class="form-control" id="first-input"></input>
						<button id="nameButton" v-on:click="sortBy" class="btn btn-light btn-outline-dark">A-Z</button>
					</div>
					<div class="searchType-group">
						<input type="text" v-model = "searchType" placeholder="Type" class="form-control"></input>
					</div>
					<div class="searchLocation-group">
						<input type="text" v-model = "searchLocation" placeholder="Location" class="form-control"></input>
						<button id="locationButton" v-on:click="sortBy" class="btn btn-light btn-outline-dark">A-Z</button>
					</div>
					<div class="searchRating-group">
						<input type="text" v-model = "searchRating" placeholder="Rating" class="form-control"></input>
						<button id="ratingButton" v-on:click="sortBy" class="btn btn-light btn-outline-dark">▼</button>
					</div>

					<input type="submit" value="Search" v-on:click = "searchForFacility" class="btn btn-primary"></input>
				</div>
			</form>
			<!--<form>
				<div class="sort-group">
					<input type="text" v-model = "searchName" placeholder="Name" class="form-control" id="first-input"></input>
					<input type="text" v-model = "searchType" placeholder="Type" class="form-control"></input>
					<input type="text" v-model = "searchLocation" placeholder="Location" class="form-control"></input>
					<input type="text" v-model = "searchRating" placeholder="Rating" class="form-control"></input>

					<input type="submit" value="Search" v-on:click = "searchForFacility" class="btn btn-primary"></input>
				</div>
			</form>-->
		</div>

		<div v-for="(f, index) in facilities" id="list-div">
			<div class="img-div">
				<img :src="f.logoPath"/>
			</div>
			<div id="info-div">
				<div id="title-div">
					<router-link class="nav-link" to="/">
						{{ f.name }}
					</router-link>
					<p class="so-p" id="p-location" v-if="f.status"> Open </p>
					<p class="so-p" id="p-location" v-else> Closed </p>
				</div>
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
			this.search = this.searchName + "," + this.searchType + "," 
						+ this.searchLocation + "," + this.searchRating;
						
			if(this.search != ",,,") {
				axios.get("/rest/facilities/search/",  {params: { filter: this.search}})
	    		.then(response => {
					this.facilities = response.data
					this.facilities.sort(function(a,b) {
						return b.status - a.status;
					})
				}).catch(error => {
	    			console.log(error.response)
				});	
			} else {
				axios.get('rest/facilities/')
		        .then(response => {
					this.facilities = response.data
					this.facilities.sort(function(a,b) {
						return b.status - a.status;
					})
					document.getElementById('nameButton').setAttribute('class', 'btn btn-light btn-outline-dark');
					document.getElementById('nameButton').textContent = 'A-Z';
					document.getElementById('locationButton').setAttribute('class', 'btn btn-light btn-outline-dark');
					document.getElementById('locationButton').textContent = 'A-Z';
					document.getElementById('ratingButton').setAttribute('class', 'btn btn-light btn-outline-dark');
					document.getElementById('ratingButton').textContent = '▼';
				})
			}
	
		},
		createSportsFacility: function() {
			router.push('/createFacility');
		},
		sortBy: function() {
			event.preventDefault();
			switch(window.event.target.id) {
				case 'nameButton':
					this.sortName = this.sortToggler(this.sortName, window.event.target, 'A-Z', 'Z-A');
					break;
				case 'locationButton':
					this.sortLocation = this.sortToggler(this.sortLocation, window.event.target, 'A-Z', 'Z-A');
					break;
				case 'ratingButton':
					this.sortRating = this.sortToggler(this.sortRating, window.event.target, '▼', '▲');
					break;
			}

			this.facilitySort(this.sortName, this.sortLocation, this.sortRating);

		},
		sortToggler: function(sorty, trigger, ascending, descending) {
			++sorty;

			if(sorty === 3) {
				sorty = 0;
				trigger.setAttribute('class', 'btn btn-light btn-outline-dark');
				trigger.textContent = ascending;
				return sorty;
			}

			switch(sorty) {
				case 0:
					trigger.setAttribute('class', 'btn btn-light btn-outline-dark');
					trigger.textContent = ascending;
					break;
				case 1:
					trigger.setAttribute('class', 'btn btn-primary');
					trigger.textContent = ascending;
					break;
				case 2:
					trigger.textContent = descending;
					break;
			}
			return sorty;
		},
		facilitySort: function(sortName, sortLocation, sortRating) {
			console.log(sortName + ", " + sortLocation + ", " + sortRating);

			switch(sortRating) {
				case 0:
					break;
				case 1:
					this.facilities.sort((a, b) => b.avgRating - a.avgRating);
					break;
				case 2:
					this.facilities.sort((a, b) => a.avgRating - b.avgRating);
					break;
			}

			switch(sortLocation) {
				case 0:
					
					break;
				case 1:
					this.facilities.sort((a, b) => a.location.address.split(',')[1].localeCompare(b.location.address.split(',')[1]));
					break;
				case 2:
					this.facilities.sort((a, b) => b.location.address.split(',')[1].localeCompare(a.location.address.split(',')[1]));
					break;
			}

			switch(sortName) {
				case 0:
					this.searchForFacility();
					break;
				case 1:
					this.facilities.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case 2:
					this.facilities.sort((a, b) => b.name.localeCompare(a.name));
					break;
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
				this.facilities.sort(function(a,b) {
					return b.status - a.status;
				})
			})
    }
});