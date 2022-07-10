Vue.component("Membership", {
	data: function () {
		    return {
		  }
	},
	template: ` 
<div id="membershipPage-div">
	<div id="buttons-div">
        <div style="background-color: lightcoral;">
            <button class="btn btn-info" @click="$router.push('/enroll')" id="enroll-button">Buy a membership</button>
        </div>
        <button class="btn btn-info" @click="$router.push('/activeMembership')" id="activeMembership-button">View active membership</button>
    </div>
    
</div>
`
	, 
	methods : {
	},
	mounted () {

    }
});