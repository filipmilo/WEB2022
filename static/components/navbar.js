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
            <router-link class="nav-link" to="/login" v-if="!checkLoginStatus()">Login</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
        </li>
    </ul>
    </div>
    </nav>
</div>
`
	, 
	methods : {
		checkLoginStatus: function() {
            var temp = localStorage.getItem('jwt');
            if(temp){
                return true;
            } else {
                return false;
            }
        }
	},
	mounted () {
		
    }
});