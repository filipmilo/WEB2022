Vue.component("Facilitypage", {
	data: function () {
		    return {
				facility: null,
				firstWordOfName: '',
				contents: ''
		  }
	},
	template: ` 
<div>
	<div class="facilityPage-div" v-if="facility !== null">
		<div id="slideshowDiv">
			<div id="carouselExampleIndicators" class="carousel" data-bs-ride="carousel">
				<ol class="carousel-indicators">
					<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
					<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
					<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
				</ol>
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img class="d-block" :src="'images/' + this.firstWordOfName + '0.png'" alt="First slide">
					</div>
					<div class="carousel-item">
						<img class="d-block" :src="'images/' + this.firstWordOfName + '1.png'" alt="Second slide">
					</div>
					<div class="carousel-item">
						<img class="d-block" :src="'images/' + this.firstWordOfName + '2.png'" alt="Third slide">
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
				</a>
			</div>
		</div>
		<div class="infoDiv">
			<p id="separator"></p>
			<div id="titleDiv">
				<img :src="'images/' + facility.logoPath" />
				<div>
					<h1> {{ facility.name }} </h1>
					<p id="separator-title"></p>
					<div id="ratingDiv">
						<p id="sf-rating"> Rating: {{ facility.avgRating }} ★ </p>
						<p id="sf-status" v-if="facility.status"> Open </p>
						<p id="sf-status" style="background-color: #ff8d8d; border: thick solid #ff4747;" v-else> Closed </p>
					</div>
				</div>
			</div>
			<h1>Content:</h1>
			<div class="horizontal-div">
				<div v-for="(c, index) in contents">
					<p class="content-class-lead" v-if="index === 0"> {{ c }} </p>
					<p class="content-class" v-else> {{ c }} </p>
				</div>
			</div>
			<div class="horizontal-div">
				<div id="workingHoursDiv">
					<h1>Working Hours:</h1>
					<p id="separator-hours"></p>
					<div class="daysDiv">
						<div class="days">
							<p>Monday:</p>
							<p>Tuesday:</p>
							<p>Wednesday:</p>
							<p>Thursday:</p>
							<p>Friday:</p>
							<p>Saturday:</p>
							<p>Sunday:</p>
						</div>
						<div class="hours" style="margin-left: auto; margin-right: 5px;">
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
							<p>{{ facility.workingHours }}</p>
						</div>
					</div>
				</div>
				<div id="locationDiv">
					<h1>Location:</h1>
					<p id="separator-hours"></p>
					<div id="address-div">
						<p style="font-size: 24px; font-weight: bold; padding: 0;">Address: </p>
						<p style="font-size: 24px; font-weight: 500; padding: 0; margin-left: 10px;">{{ facility.location.address }}</p>
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
`
	, 
	methods : {
	},
	mounted () {
		axios.get("/rest/facilities/getById/", {params: { id: this.$route.params.facilityID}})
		.then(response => {
			this.facility = response.data;
			this.firstWordOfName = (this.facility.name).substring(0, this.facility.name.indexOf(' '));

			if(this.firstWordOfName === '')
				this.firstWordOfName = this.facility.name;

			console.log(this.firstWordOfName);

			this.contents = this.facility.content.split(',');
			console.log(this.contents);
		});
    }
});