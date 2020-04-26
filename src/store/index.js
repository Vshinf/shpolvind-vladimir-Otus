import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		stats: {
			day: 1,
			countLast: 0,
			sucssLast: 0,
		},
		settings: {
			minets: 1,
			level: 1,
			summ: false,
			minus: false,
			multiplication: false,
			division: false,
			exponentiation: false,
		},
		isLoading: true,
	},

	getters: {
		//Чтение для компонентов
		getStatsDay: state => {
			return state.stats.day;
		},
		getStatsCountLast: state => {
			return state.stats.countLast;
		},
		getStatsSucssLast: state => {
			return state.stats.sucssLast;
		},
		getSettingMinets: state => {
			return state.settings.minets;
		},
		getSettingLevel: state => {
			return state.settings.level;
		},
		getSettingSumm: state => {
			return state.settings.summ;
		},
		getSettingMinus: state => {
			return state.settings.minus;
		},
		getSettingMultiplication: state => {
			return state.settings.multiplication;
		},
		getSettingDivision: state => {
			return state.settings.division;
		},
		getSettingExponentiation: state => {
			return state.settings.exponentiation;
		},
		getIsLoading: state => {
			return state.isLoading;
		},
	},

	mutations: {
		//Изменение store async
		setStatsDay(state, day) {
			//console.log("setStatsDay");
			state.stats.day = day;
		},
		setStatsCountLast(state, count) {
			//console.log("setStatsCountLast");
			state.stats.countLast = count;
			localStorage.setItem('countLast', count);
		},
		setStatsSucssLast(state, count) {
			//console.log("setStatsSucssLast");
			state.stats.sucssLast = count;
			localStorage.setItem('sucssLast', count);
		},

		setSettingMinets(state, event) {
			//console.log("setSettingMinets");
			state.settings.minets = Number(event.target.value);
		},
		setSettingLevel(state, event) {
			//console.log("setSettingLevel");
			state.settings.level = Number(event.target.value);
		},
		setSettingSumm(state) {
			//console.log("setSettingSumm");
			state.settings.summ = !state.settings.summ;
		},
		setSettingMinus(state) {
			//console.log("setSettingMinus");
			state.settings.minus = !state.settings.minus;
		},
		setSettingMultiplication(state) {
			//console.log("setSettingMultiplication");
			state.settings.multiplication = !state.settings.multiplication;
		},
		setSettingDivision(state) {
			//console.log("setSettingDivision");
			state.settings.division = !state.settings.division;
		},
		setSettingExponentiation(state) {
			//console.log("setSettingExponentiation");
			state.settings.exponentiation = !state.settings.exponentiation;
		},
		setIsLoading(state, status) {
			//console.log("setIsLoading");
			state.isLoading = status;
		}
	},

	actions: {
	},

	strict: true,//запрещает прямое обращение к store
});
