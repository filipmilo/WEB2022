Vue.component("Register", {
	data: function () {
		    return {
			message: "test",
			isAdmin: true,
			user: {
				username: "",
				password: "",
				name: "",
				surname: "",
				gender: 'MALE',
				dateofBirth: "",
				role: 'CUSTOMER'
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
					<input type="radio" value="MALE" v-model="user.gender" :checked="user.gender === 'MALE'">Male</input>
					<input type="radio" value="FEMALE" v-model="user.gender">Female</input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Date Of Birth: </p>
					<input type="date" v-model="user.dateofBirth"></input>
				</td>
			</tr>
			<tr v-if="this.isAdmin === true">
				<td colspan="2" style="text-align:center">
					<p>Role: </p>
					<select name="roles" >
					  	<option value="MANAGER" v-model="user.role">Manager</option>
					  	<option value="COACH" v-model="user.role">Coach</option>
					</select>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="text-align:center">
					<input type="submit" value="Register" v-on:click = "registerUser"></input>
				</td>
			</tr>
			
		</table>
	</form>
	
	<p>Already have an account?</p>
	<button v-on:click = "showLogin"> Login here. </button>
</div>
`
	, 
	methods : {
		registerUser : function() {
    		axios
    		.post('rest/users/register/', this.user)
    	},
    	showLogin: function() {
			router.push(`/login`);
		}
	},
	mounted () {
		this.isAdmin = this.$route.params.isAdmin;
		if(this.isAdmin == undefined){
			this.isAdmin = false;
		} else
			this.isAdmin = true;
    }
});