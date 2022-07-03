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
					<input type="text" v-model = "profileData.username" :disabled="!isEdit"></input>
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
					<input type="text" v-model = "profileData.gender" :disabled="!isEdit"></input>
				</td>
			</tr>
			
			<tr>
				<td>
					<p>Date of birth: </p>
					<input type="text" v-model = "profileData.dateOfBirth" :disabled="!isEdit"></input>
				</td>
			</tr>
			
			
			
			<tr>
				<td colspan="1" style="text-align:center">
					<input type="submit" value="Confirm edit" v-if="isEdit"  id="login-button" class="btn btn-info"></input>
				</td>
				
				<td colspan="1" style="text-align:center">
					<button class="btn btn-info" v-if="isEdit" @click="cancelEdit" >Cancel</button>
				</td>
				
				<td colspan="1" style="text-align:center">
					<button class="btn btn-info" v-if="!isEdit" @click="editEnable" >Edit</button>
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
			
		}
	},
	mounted () {
		
    }
});