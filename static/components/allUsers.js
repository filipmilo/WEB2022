Vue.component("Allusers", {
	data: function () {
		    return {
			users: null
		  }
	},
	template: ` 
<div>
	<div v-for="(u, index) in users" id="profiles-div">
			<div id="info-div">
				<div id="title-div">
						<h1>{{ u.name }} {{u.surname}}</h1>				
				</div>
				<hr class="separator"></hr>
				<!--<div id="type-content-div">
					<p class="so-p" id="p-type"> Type: {{ f.type }} </p>
					<p class="so-p" id="p-content"> Content: {{ f.content }} </p>
				</div>-->
				<p class="so-p" id="p-location"> Username: {{ u.username }} </p>
				<p class="so-p" id="p-avgRating"> Password: {{ u.password }} </p>
				<p class="so-p" id="p-workingHours"> Role: {{ u.role }} </p>
				<p class="so-p" id="p-workingHours"> Date of birth: {{ u.dateOfBirth }} </p>
				<p class="so-p" id="p-workingHours"> Gender: {{ u.gender }} </p>
				
				<p class="so-p" id="p-workingHours"> Points: {{ u.points }} </p>
				
				
			</div>
			
		</div>
	
</div>
`
	, 
	methods : {
		
	},
	mounted () {
		var toParse = localStorage.getItem('jwt');
		var jwtt = '';
		if(!toParse)
			alert("ERROR USER NOT LOGGED IN");
		else 
			jwtt = JSON.parse(toParse).jwt;
		
		axios.get('/rest/users/', {
				headers: {Authorization: `Bearer ${jwtt}`}
			})
			.then(response => {
				if(response.data === null) {
					alert("User session expired");
					localStorage.removeItem('jwt');
					this.$root.$emit('messageFromChild1ToChild2', 'false');
					router.push('/');
				}
				this.users = response.data;
				console.log(this.users);
			});
    }
});