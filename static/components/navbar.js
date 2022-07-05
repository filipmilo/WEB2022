Vue.component("Navbar", {
	data: function () {
		    return {
			isLoggedIn: false,
			username: '',
		  }
	},
	template: ` 
<div id="navbar-maindiv">
	<nav class="navbar navbar-expand-lg navbar-light" id="navbar">
		<a class="nav-link" href="/" id="home-navbar">
			<img src="logo.png" width="64" height="64"/>
			<p>Home</p>
		</a>

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
		
			alert("Logged out");
			
			router.push("/");
        }
	},
	mounted () {
		var toParse = localStorage.getItem('jwt');
		
		if(toParse) 
			this.isLoggedIn = true;
		else
			this.isLoggedIn = false;
		
		this.$root.$on('messageFromChild1ToChild2', (text) => {
			if(text === 'false') {
				this.isLoggedIn = false;
			} else if (text === 'true') {
				this.isLoggedIn = true;
			}
		});

		this.$root.$on('usernameMessage', (text) => {
			this.username = text;
		});
    }
});