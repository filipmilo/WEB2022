Vue.component("Mainpage", {
	data: function () {
		    return {
				message: "Test",
				isAdmin: true
		    }
	},
	template: ` 
<div>
	<button v-on:click = "showRegisterUser"> Login here. </button>
</div>
`
	, 
	methods : {
		showRegisterUser: function() {
			router.push(`/${this.isAdmin}`);
		}
	},
	mounted () {
		console.log("MainPage Works")
    }
});