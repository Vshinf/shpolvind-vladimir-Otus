<template>
	<fragment>
		<div v-if="!getIsLoading">
			<modal ref="modalComp" :title="this.modal.title" :text="this.modal.text" :button="this.modal.button" />
			<div class="header">
				<router-link to="/">
					<button type="button" class="btn btn-light float-left fa-bag"><i class="fas fa-times"></i> Отмена</button>
				</router-link>
				<div class="float-right bl-timer">{{timeToEnd | secondsToTime}}</div><!--{{showTimer}}-->
			</div>
			<div class="center">
				<div class="bl_expr">
					<div>{{expression.value1}}</div>
					<div>{{expression.op1 | chengeExponentiation}}</div>
					<div><input type="number" v-model.number="v_1" @focus="pCursor = 'v_1'" ref="v_1" class="custom-inp tp-number" placeholder="__"></div>
					<div>{{expression.op2 | chengeExponentiation}}</div>
					<div><input type="number" v-model.number="v_2" @focus="pCursor = 'v_2'" ref="v_2" class="custom-inp tp-number" placeholder="__"></div>
				</div>
				<span class="bl_expr">={{expression.res}} ?</span>
				<br>
			</div>
			<div id="calc" class="container p-my">
				<div class="row">
					<div class="col-3 center">
						<button v-on:click="clickButton(1)" type="button" class="btn btn-primary btn-circle btn-orange">1</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(2)" type="button" class="btn btn-primary btn-circle btn-orange">2</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(3)" type="button" class="btn btn-primary btn-circle btn-orange">3</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="lastInput()" type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-angle-left"></i></button>
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-3 center">
						<button v-on:click="clickButton(4)" type="button" class="btn btn-primary btn-circle btn-orange">4</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(5)" type="button" class="btn btn-primary btn-circle btn-orange">5</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(6)" type="button" class="btn btn-primary btn-circle btn-orange">6</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="nextInput()" type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-angle-right"></i></button>
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-3 center">
						<button v-on:click="clickButton(7)" type="button" class="btn btn-primary btn-circle btn-orange">7</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(8)" type="button" class="btn btn-primary btn-circle btn-orange">8</button>
					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(9)" type="button" class="btn btn-primary btn-circle btn-orange">9</button>
					</div>
					<div class="col-3 center">
						<button type="button" v-on:click="question()" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-question"></i></button>
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-3 center">

					</div>
					<div class="col-3 center">
						<button v-on:click="clickButton(0)" type="button" class="btn btn-primary btn-circle btn-orange">0</button>
					</div>
					<div class="col-3 center">

					</div>
					<div class="col-3 center">
						<button v-on:click="checkUser()" type="button" class="btn btn-primary btn-circle btn-gray"><i class="fas fa-equals"></i></button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h2 class="center">Loading...</h2>
		</div>
	</fragment>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';//, mapActions
	import modal from "./Modal";

	function randomInteger(min, max) {
		return min + Math.floor((max - min) * Math.random());
	}
	function isInteger(num) {
		return (num ^ 0) === num;
	}

	export default {
		name: 'Game',

		data() {
			return{
				timeToEnd: 1,
				timerId: 0,
				v_1: "",
				v_2: "",
				pCursor: "v_1",
				countInp: 2,
				expression: {
					op1: "",
					op2: "",
					value1: 0,
					value2: 0,
					value3: 0,
					res: 0
				},
				modal: {
					title: "Сообщение",
					text: "Заголовок h3",
					button: ""
				},
				level: 5
			}
		},

		components: {
			modal
		},

		methods: {
			nextInput() {
				if( this.pCursor != "" ){
					let zn = Number(this.pCursor.replace('v_', ''));
					if( this.countInp != zn ) {
						zn = zn + 1;
					}
					const input = this.$refs['v_'+zn];
					input.focus();
					//input.selectionStart = input.value.length;
				}

			},
			lastInput() {
				if( this.pCursor != "" ) {
					let zn = Number(this.pCursor.replace('v_', ''));
					if (1 != zn) {
						zn = zn - 1;
					}
					const input = this.$refs['v_'+zn];
					input.focus();
					//input.selectionStart = input.value.length;
				}
			},
			clickButton(val) {
				//console.log(val);
				this[this.pCursor] += val;
			},
			question() {
				this.modal.title = "Подсказка";
				this.modal.text = "Я бы хотел вам подсказать, но эта задача так проста";
				this.modal.button = "1";
				this.$refs.modalComp.showModal();
			},
			timer() {
				this.timerId = setInterval(() => {
					if(this.timeToEnd != 0){
						this.timeToEnd = this.timeToEnd - 1;
					} else {
						clearInterval(this.timerId);
						this.modal.title = "Вы проиграли";
						this.modal.text = "Не расстраивайтесь, в следующий раз у Вас все получится";
						this.modal.button = "3";
						this.$refs.modalComp.showModal();
					}
				}, 1000);
			},
			genEpression(level) {
				let arrayOperator = [];
				if(this.getSettingSumm){
					arrayOperator.push("+");
				}
				if(this.getSettingMinus){
					arrayOperator.push("-");
				}
				if(this.getSettingMultiplication){
					arrayOperator.push("*");
				}
				if(this.getSettingDivision){
					arrayOperator.push("/");
				}
				if(this.getSettingExponentiation){
					arrayOperator.push("**");
				}

				if(arrayOperator.length != 0){

					this.setStatsCountLast(Number(this.getStatsCountLast) + 1);

					let gen = true;

					let rand_key1 = Math.floor(Math.random() * arrayOperator.length);
					let o1 = arrayOperator[rand_key1];
					let rand_key2 = Math.floor(Math.random() * arrayOperator.length);
					let o2 = arrayOperator[rand_key2];

					this.expression.op1 = o1;
					this.expression.op2 = o2;

					while( gen ) {
						let value1 = randomInteger(1, 9 * level);
						let value2 = randomInteger(1, 9 * level);
						let value3 = randomInteger(1, 9 * level);

						console.log("Подсказка Сложность "+level+" | " + value1 + " " + o1 + " " + value2 +" " + o2 + " " + value3);
						let res = this.checkExpression(value1, value2, value3, o1, o2 );
						if( res != null ) {
							gen = false;
							console.log("--------");
							this.expression.value1 = value1;
							this.expression.value2 = value2;
							this.expression.value3 = value3;
							this.expression.res = res;

							setTimeout(() =>{
								this.setIsLoading(false);
							}, 200);

						}
					}
				}else{
					window.location.href = "/";
				}
			},
			checkUser() {
				if(this.v_1 != "" && this.v_2 != ""){
					let res = this.checkExpression(this.expression.value1, this.v_1, this.v_2, this.expression.op1, this.expression.op2);
					if(res == this.expression.res) {
						clearInterval(this.timerId);
						this.modal.title = "Победа!";
						this.modal.text = "Поздравляем, вы ответили правильно, играйте дальше";
						this.modal.button = "2";
						this.$refs.modalComp.showModal();

						this.setStatsSucssLast(Number(this.getStatsSucssLast) + 1);
					}else{
						this.modal.title = "Ошибка";
						this.modal.text = "Ответ не верный, у вас еще есть время подумать";
						this.modal.button = "1";
						this.$refs.modalComp.showModal();
					}
				}else{
					this.modal.title = "Ошибка";
					this.modal.text = "Вы не заполнили все поля";
					this.modal.button = "1";
					this.$refs.modalComp.showModal();
				}
			},
			checkExpression(value1, value2, value3, o1, o2 ) {
				const result = eval(value1+o1+value2+o2+value3);
				console.log("= " + result);
				if(isInteger(result)){
					return result;
				}else{
					return null;
				}
			},
			getSettingInSeconds() {
				//console.log("getSettingInSeconds ", this.getSettingMinets);
				return this.getSettingMinets * 60;
			},
			...mapMutations([
				"setIsLoading",
				"setStatsCountLast",
				"setStatsSucssLast"
			]),
		},

		computed: {
			...mapGetters([
				"getStatsDay",
				"getStatsCountLast",
				"getStatsSucssLast",

				"getSettingMinets",
				"getSettingLevel",
				"getSettingSumm",
				"getSettingMinus",
				"getSettingMultiplication",
				"getSettingDivision",
				"getSettingExponentiation",

				"getIsLoading"
			]),
		},
		/*computed: {
			showTimer: function() {
				const timestamp = this.timeToEnd;
				const minutes = Math.floor(timestamp / 60);
				let seconds = timestamp % 60;
				if(seconds.toString().length < 2){
					seconds = "0"+  seconds.toString();
				}
				return minutes + ":" + seconds;
			},
		},*/

		filters: {
			secondsToTime: function (sec) {
				const minutes = Math.floor(sec / 60);
				let seconds = sec % 60;
				if(seconds.toString().length < 2){
					seconds = "0"+  seconds.toString();
				}
				return minutes + ":" + seconds;
			},
			chengeExponentiation: function (op) {
				if(op == "**"){
					return "^";
				}
				return op;
			}
		},

		mounted() {
			this.timeToEnd = this.getSettingInSeconds();
			this.genEpression(this.getSettingLevel);
			this.timer();
		},

		beforeDestroy() {
			clearInterval(this.timerId);
			//console.log("Clear timer");
			this.setIsLoading(true);
		}
	}
</script>

<style scoped>
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
	input[type=number].tp-number::-webkit-outer-spin-button,
	input[type=number].tp-number::-webkit-inner-spin-button	{

		-webkit-appearance: none;
		margin: 0;
	}
	input[type=number].tp-number {
		-moz-appearance: textfield;
	}
</style>
