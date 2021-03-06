Vue.component("Enroll", {
	data: function () {
		    return {
                jwtt: '',
                duration: 1,
                selectedIndex: 0,
                customerType: '',
                membership: {
                    type: 'BASIC',
                    dateOfPayment: '',
                    dateOfExpiration: '',
                    fee: 2000,
                    customer: '',
                    status: true,
                    dailyLimit: 1,
                    remainingVisits: 15
                }
		  }
	},
	template: ` 
<div id="enroll-div">
    <div>
        <div style="margin-left: 45px;">
            <h1 v-if="customerType === 'BRONZE'">Customer level: BRONZE no discount</h1>
            <h1 v-else-if="customerType === 'SILVER'">Customer level: SILVER 3% discount </h1>
            <h1 v-else>Customer level: GOLD 5% discount </h1>
        </div>
        <div style="display: flex; margin-top: 30px; margin-left: 30px;">
            <p style="margin-top: 10px; margin-left: 20px;">Choose membership duration: </p>
            <select v-model="duration" @change="calculateFeeAndVisits(membership.remainingVisits);" style="margin-left: 20px;">
                <option value="1">One month</option>
                <option value="3">Three months</option>
                <option value="6">Six months</option>
            </select>
        </div>
        <div id="typeOfMembership-div">
            <div id="bronzeMem" class="membership-type-div" style="background-color: #E3AF66; filter: brightness(115%);
            border: blue solid thick;" v-on:click="isSelected(0, $event); calculateFeeAndVisits(15)">
                <h1>BASIC</h1>
                <p class="separator-membershiptype"></p>
                <div class="meminfo-div">
                    <p class="memebership-info-p">x15 sessions monthly</p>
                    <p class="memebership-info-p">x1 daily entrances</p>

                    <div style="margin-top: 250px; display: flex;">
                        <h1 style="margin-left: 10px; margin-top: 5px;" v-if="membership.type ==='BASIC'">Cost: {{ this.membership.fee }}</h1>
                        <img class="checkmark" src="images/checkmark.png" v-if="membership.type ==='BASIC'"/>
                    </div>
                </div>
            </div>
            <div id="silverMem" class="membership-type-div" style="background-color: #C0C0C0;" v-on:click="isSelected(1, $event); calculateFeeAndVisits(20);">
                <h1>ADVANCED</h1>
                <p class="separator-membershiptype"></p>
                <div class="meminfo-div">
                    <p class="memebership-info-p">x20 sessions monthly</p>
                    <p class="memebership-info-p">x1 daily entrances</p>

                    <div style="margin-top: 250px; display: flex;">
                        <h1 style="margin-left: 10px; margin-top: 5px;" v-if="membership.type ==='ADVANCED'">Cost: {{ this.membership.fee }}</h1>
                        <img class="checkmark" src="images/checkmark.png" v-if="membership.type ==='ADVANCED'"/>
                    </div>
                </div>
            </div>
            <div id="goldMem" class="membership-type-div" style="background-color: #FFD700;" v-on:click="isSelected(2, $event); calculateFeeAndVisits(30)">
                <h1>PRO</h1>
                <p class="separator-membershiptype"></p>
                <div class="meminfo-div">
                    <p class="memebership-info-p">x30 sessions monthly</p>
                    <p class="memebership-info-p">x1 daily entrances</p>

                    <div style="margin-top: 250px; display: flex;">
                        <h1 style="margin-left: 10px; margin-top: 5px;" v-if="membership.type ==='PRO'">Cost: {{ this.membership.fee }}</h1>
                        <img class="checkmark" src="images/checkmark.png" v-if="membership.type ==='PRO'"/>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 800px; margin-left: auto; margin-right: auto; margin-top: 40px;">
            <button id="payMembership-button" class="btn btn-info" @click="calculateDate(); enroll(); $router.push('/');">Pay</button>
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
        calculateFeeAndVisits: function(visits) {
            let tempFee = this.membership.fee;
            this.membership.remainingVisits = visits * this.duration;
            console.log(tempFee);
            switch(this.membership.type) {
                case 'BASIC':
                    this.membership.fee = 2000; 
                    break;
                case 'ADVANCED':
                    this.membership.fee = 3000; 
                    break;
                case 'PRO':
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

            switch(this.customerType) {
                case 'BRONZE':
                    break;
                case 'SILVER':
                    this.membership.fee = this.membership.fee - this.membership.fee * 0.03;
                    break;
                case 'GOLD':
                    this.membership.fee = this.membership.fee - this.membership.fee * 0.05; 
                    break;
            }
        },
        enroll: function() {
            axios.post('rest/memberships/new/', this.membership, {
                headers: {Authorization: `Bearer ${this.jwtt}` }
            }).then(response => {
                console.log(response);
            })
        },
        isSelected(index, event) {
			switch(index) {
                case 0:
                    event.currentTarget.style.filter = "brightness(115%)";
                    event.currentTarget.style.border = "blue solid thick";

                    document.getElementById("silverMem").style.filter = "brightness(100%)";
                    document.getElementById("silverMem").style.border = "black solid thick";

                    document.getElementById("goldMem").style.filter = "brightness(100%)";
                    document.getElementById("goldMem").style.border = "black solid thick";

                    this.membership.type = 'BASIC';
                    break;
                case 1:
                    document.getElementById("bronzeMem").style.filter = "brightness(100%)";
                    document.getElementById("bronzeMem").style.border = "black solid thick";

                    event.currentTarget.style.filter = "brightness(115%)";
                    event.currentTarget.style.border = "blue solid thick";

                    document.getElementById("goldMem").style.filter = "brightness(100%)";
                    document.getElementById("goldMem").style.border = "black solid thick";

                    this.membership.type = 'ADVANCED';
                    break;
                case 2:
                    document.getElementById("bronzeMem").style.filter = "brightness(100%)";
                    document.getElementById("bronzeMem").style.border = "black solid thick";

                    document.getElementById("silverMem").style.filter = "brightness(100%)";
                    document.getElementById("silverMem").style.border = "black solid thick";

                    event.currentTarget.style.filter = "brightness(115%)";
                    event.currentTarget.style.border = "blue solid thick";

                    this.membership.type = 'PRO';
                    break;
            }
		}
	},
	mounted () {
        var toParse = localStorage.getItem('jwt');
        var user = '';

        if(!toParse)
			alert("ERROR USER NOT LOGGED IN");
		else {
			this.jwtt = JSON.parse(toParse).jwt;
            user = JSON.parse(toParse).username;
		}
		
		if(toParse) {
			this.membership.customer = JSON.parse(toParse).username;
		}
		else{
            this.membership.customer = '';
		}

        axios.get('rest/users/getData/', {
            params: {username: user},
            headers: {Authorization: `Bearer ${this.jwtt}` }
        }).then(response => {
            this.customerType = response.data.customerType;
            switch(this.customerType) {
                case 'BRONZE':
                    break;
                case 'SILVER':
                    this.membership.fee = this.membership.fee - this.membership.fee * 0.03;
                    break;
                case 'GOLD':
                    this.membership.fee = this.membership.fee - this.membership.fee * 0.05; 
                    break;
            }
        })
    }
});