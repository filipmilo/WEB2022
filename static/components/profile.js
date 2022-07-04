Vue.component("Profile", {
	data: function () {
		    return {
				profileData: {
					username : '',
		 			password : '',
					name : '',
					surname : '',
					gender : '',
					dateOfBirth : '',
					role : ''
				},
				
				fullName: 'Milos Bojic',
				isEdit: false,
				
				usernameBackup: '',
				passwordBackup: '',
				nameBackup : '',
				surnameBackup : '',
				genderBackup : '',
				dateOfBirthBackup : '',
				roleBackup : ''
				
			}
	},
	template: 
` 
<div id="profile-div">
	<h1>Profile: {{fullName}}</h1>
	<h1>Role: {{profileData.role}}</h1>
	
	<form>
		<table>
			<tr>
				<td>
					<p>Username: </p>
					<input type="text" v-model = "profileData.username" :disabled="true"></input>
				</td>
			</tr>
			<tr>
				<td>
					<p>Password: </p>
					<input type="password" v-model = "profileData.password" :disabled="!isEdit"></input>
				</td>
			</tr>
			
			<tr>
				<td>
					<p>Name: </p>
					<input type="text" v-model = "profileData.name" :disabled="!isEdit"></input>
				</td>
			</tr>
			
			<tr>
				<td>
					<p>Surname: </p>
					<input type="text" v-model = "profileData.surname" :disabled="!isEdit"></input>
				</td>
			</tr>
			
			<tr>
				<td>
					<p>Gender: </p>
					<!--<input type="text" v-model = "profileData.gender" :disabled="!isEdit"></input>-->
					<input type="radio" value="MALE" v-model="profileData.gender" :disabled="!isEdit" :checked="profileData.gender === 'MALE'">Male</input>
					<input type="radio" value="FEMALE" v-model="profileData.gender" :disabled="!isEdit" :checked="profileData.gender === 'FEMALE'">Female</input>
				</td>
			</tr>
			
			<tr>
				<td>
					<p>Date of birth: </p>
					<!--<input type="text" v-model = "profileData.dateOfBirth" :disabled="!isEdit"></input>-->
					<input type="date" v-model = "profileData.dateOfBirth" :disabled="!isEdit"></input>
				</td>
			</tr>
			
			
			
			<tr>
				<td colspan="2" style="text-align:center">
					<button class="btn btn-info" v-if="!isEdit" @click="editEnable" >Edit</button>
				</td>
			
				
			</tr>
			<tr>
				<td colspan="1" style="text-align:center">
					<input type="submit" value="Confirm edit" v-if="isEdit" @click="save" class="btn btn-info"></input>
				</td>
				
				<td colspan="1" style="text-align:center">
					<button class="btn btn-info" v-if="isEdit" @click="cancelEdit" >Cancel</button>
				</td>
			</tr>
		</table>
	</form>
	
</div>
`
	, 
	methods : {
		editEnable: function() {
			this.isEdit = true;
			this.usernameBackup = this.profileData.username;
			this.passwordBackup = this.profileData.password;
			this.nameBackup = this.profileData.name;
			this.surnameBackup = this.profileData.surname;
			this.genderBackup = this.profileData.gender;
			this.dateOfBirthBackup = this.profileData.dateOfBirth;
			this.roleBackup = this.profileData.role;
			
		},
		
		cancelEdit: function() {
			this.profileData.username = this.usernameBackup;
			this.profileData.password = this.passwordBackup;
			this.profileData.name = this.nameBackup;
			this.profileData.surname = this.surnameBackup;
			this.profileData.gender = this.genderBackup;
			this.profileData.dateOfBirth = this.dateOfBirthBackup;
			this.profileData.role = this.roleBackup;
			this.isEdit = false;
			
		},
		
		save: function() {
			var toParse = localStorage.getItem('jwt');
			var jwtt = '';
			if(!toParse)
				alert("ERROR USER NOT LOGGED IN");
			else {
				jwtt = JSON.parse(toParse).jwt;
			}
			
			axios.post("/rest/users/edit/", this.profileData, {
			  headers: { Authorization: `Bearer ${jwtt}` }
			})
			.then(response => {
				if(response === null) {
					alert("User session expired");
					localStorage.removeItem('jwt');
					this.$root.$emit('messageFromChild1ToChild2', 'false');
					router.push('/');
				}
				
				this.profileData = response.data;
				this.isEdit = false;
				this.fullName = this.profileData.name + ' ' + this.profileData.surname;	
				
				alert("Successfully saved!");
			});
		}
	},
	mounted () {
		//rest/users/getData/
		var toParse = localStorage.getItem('jwt');
		var jwtt = '';
		var usernamee = '';
		
		if(!toParse)
			alert("ERROR USER NOT LOGGED IN");
		else {
			jwtt = JSON.parse(toParse).jwt;
			usernamee = JSON.parse(toParse).username;
		}
			
		 axios.get("/rest/users/getData/",  {
				params: { username: usernamee},
				headers: {Authorization: `Bearer ${jwtt}`}
			})
	          .then(response => {
				if(response.data === null) {
					alert("User session expired");
					localStorage.removeItem('jwt');
					this.$root.$emit('messageFromChild1ToChild2', 'false');
					router.push('/');
				}	
				
				this.profileData = response.data;
				
				this.fullName = this.profileData.name + ' ' + this.profileData.surname;	
			});
    }
});