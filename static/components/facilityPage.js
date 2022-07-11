Vue.component("Facilitypage", {
	data: function () {
		    return {
				facility: null,
				firstWordOfName: '',
				contents: '',
				isManagerPage: false,
				enableAddContent: false,
				selectedIndex: 0,
				user: '',
				jwtt: '',
				role: '',
				
				content: {
					name: '',
					type: '',
					duration: '',
					coach: '',
					facilityId: '',
					description: '',
					image: '',
				},

				newTraining: {
					applicationDate: '',
					training: '',
					customer: '',
					coach: ''
				},
				
				allCoaches: [],
				isTraining: false,
				isEdit: false,
				
				currContentId: ''
				
		  }
	},
	template: ` 
<div>
	<div class="facilityPage-div" v-if="facility !== null">
		<div id="slideshowDiv">
			<div id="carouselExampleIndicators" class="carousel" data-bs-ride="carousel">
				<ol class="carousel-indicators">
					<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
					<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
					<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
				</ol>
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img class="d-block" :src="'images/' + this.firstWordOfName + '0.png'" alt="First slide">
					</div>
					<div class="carousel-item">
						<img class="d-block" :src="'images/' + this.firstWordOfName + '1.png'" alt="Second slide">
					</div>
					<div class="carousel-item">
						<img class="d-block" :src="'images/' + this.firstWordOfName + '2.png'" alt="Third slide">
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
				</a>
			</div>
		</div>
		<div class="infoDiv">
			<p id="separator"></p>
			<div id="titleDiv">
				<img :src="'images/' + facility.logoPath" />
				<div>
					<h1> {{ facility.name }} </h1>
					<p id="separator-title"></p>
					<div id="ratingDiv">
						<p id="sf-rating"> Rating: {{ facility.avgRating }} ★ </p>
						<p id="sf-status" v-if="facility.status"> Open </p>
						<p id="sf-status" style="background-color: #ff8d8d; border: thick solid #ff4747;" v-else> Closed </p>
					</div>
				</div>
			</div>
			
			
			<button type="button" class="btn btn-primary active" v-if="isManagerPage"  @click="addContentEnable">Add content</button>
			<div id="new-content-div" v-if="enableAddContent">
				<form>
					<table>
						<tr>
							<td>
								<label for="name-i">Name: </label>
								<input type="text" id="name-i" v-model="content.name"></input>
							</td>
						</tr>
						<tr>
							<td>
								<label for="training-box">Training: </label>
								<input type="checkbox" id="training-box" v-model="isTraining">
				
							</td>
							<td v-if="!isTraining">
								<label for="type-i" >Type: </label>
								<input type="text" id="type-i"  v-model="content.type"></input>
							</td>
								
						</tr>
						<tr>
							<td v-if="isTraining">
								<input type="radio" value="training1" v-model="content.type" :checked="content.type === 'training1'">Personal</input>
								<input type="radio" value="training2" v-model="content.type">Group</input>
							</td>
						</tr>
						<tr>
							<td>
								<label for="duration-i">Duration: </label>
								<input type="text" id="duration-i" v-model="content.duration"></input>
							</td>
						</tr>
						<tr>
							<td>
								<label for="description-i">Description: </label>
								<input type="text" id="description-i" v-model="content.description"></input>
							</td>
						</tr>
						
						<tr>
							<td>
								<label for="choose-i">Add image: </label>
								<input type="file" id="choose-i" v-on:change="loadLogo"></input>
							</td>
						</tr>	
						
						<tr v-if="isTraining">
							<td>
								<label for="coach-i">If training choose coach: </label>
								
								<select v-model="content.coach" id="coach-i" class="form-select" aria-label="Default select example">
								  <option v-for="c in allCoaches">{{c.username}}</option>
								</select>
							</td>
						</tr>	
						
						<tr>
							<td colspan="2" style="text-align:center">
								<input type="submit" value="Post" @click="addContent"  class="btn btn-info"></input>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<h1>Content:</h1>
			<h2 v-if="contents === null || contents === ''">There is no regular content</h2>
			<div class="horizontal-div" v-if="contents != null && contents != ''" style="flex-wrap: wrap;">
				<div v-for="(c, index) in contents" @click="enableEdit(c)">
					<p class="content-class-lead" v-if="index === 0"> {{ c.name }} </p>
					<p class="content-class" v-else> {{ c.name }} </p>
				</div>
			</div>
			
			
			<div class="horizontal-div">
				<div id="workingHoursDiv">
					<h1>Working Hours:</h1>
					<p id="separator-hours"></p>
					<div class="daysDiv">
						<div class="days">
							<p>Monday:</p>
							<p>Tuesday:</p>
							<p>Wednesday:</p>
							<p>Thursday:</p>
							<p>Friday:</p>
							<p>Saturday:</p>
							<p>Sunday:</p>
						</div>
						<div class="hours" style="margin-left: auto; margin-right: 5px;">
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
						</div>
					</div>
				</div>
				<div id="locationDiv">
					<h1>Location:</h1>
					<p id="separator-hours"></p>
					<div id="address-div">
						<p style="font-size: 24px; font-weight: bold; padding: 0;">Address: </p>
						<p style="font-size: 24px; font-weight: 500; padding: 0; margin-left: 10px;">{{ facility.location.address }}</p>
					</div>
				</div>
			</div>
			<div class="list-group" v-if="role === 'CUSTOMER'">
				<a class="list-group-item list-group-item-action"
				v-on:click="setTraining(null); selectedIndex = 0;" v-bind:class="{ 'active' : isSelected(0) }">No training</a>
				<a class="list-group-item list-group-item-action"  v-for="(c, index) in contents"
				v-on:click="setTraining(c); selectedIndex = index+1;" v-bind:class="{ 'active' : isSelected(index+1)}" v-if="c.type === 'training1' || c.type === 'training2'">{{ c.name }}</a>
			</div>
			<div style="margin-top: 100px; background-color: lightcoral; width: 900px; margin-left: auto; margin-right: auto;" v-if="role === 'CUSTOMER'">
				<button id="schedule-button" class="btn btn-info" @click="scheduleTraining();" :disabled="isSelected(0)">Schedule Training</button>
			</div>
		</div>
		
		<comments></comments>
    </div>
</div>
`
	, 
	methods : {
		addContentEnable: function() {
			if(!this.enableAddContent) {
				this.enableAddContent = true;
				
				this.content.name = '';
				this.content.type = '';
				this.content.duration = '';
				this.content.coach = '';
				this.content.facilityId = '';
				this.content.description = '';
				this.content.image = '';
				
				this.isTraining = false;
				this.isEdit = false;
				
				
				var toParse = localStorage.getItem('jwt');
				
				axios.get("/rest/users/coaches/", {
					headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}
				})
				.then(response => {
					this.allCoaches = response.data;
				});		
			}
			else 
				this.enableAddContent = false;	
				
			
		},
		enableEdit: function(content) {
			if(this.isManagerPage == false) return;
			this.currContentId = content.id;
			this.isEdit = true;
			this.enableAddContent = true;
			
			this.content.name = content.name;
			this.content.type = content.type;
			this.content.duration = content.duration;
			this.content.coach = content.coach;
			this.content.facilityId = content.facilityId;
			this.content.description = content.description;
			this.content.image = content.image;
			
			
			if(this.content.type === 'training1' || this.content.type === 'training2') {
				this.isTraining = true;
			}
			
			var toParse = localStorage.getItem('jwt');
				
				axios.get("/rest/users/coaches/", {
					headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}
				})
				.then(response => {
					this.allCoaches = response.data;
				});	
			
			
		}
		,
		loadLogo: function(event) {
			var files = event.target.files;
			this.content.image = files[0].name;
			console.log(this.content.image);
		},
		addContent: function(){
			event.preventDefault();
			if((this.content.name === '' || this.content.type === '' || this.content.image === '') && !this.isTraining) {
				alert("Name, type and image must be selected");
				return;
			} else if ((this.content.name === '' || this.content.image === '' || this.content.coach === '') && this.isTraining){
				alert("Name, image, date and coach must be selected");
				return;
			}
			
			this.content.facilityId = this.facility.id;
			
			if(this.isTraining && (this.content.type != 'training1' && this.content.type != 'training2')) {
				alert("Please select a valid training");
				return;
			}
			
			if(!this.isTraining){
				this.content.coach = 'nothing';
			}
			
			var toParse = localStorage.getItem('jwt');
			if(!toParse){
				alert("ERROR USER NOT LOGGED IN");
				return;	
			}
			
			if(!this.isEdit){
				axios.post("/rest/facilities/newcontent/", this.content, {
					headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}					
				})
				.then(response => {
					console.log(response);
					router.push('/');
				});
			} else {
				axios.post("/rest/facilities/editcontent/", this.content, {
					params: {id: this.currContentId},
					headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}					
				})
				.then(response => {
					console.log(response);
					router.push('/');
				});
			}
			
		},
		isSelected(index) {
			return index === this.selectedIndex;
		},
		setTraining: function(c) {
			this.content = c;
			console.log(this.content);
		},
		scheduleTraining: function() {

			let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

			this.newTraining.applicationDate = yyyy + '-' + mm + '-' + dd;

			this.newTraining.training = this.content.id;

			this.newTraining.customer = this.user;
			this.newTraining.coach = this.content.coach;

			console.log(this.newTraining);

			axios.get("/rest/memberships/checkValidity/", {
				params: {username: this.user},
				headers: {Authorization: `Bearer ${this.jwtt}`}					
			})
			.then(response => {
				console.log('isValid: ' + response.data);

				if(response.data === false)
					return;

				axios.post("/rest/memberships/reduceVisits/", null, {
					params: {username: this.user},
					headers: {Authorization: `Bearer ${this.jwtt}`}					
				})
				.then(response => {
					console.log('remainingVisits: ' + response.data.remainingVisits);

					axios.post("/rest/trainingHistory/new/", this.newTraining, {
						headers: {Authorization: `Bearer ${this.jwtt}`}					
					})
					.then(response => {
						alert('Training scheduled!')
						axios.post("/rest/users/addTraining/", null, {
							params: {username: this.user, training: this.newTraining.training},
							headers: {Authorization: `Bearer ${this.jwtt}`}					
						})
						.then(response => {
						});
					});
				});
			});


		}
	},
	mounted () {
		console.log(this.$route.params.facilityID);
		axios.get("/rest/facilities/getById/", {params: { id: this.$route.params.facilityID}})
		.then(response => {
			this.facility = response.data;
			this.firstWordOfName = (this.facility.name).substring(0, this.facility.name.indexOf(' '));

			if(this.firstWordOfName === '')
				this.firstWordOfName = this.facility.name;

			console.log(this.firstWordOfName);

			//this.contents = this.facility.content.split(',');
			
			axios.get("/rest/facilities/content/", {params: {content: this.facility.content}})
			.then(response => {
				this.contents = response.data;
			});
			
		});

		var toParse = localStorage.getItem('jwt');
		this.jwtt = JSON.parse(toParse).jwt;
		this.role = JSON.parse(toParse).role;
		
		if(toParse) {
			axios.get("/rest/users/managerfacility/", {params: {username: JSON.parse(toParse).username}})
				.then(response => {
					if(response.data != null && this.$route.params.facilityID === response.data) {
						this.isManagerPage = true;
					}
				});
		}

		this.user = this.username = JSON.parse(toParse).username;

		
	 }
});