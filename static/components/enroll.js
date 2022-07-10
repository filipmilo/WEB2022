Vue.component("Enroll", {
	data: function () {
		    return {
                jwtt: '',
                duration: 1,
                membership: {
                    type: 'BRONZE',
                    dateOfPayment: '',
                    dateOfExpiration: '',
                    fee: 2000,
                    customer: '',
                    status: true,
                    dailyLimit: 1
                }
		  }
	},
	template: ` 
<div id="enroll-div">
    <div>
        <div>
            <button class="btn btn-info" @click="calculateDate()">Date</button>
            <h1 style="text-align: center;">Cost: {{ this.membership.fee }}</h1>
        </div>
        <div style="display: flex; margin-top: 30px;">
            <p style="margin-top: 10px; margin-left: 20px;">Choose membership duration: </p>
            <select v-model="duration" @change="calculateFee();" style="margin-left: 20px;">
                <option value="1">One month</option>
                <option value="3">Three months</option>
                <option value="6">Six months</option>
            </select>
        </div>
        <div style="display: flex; margin-top: 30px;">
            <p style="margin-top: 10px; margin-left: 20px;">Choose membership type: </p>
            <select v-model="membership.type" @change="calculateFee()" style="margin-left: 20px;">
                <option value="BRONZE">Bronze</option>
                <option value="SILVER">Silver</option>
                <option value="GOLD">Gold</option>
            </select>
        </div>
        <div>
            <button class="btn btn-info" @click="calculateDate(); enroll()">Pay</button>
        </div>
    </div>
</div>
`
	, 
	methods : {
        calculateDate: function() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

            this.membership.dateOfPayment = yyyy + '-' + mm + '-' + dd;

            today.setMonth(today.getMonth() + parseInt(this.duration));
            dd = String(today.getDate()).padStart(2, '0');
            mm = String(today.getMonth() + 1).padStart(2, '0');
            yyyy = today.getFullYear();

            this.membership.dateOfExpiration = yyyy + '-' + mm + '-' + dd;

            console.log(this.membership);
        },
        calculateFee: function() {
            let tempFee = this.membership.fee;
            console.log(tempFee);
            switch(this.membership.type) {
                case 'BRONZE':
                    this.membership.fee = 2000; 
                    break;
                case 'SILVER':
                    this.membership.fee = 3000; 
                    break;
                case 'GOLD':
                    this.membership.fee = 4000; 
                    break;
            }

            tempFee = this.membership.fee;
            switch(this.duration) {
                case '1':
                    break;
                case '3':
                    this.membership.fee = tempFee * 2.50; 
                    break;
                case '6':
                    this.membership.fee = tempFee * 5.00; 
                    break;
            }
        },
        enroll: function() {
            axios.post('rest/memberships/new/', this.membership, {
                headers: {Authorization: `Bearer ${this.jwtt}` }
            }).then(response => {
                console.log(response);
            })
        }
	},
	mounted () {
        var toParse = localStorage.getItem('jwt');

        if(!toParse)
			alert("ERROR USER NOT LOGGED IN");
		else {
			this.jwtt = JSON.parse(toParse).jwt;
		}
		
		if(toParse) {
			this.membership.customer = JSON.parse(toParse).username;
		}
		else{
            this.membership.customer = ''
		}
    }
});