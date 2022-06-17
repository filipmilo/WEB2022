Vue.component("Register", {
	data: function () {
		    return {
			message: "test",
			user: {
				username: "",
				password: "",
				name: "",
				surname: "",
				gender: 'Male',
				dateOfBirth: ""
				}
		    }
	},
	template: ` 
<div>
	<form>
		<table>
			<tr>
				<td>
					<p>Username: </p>
					<input type="text" v-model = "user.username"></input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Password: </p>
					<input type="password" v-model = "user.password"></input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Name: </p>
					<input type="text" v-model = "user.name"></input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Surname: </p>
					<input type="text" v-model = "user.surname"></input>
				</td>
			</tr>
			<tr>
				<td>
					<input type="radio" value="Male" v-model="user.gender" :checked="gender === 'Male'">Male</input>
					<input type="radio" value="Female" v-model="user.gender">Female</input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Date Of Birth: </p>
					<input type="date" v-model="user.dateOfBirth"></input>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="text-align:center">
					<input type="submit" value="Register" v-on:click = "addUser"></input>
				</td>
			</tr>
		</table>
	</form>
</div>
`
	, 
	methods : {
		addUser : function() {
    		axios
    		.post('rest/users/register/', this.user)
    		.then(response => (router.push(`/`)));
    		
    		console.log(this.user);
    	}
	},
	mounted () {
		/*this.id = this.$route.params.id;
		if (this.id != -1){
	        axios
	          .get('rest/products/' + this.id)
	          .then(response => (this.product = response.data))
		}*/
    }
});