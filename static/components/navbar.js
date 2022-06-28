Vue.component("Navbar", {
	data: function () {
		    return {
			isLoggedIn: false
		  }
	},
	template: ` 
<div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <a class="nav-link" href="/">
    <img src="logo.png" width="48" height="48"/>
    Sportify
    </a>

    <div class="collapse navbar-collapse">
    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!isLoggedIn">Login</router-link>
        </li>
        
        <li class="nav-item">
            <router-link class="nav-link" to="/" v-on:click.native="logoutUser" v-if="isLoggedIn">Logout</router-link>
        </li>
        
        <li class="nav-item">
            <router-link class="nav-link" to="/register" v-if="!isLoggedIn">Register</router-link>
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