Vue.component("Mainpage", {
	data: function () {
		    return {
				message: "Test",
				role: "",
				facilities: null,
				search: "",
				filter: ""
		    }
	},
	template: ` 
<div>
	<button v-on:click = "showRegisterUser"> Register </button>
	<button v-on:click = "showLoginUser"> Login </button>
	<form>
		<input type="text" v-model="this.search"></input>
		<input type="text" v-model="this.filter"></input>
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
			axios.get("/rest/facilities/search/?search=" + this.search + "&filter=" + this.filter)
    		.then(response => {
				console.log(response);
			}).catch(error => {
    			console.log(error.response)
			});
		}
	},
	mounted () {
		this.role = this.$route.params.role;
		if(this.role == undefined){
			this.role = 'CUSTOMER';
		}
		
		axios
          .get('rest/facilities/')
          .then(response => (this.facilities = response.data))
		
    }
});