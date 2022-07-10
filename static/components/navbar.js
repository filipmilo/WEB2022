Vue.component("Navbar", {
	data: function () {
		    return {
			isLoggedIn: false,
			username: '',
			role: ''
		  }
	},
	template: ` 
<div id="navbar-maindiv">
	<nav class="navbar navbar-expand-lg navbar-light" id="navbar">
		<a class="nav-link" href="/" id="home-navbar">
			<img src="logo.png" width="64" height="64"/>
			<p>Home</p>
		</a>

		<div>
			<button class="btn btn-outline-info" @click="$router.push('/membership')" v-if="this.role === 'CUSTOMER'" id="membership-button">Membership</button>
		</div>

		<div class="collapse navbar-collapse" id="username-div">
			<div class="dropdown" id="dropdown-div" v-if="isLoggedIn">
				<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
					{{ this.username }}
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<li class="nav-item">
						<button class="btn btn-outline-info" @click="$router.push('/profile')" v-if="isLoggedIn" id="profile-button">Profile</button>
					</li>
					<li class="nav-item">
						<button class="btn btn-outline-info" @click="logoutUser" v-if="isLoggedIn"  id="logout-button">Logout</button>
					</li>
				</ul>
			</div>
			<ul class="navbar-nav ms-auto" v-if="!isLoggedIn">
				<li class="nav-item">
					<button class="btn btn-info" @click="$router.push('/login')" v-if="!isLoggedIn" id="loginButton">Login</button>
				</li>
				
				<li class="nav-item">
					<button class="btn btn-info" @click="$router.push('/register')" v-if="!isLoggedIn" id="register-button">Register</button>
				</li>
			</ul>
		</div>
    </nav>
</div>
`
	, 
	methods : {
		logoutUser: function() {
            localStorage.removeItem('jwt');
            this.isLoggedIn = false;
			
			this.$root.$emit('messageFromChild2ToChild1', 'false');
			this.role = '';
		
			alert("Logged out");
			
			router.push("/");
        }
	},
	mounted () {
		var toParse = localStorage.getItem('jwt');
		
		if(toParse) {
			this.isLoggedIn = true;
			this.username = JSON.parse(toParse).username;
			this.role = JSON.parse(toParse).role;
		}
		else{
			this.isLoggedIn = false;
		}
			
		
		this.$root.$on('messageFromChild1ToChild2', (text) => {
			if(text === 'false') {
				this.isLoggedIn = false;
			} else if (text === 'true') {
				this.isLoggedIn = true;

				let roleParse = localStorage.getItem('jwt');
				this.role = JSON.parse(roleParse).role;
			}
		});

		this.$root.$on('usernameMessage', (text) => {
			this.username = text;
		});

		console.log("The role in navbar is:" + this.role);
    }
});