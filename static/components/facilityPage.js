Vue.component("Facilitypage", {
	data: function () {
		    return {
                facilityID: ''
		  }
	},
	template: ` 
<div>
	<div class="facilityPage-div">
        <h1> {{ facilityID }} </h1>
    </div>
</div>
`
	, 
	methods : {
	},
	mounted () {
        this.facilityID = this.$route.params.facilityID;
    }
});