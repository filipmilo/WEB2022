Vue.component("Trainings", {
	data: function () {
		    return {
			trainings: null
		  }
	},
	template: 
` 
<div>
	
	<div v-for="(t, index) in trainings" id="profiles-div">
			<div id="info-div">
			
				<div id="title-div">
						<h1>{{ t.name }}</h1>		
						<button id="cancel-button" @click="deleteTraining(t.id, t.facility)" class="btn btn-danger" v-if="t.type === 'training1'">Cancel</button>		
				</div>
				<hr class="separator"></hr>
			
				<p class="so-p" id="p-location" v-if="t.type === 'training1'"> Type: Personal training </p>
				<p class="so-p" id="p-location" v-else> Type: Group training </p>
				
				<p class="so-p" id="p-avgRating"> Duration: {{ t.duration }} </p>
				<p class="so-p" id="p-workingHours"> Coach: {{ t.coach }} </p>
				<p class="so-p" id="p-workingHours"> Facility: {{ t.facility }} </p>
				<p class="so-p" id="p-workingHours"> Description: {{ t.description }} </p>
				

			</div>
			
		</div>
</div>
`
	, 
	methods : {
		deleteTraining: function(trainingIdd, facilityIdd) {
			console.log(trainingIdd);
			console.log(facilityIdd);
			
			
			var toParse = localStorage.getItem('jwt');
			if(toParse){
				axios.post("/rest/facilities/deletetraining/",null ,{
					params:{trainingId: trainingIdd, facilityId: facilityIdd},
					headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}
				})
				.then(response => {
					console.log(response);
					
				});
			}
		}	
		
	},
	mounted () {
		var toParse = localStorage.getItem('jwt');
		
		if(toParse) {
			axios.get("/rest/facilities/coachtrainings/", {
				params: {username: JSON.parse(toParse).username},
				headers: {Authorization: `Bearer ${JSON.parse(toParse).jwt}`}
			})
			.then(response =>{
				console.log(response.data);
				this.trainings = response.data
			});
		}
		
    }
});