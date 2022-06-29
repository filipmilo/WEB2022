Vue.component("Navbar", {
	data: function () {
		    return {
			isLoggedIn: false
		  }
	},
	template: ` 
<div id="navbar-div">
    <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
    <a class="nav-link" href="/" id="home-navbar">
		<img src="logo.png" width="64" height="64"/>
		<p>Home</p>
    </a>

    <div class="collapse navbar-collapse">
    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
			<button class="btn btn-info" @click="$router.push('/login')" v-if="!isLoggedIn" id="loginButton">Login</button>
            <!--<router-link class="nav-link" to="/login" tag="button" v-if="!isLoggedIn">Login</router-link>-->
        </li>
        
        <li class="nav-item">
            <router-link class="nav-link" to="/" v-on:click.native="logoutUser" v-if="isLoggedIn">Logout</router-link>
        </li>
        
        <li class="nav-item">
			<button class="btn btn-info" @click="$router.push('/register')" v-if="!isLoggedIn" id="register-button">Register</button>
            <!--<router-link class="nav-link" to="/register" v-if="!isLoggedIn">Register</router-link>-->
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
    }
});