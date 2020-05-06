<template>
	<div id="app" class="container width450">
		<!--<SettingPage />-->
		<Game />
	</div>
</template>

<script>
//import SettingPage from './components/SettingPage';
import Game from './components/Game';

export default {
	name: 'App',
	data() {
		return{
			test: true,
		};
	},
	components: {
		//SettingPage,
		Game,
	}
}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #000;
		margin-top: 20px;
		font-size: 14px;
	}
	div.width450 {
		width: 450px;
	}
</style>
