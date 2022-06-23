Vue.component("Login", {
	data: function () {
		    return {
			message: "test",
			role: "",
			login: {
				username: "",
				password: "",
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
					<input type="text" v-model = "login.username"></input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Password: </p>
					<input type="password" v-model = "login.password"></input>
				</td>
			</tr>
			
			<tr>
				<td colspan="2" style="text-align:center">
					<input type="submit" value="Login" v-on:click = "loginConfirm"></input>
				</td>
			</tr>
		</table>
	</form>
</div>
`
	, 
	methods : {
		loginConfirm : function() {
			event.preventDefault();
    		axios.get("/rest/users/login/", {params: { username: this.login.username, password: this.login.password }})
    		.then(response => {
				if(response.data != null) {
					console.log(response.data);
					this.role = response.data.role;
					var parsed = JSON.stringify(response.data);
					localStorage.setItem('jwt', parsed);
				
					router.push(`/`);
				} else {
					alert("Username or password are invalid");
				}
			}).catch(error => {
    			console.log(error.response)
			});
			
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