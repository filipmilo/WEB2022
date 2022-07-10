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
				sortRating: 0,
				isOpenChecked: false,
				types: []
		    }
	},
	template: ` 
<div id="mainpage-div">
	<div id="signin-buttons">
		<button v-if = "this.role === 'ADMIN'" v-on:click = "showRegisterUser" class="btn btn-info"> Register new users </button>
		<button v-if = "this.role === 'ADMIN'" v-on:click = "createSportsFacility" class="btn btn-info"> Create Sports Facility </button>
		<button v-if = "this.role === 'ADMIN'" v-on:click = "showAllUsers" class="btn btn-info"> View all users </button>
		
		
		<button v-if = "this.role === 'COACH'" v-on:click = "showCoachTrainings" class="btn btn-info"> View all trainings </button>
		
		
		<button v-if = "this.role === 'MANAGER'" v-on:click = "managerFacility" class="btn btn-info"> View my facility </button>
				
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
						<select v-model="searchType" class="form-select" aria-label="Default select example">
						  <option v-for="t in types">{{t}}</option>
						</select>
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
		
		<div>
			<label for="openGymsSwitch" id="switchLabel">Show only open gyms:</label>
			<label class="switch" >
				<input type="checkbox" id="openGymsSwitch" v-model="isOpenChecked">
				<span class="slider round"></span>
			</label>
			
		</div>

		<div v-for="(f, index) in facilities" id="list-div" v-if="!(!f.status && isOpenChecked)">
			<div class="img-div">
				<router-link :to="{ name: 'facilityPage', params: { facilityID: f.id } }">
					<img :src="'images/' + f.logoPath"/>
				</router-link>
			</div>
			<div id="info-div">
				<div id="title-div">
					<router-link class="nav-link" :to="{ name: 'facilityPage', params: { facilityID: f.id } }">
						{{ f.name }}
					</router-link>
					<p class="so-p" id="sf-status" v-if="f.status" style="margin-bottom: 10px;"> Open </p>
					<p class="so-p" id="sf-status" style="margin-bottom: 10px; background-color: #ff8d8d; border: thick solid #ff4747;" v-else> Closed </p>
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
		showAllUsers: function() {
			router.push(`/allUsers`)
		},
		showLoginUser: function() {
			router.push(`/login`);
		},
		showCoachTrainings: function(){
			router.push(`/trainings`);	
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

					this.sortName = this.buttonReset('nameButton', 'A-Z');
					this.sortLocation = this.buttonReset('locationButton', 'A-Z');
					this.sortRating = this.buttonReset('ratingButton', '▼');
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

					this.sortLocation = this.buttonReset('locationButton', 'A-Z');
					this.sortRating = this.buttonReset('ratingButton', '▼');

					this.facilitySort(this.sortName, this.sortLocation, this.sortRating);
					break;
				case 'locationButton':
					this.sortLocation = this.sortToggler(this.sortLocation, window.event.target, 'A-Z', 'Z-A');

					this.sortName = this.buttonReset('nameButton', 'A-Z');
					this.sortRating = this.buttonReset('ratingButton', '▼');

					this.facilitySort(this.sortName, this.sortLocation, this.sortRating);
					break;
				case 'ratingButton':
					this.sortRating = this.sortToggler(this.sortRating, window.event.target, '▼', '▲');

					this.sortName = this.buttonReset('nameButton', 'A-Z');
					this.sortLocation = this.buttonReset('locationButton', 'A-Z');

					this.facilitySort(this.sortName, this.sortLocation, this.sortRating);
					break;
			}

		},
		sortToggler: function(sorty, trigger, ascending, descending) {
			event.preventDefault();
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
			switch(sortRating) {
				case 0:
					if(sortName === 0 && sortLocation === 0)
						this.searchForFacility();
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
					if(sortName === 0 && sortRating === 0)
						this.searchForFacility();
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
					if(sortLocation === 0 && sortRating === 0)
						this.searchForFacility();
					break;
				case 1:
					this.facilities.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case 2:
					this.facilities.sort((a, b) => b.name.localeCompare(a.name));
					break;
			}
		},
		buttonReset: function(buttonId, ascending) {
			document.getElementById(buttonId).setAttribute('class', 'btn btn-light btn-outline-dark');
			document.getElementById(buttonId).textContent = ascending;
			return 0;
		},
		
		managerFacility: function() {
			var toParse = localStorage.getItem('jwt');
			if(toParse) {
				axios.get('/rest/users/managerfacility/', {
						params: {username: JSON.parse(toParse).username},
						headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}
					})
					.then(response => {
						console.log(response.data);
						if(response.data === null) {
							alert("User does not have any facility to run");
						} else if(response.data === "nothing") {
							alert("User session expired");
							//logout user
						}	else {
							router.push( {name:'facilityPage',  params: {facilityID: response.data}});
						}
					});
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
				this.facilities = response.data;
				// console.log(this.facilities);
				this.facilities.sort(function(a,b) {
					return b.status - a.status;
				})
			});
			
		axios.get('rest/facilities/types/')
			.then(response => {
				this.types = response.data;
			});
    }
});