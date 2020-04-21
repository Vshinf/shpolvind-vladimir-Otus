<template>
	<fragment>
		<div class="header">
			<button type="button" class="btn btn-light float-left fa-bag"><i class="fas fa-times"></i> Отмена</button>
			<div class="float-right bl-timer">{{showtimer()}}</div>
		</div>
		<div class="center">
			<div class="bl_expr">
				<div>13</div>
				<div>*</div>
				<div><input class="custom-inp" placeholder="__"></div>
				<div>*</div>
				<div><input class="custom-inp" placeholder="__"></div>
				<br>
				=154573 ?
			</div>
		</div>
		<div id="calc" class="container p-my">
			<div class="row">
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">1</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">2</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">3</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-angle-left"></i></button>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">4</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">5</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">6</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-angle-right"></i></button>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">7</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">8</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">9</button>
				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-question"></i></button>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-3 center">

				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-orange">0</button>
				</div>
				<div class="col-3 center">

				</div>
				<div class="col-3 center">
					<button type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-equals"></i></button>
				</div>
			</div>
		</div>
	</fragment>
</template>

<script>
	export default {
		name: 'Game',
		data() {
			return{
				timeToEnd: 60,
				stats: {
					day: 1,
					countLast: 25,
					sucssLast: 10,
				},
				minets: 1,
				level: 1,
				summ: false,
				minus: false,
				multiplication: false,
				division: false,
				exponentiation: false,
			}
		},
		methods: {
			showtimer() {
				const timestamp = this.timeToEnd;
				const minutes = Math.floor(timestamp / 60);
				let seconds = timestamp % 60;
				if(seconds.toString().length < 2){
					seconds = "0"+  seconds.toString();
				}
				return minutes + ":" + seconds;
			},
			timer() {
				let timerId = setInterval(() => {
					if(this.timeToEnd != 0){
						this.timeToEnd = this.timeToEnd - 1;
					} else {
						clearInterval(timerId);
						console.log("Game Over");
					}
				}, 1000);
			},
		},
		mounted() {
			this.timer();
		}
	}
</script>

<style>
	.bl-timer {
		border: 1px solid #b1d2e3;
		padding: 7px 30px;
		background-color: #edeff0;
	}
	.bl_expr {
		color: lightgray;
		text-align: center;
		font-size: 25px;
		clear: both;
		margin: 0 auto;
		overflow: hidden;
		width: 120px;

	}
	.bl_expr input::-moz-placeholder { color: lightgray; }
	.bl_expr input::-webkit-input-placeholder { color: lightgray; }
	.bl_expr div {
		float: left;
	}
	.custom-inp {
		border: 0;
		width: 30px;
	}
	.center {
		text-align: center;
	}
	button.btn-orange {
		width: 38px;
		height: 38px;
		border-radius: 19px;
		text-align: center;
		padding-left: 0;
		padding-right: 0;
		font-size: 16px;
		background-color: #d95818;
		border-color: #d95818;
		color: #000;
	}
	button.btn-orange:hover, button.btn-orange:active {
		background-color: #cf4c0a;
		border-color: #cf4c0a;
	}
	button.btn-gray {
		width: 38px;
		height: 38px;
		border-radius: 19px;
		text-align: center;
		padding-left: 0;
		padding-right: 0;
		font-size: 16px;
		background-color: #878787;
		border-color: #878787;
		color: #000;
	}
	button.btn-gray:hover, button.btn-gray:active {
		background-color: #6e6b69;
		border-color: #6e6b69;
	}
	.p-my {
		padding: 40px 86px!important;
	}
	.header {
		overflow: hidden;
		margin-bottom: 50px;
	}
</style>
