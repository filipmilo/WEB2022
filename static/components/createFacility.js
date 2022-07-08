Vue.component("Createfacility", {
	data: function () {
		    return {
			managers: null,
			selectedIndex: 0,
			jwtt: '',
			sportsFacility: {
				name: '',
				type: '',
				content: '',
				status: false,
				location: {
					longitude: 0.0,
					latitude: 0.0,
					address: '',
				},
				logoPath: '',
				workingHours: '',
				manager: ''
			}
		  }
	},
	template: ` 
<div>
	<div id="createFacility-div">
		<form>
			<table>
				<tr>
					<td>
						<p>Name: </p>
						<input type="text" v-model = "sportsFacility.name"></input>
					</td>
				</tr>
				<tr>
					<td>
						<p>Type: </p>
						<input type="text" v-model = "sportsFacility.type"></input>
					</td>
				</tr>
				<tr>
					<td>
						<p>Location: </p>
						<input type="text" v-model = "sportsFacility.location.address"></input>
					</td>
				</tr>
				<tr>
					<td>
						<p>Choose Logo: </p>
						<input type="file" v-on:change="loadLogo"></input>
					</td>
				</tr>
				<tr>
					<div class="list-group">
						<a href="#" class="list-group-item list-group-item-action" v-for="(m, index) in this.managers" 
						v-on:click="setManager(m); selectedIndex = index;" v-bind:class="{ 'active' : isSelected(index) }">{{ m.name }} {{ m.surname }}</a>
					</div>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center">
						<input type="submit" value="Create" v-on:click = "createFacility" class="btn btn-info"></input>
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>
`
	, 
	methods : {
		loadLogo: function(event) {
			var files = event.target.files;
			this.sportsFacility.logoPath = files[0].name;
			console.log(this.sportsFacility.logoPath);
		},
		createFacility: function() {
			event.preventDefault();
			console.log(this.sportsFacility);
			axios.post('/rest/facilities/new/', this.sportsFacility, {
				headers: { Authorization: `Bearer ${this.jwtt}` }
			})
			.then(response => {
				router.push(`/`);
			})
		},
		setManager: function(m) {
			this.sportsFacility.manager = m.username;
			// console.log(this.sportsFacility.selectedManager);
		},
		isSelected(index) {
			return index === this.selectedIndex;
		}
	},
	mounted () {
		var toParse = localStorage.getItem('jwt');
		if(!toParse)
			alert("ERROR USER NOT LOGGED IN");
		else {
			this.jwtt = JSON.parse(toParse).jwt;
		}

		axios.get("/rest/users/managers/", {
			headers: { Authorization: `Bearer ${this.jwtt}` }
		}) 
		.then(response => {
			this.managers = response.data;
			for(const e of this.managers) {
				console.log(e.username);
			}
			
			// let temp = [...this.managers];

			// for(i = temp.length - 1; i >= 0; --i) {
			// 	if(temp[i].role !== 'MANAGER') {
			// 		let index = temp.indexOf(temp[i]);
			// 		this.managers.splice(index, 1);
			// 	}
			// }
		});
    }
});