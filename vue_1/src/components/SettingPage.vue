<template>
	<fragment>
		<h2>Привет!</h2>
		<p class="mt-5">
			Добро пожаловать на {{stats.day}} тренировочный день, <br />
			Ваш последний результат - решено {{stats.sucssLast}} из {{stats.countLast}} <br />
			Общая точность {{accuracy()}}%
		</p>
		<div class="settings mt-5">
			<h4>Настройки</h4>
			<form class="mt-4">
				<div class="form-group width200">
					<input type="range" v-model.number="minets" min="1" max="15" step="1" value="1" class="form-control-range" id="minets">
					<label for="minets">Длительность: <span>{{minets}}</span> минут</label>
				</div>
				<div class="form-group width200">
					<input type="range" v-model.number="level" min="1" max="10" step="1" value="1" class="form-control-range" id="level">
					<label for="level">Сложность: <span>{{level}}</span></label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" type="checkbox" value="" v-model="summ" id="summ">
					<label class="form-check-label" for="summ">
						Суммирование
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" type="checkbox" value="" v-model="minus" id="minus">
					<label class="form-check-label" for="minus">
						Разность
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" type="checkbox" value="" v-model="multiplication" id="multiplication">
					<label class="form-check-label" for="multiplication">
						Умножение
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" type="checkbox" value="" v-model="division" id="division">
					<label class="form-check-label" for="division">
						Деление
					</label>
				</div>
				<div class="form-check mt-1">
					<input class="form-check-input" type="checkbox" value="" v-model="exponentiation" id="exponentiation">
					<label class="form-check-label" for="exponentiation">
						Возведение в степень
					</label>
				</div>
				<button type="button" class="btn btn-light float-right">Play!</button>
			</form>
		</div>
	</fragment>
</template>

<script>
	export default {
		name: 'SettingPage',
		data() {
			return{
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
			accuracy() {
				return Math.round(this.stats.sucssLast / this.stats.countLast * 100);
			},
		},
	}
</script>

<style>
	.width200 {
		width: 200px;
	}
</style>
