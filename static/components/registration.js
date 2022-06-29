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
<div id="register-div">
	<div class="inner-div">
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
				<tr v-if = "this.user.role === 'ADMIN'">
					<td colspan="2" style="text-align:center">
						<p>Role: </p>
						<select name="roles" v-model="user.role">
							<option value="MANAGER">Manager</option>
							<option value="COACH">Coach</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center">
						<input type="submit" value="Register" v-on:click = "registerUser" class="btn btn-info"></input>
					</td>
				</tr>
				
			</table>
		</form>

		<div v-if = "this.user.role === 'CUSTOMER'">
			<p>Already have an account?</p>
			<button  v-on:click = "showLogin" class="btn btn-info"> Login here. </button>
		</div>
	</div>
</div>
`
	,
	methods: {
		registerUser: function () {
			event.preventDefault();
			axios
				.post('rest/users/register/', this.user)
				.then(response => {
					router.push(`/`);
				})
		},
		showLogin: function () {
			router.push(`/login`);
		}
	},
	mounted() {
		this.user.role = this.$route.params.role;

		var toParse = localStorage.getItem('jwt');
		var role;

		if (!toParse)
			role = 'CUSTOMER'
		else
			role = JSON.parse(toParse).role;

		this.user.role = role;

		console.log(this.user.role)
	}
});