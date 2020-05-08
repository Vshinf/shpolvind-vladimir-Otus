<template>
	<fragment>
		<h2>Привет!</h2>
		<p class="mt-5">
			Добро пожаловать на {{getStatsDay}} тренировочный день! <br />
			Ваш последний результат - решено {{getStatsSucssLast}} из {{getStatsCountLast}} <br />
			<template v-if="getStatsCountLast > 0">Общая точность {{accuracy}}%</template>
		</p>
		<div class="settings mt-5">
			<h4>Настройки</h4>
			<form class="mt-4">
				<div class="form-group width200">
					<input type="range" v-on:change="this.setSettingMinets" min="1" max="15" step="1" v-bind:value="getSettingMinets" class="form-control-range" id="minets">
					<label for="minets">Длительность: <span>{{getSettingMinets}}</span> минут</label>
				</div>
				<div class="form-group width200">
					<input type="range" v-on:change="this.setSettingLevel" min="1" max="10" step="1" v-bind:value="getSettingLevel" class="form-control-range" id="level">
					<label for="level">Сложность: <span>{{getSettingLevel}}</span></label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" v-on:change="this.setSettingSumm" v-bind:checked="getSettingSumm" type="checkbox" id="summ">
					<label class="form-check-label" for="summ">
						Суммирование
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" v-on:change="this.setSettingMinus" v-bind:checked="getSettingMinus" type="checkbox" id="minus">
					<label class="form-check-label" for="minus">
						Разность
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" v-on:change="this.setSettingMultiplication" v-bind:checked="getSettingMultiplication" type="checkbox" id="multiplication">
					<label class="form-check-label" for="multiplication">
						Умножение
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" v-on:change="this.setSettingDivision" v-bind:checked="getSettingDivision" type="checkbox" id="division">
					<label class="form-check-label" for="division">
						Деление
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" v-on:change="this.setSettingExponentiation" v-bind:checked="getSettingExponentiation" type="checkbox" id="exponentiation">
					<label class="form-check-label" for="exponentiation">
						Возведение в степень
					</label>
				</div>
				<router-link to="/game">
					<button type="button" :disabled="!activePlay" class="btn btn-light float-right">Play!</button>
				</router-link>
			</form>
		</div>
	</fragment>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';//, mapActions

	const date_now = new Date();

	export default {
		name: 'SettingPage',

		methods: {
			//...mapActions([""]),
			...mapMutations([
				"setSettingMinets",
				"setSettingLevel",
				"setSettingSumm",
				"setSettingMinus",
				"setSettingMultiplication",
				"setSettingDivision",
				"setSettingExponentiation",

				"setStatsDay",
				"setStatsCountLast",
				"setStatsSucssLast"
			]),
		},

		computed: {
			accuracy: function () {
				return Math.round(Number(this.getStatsSucssLast) / Number(this.getStatsCountLast) * 100);
			},
			activePlay: function () {
				if( !this.getSettingSumm && !this.getSettingMinus && !this.getSettingMultiplication && !this.getSettingDivision && !this.getSettingExponentiation ){
					return false;
				}
				return true;
			},
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
				"getSettingExponentiation"
			]),
		},

		mounted() {
			const today = date_now.getMonth() + "-" + date_now.getDate() + "-" + date_now.getFullYear();
			console.log(today);
			if ( localStorage.date ) {
				if( localStorage.date != today ){
					localStorage.setItem('date', today);
					localStorage.setItem('day', Number(localStorage.day) + 1);
				}
				this.setStatsCountLast(localStorage.countLast);
				this.setStatsSucssLast(localStorage.sucssLast);
			}else{
				localStorage.date = today;
				localStorage.day = 1;
				this.setStatsCountLast(0);
				this.setStatsSucssLast(0);
			}
			this.setStatsDay(localStorage.day);
		}
	}
</script>

<style scoped>
	.width200 {
		width: 200px;
	}
</style>
