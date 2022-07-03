Vue.component("Createfacility", {
	data: function () {
		    return {
			sportsFacility: {
				name: '',
				type: '',
				location: '',
				logoPath: ''
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
						<input type="text" v-model = "sportsFacility.location"></input>
					</td>
				</tr>
				<tr>
					<td>
						<p>Choose Logo: </p>
						<input type="file" v-on:change="loadLogo"></input>
					</td>
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
			axios.post('rest/facilities/create/', this.sportsFacility)
			.then(response => {
				router.push(`/`);
			})
		}
	},
	mounted () {
    }
});