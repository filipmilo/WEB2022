Vue.component("Comments", {
	data: function () {
		    return {
				facilityId: '',
				currentRole: '',
				
				newComment: {
					customer: '',
					facility: '',
					content: '',
					rating: 0
				},
				
				allComments: null,
				onlyApproved: false,
				isNewComment: false
		  }
	},
	template: ` 
<div id="all-comment-div">
	<h1>Comments:</h1>
	<button v-if="currentRole === 'CUSTOMER'" class="btn btn-primary active" @click="newCommentEnable">New Comment</button>
	
	<div id="new-comment-div" v-if="isNewComment">
		<form>
			<table>
				<tr>
					<td>
						<label for="rating-s">Rating: {{newComment.rating}}/5</label>
						<input type="range" class="form-range" min="0" max="5" id="rating-s" v-model = "newComment.rating"></input>
						
					</td>
				</tr>
				<tr>
					<td>
						<p>Comment: </p>
						<input type="text" v-model = "newComment.content"></input>
					</td>
				</tr>
				
				<tr>
					<td colspan="2" style="text-align:center">
						<input type="submit" value="Post comment" v-on:click = "postComment" id="login-button" class="btn btn-info"></input>
					</td>
				</tr>
			</table>
		</form>
	</div>
	
	<div id="comment-div" v-for="c in allComments">
		
		<p>User: {{c.customer}}</p>
		<h3>{{c.rating}}/5</h3>
		<h2>{{c.content}}</h2>
		
		<p v-if="currentRole === 'ADMIN' || currentRole ==='MANAGER'">STATUS: {{c.status}}</p>
		<button v-if="currentRole === 'ADMIN' && c.status === 'waiting'" class="btn btn-success" @click="setCommentStatus('approved', c.id)">Approve</button>
		<button v-if="currentRole === 'ADMIN' && c.status === 'waiting'" class="btn btn-danger" @click="setCommentStatus('rejected', c.id)">Reject</button>
		
	</div>
	
</div>
`
	, 
	methods : { 
		newCommentEnable: function() {
			if(this.isNewComment){
				this.isNewComment = false;
			} else {
				this.isNewComment = true;
			}
		},
		postComment: function() {
			event.preventDefault();
			if(this.newComment.content === '') {
				alert("Please enter the content of comment");
				return;
			}
			
			axios.post("/rest/comments/addComment/", this.newComment, {
				headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt')).jwt}`}
			})
			.then(response => {
				console.log(response);
				router.push("/");
			});
		},
		setCommentStatus: function(status, commentId) {
			axios.post("/rest/comments/changeStatus/", null, {
				params: {newStatus: status, comment: commentId},
				headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt')).jwt}`}
			})
			.then(response => {
				console.log(response);
				router.push("/");
			});
		}
	},
	mounted () {
		this.facilityId = this.$route.params.facilityID;
    	
    	var toParse = localStorage.getItem('jwt');
    	if(toParse) {
			this.currentRole = JSON.parse(toParse).role;
			
			if(this.currentRole === 'CUSTOMER') {
				this.newComment.facility = this.facilityId;
				this.newComment.customer = JSON.parse(toParse).username;
			}
			
		} else {
			this.currentRole = '';
		}
		
		if(this.currentRole === 'CUSTOMER' || this.currentRole === 'COACH' || this.currentRole === '')
			this.onlyApproved = true;
		else
			this.onlyApproved = false;
		
		axios.get("/rest/comments/getByFacility/", {
			params: {
				facilityId: this.facilityId,
				isOnlyApproved: this.onlyApproved
			}
		})
		.then(response =>{
			this.allComments = response.data;
		});
    }
});