<template>
	<div id="app" class="container width450">
		<router-view />
	</div>
</template>

<script>

export default {
	name: 'App',
}
</script>

<style scoped>
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
