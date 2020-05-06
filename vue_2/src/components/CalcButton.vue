<template>
	<div class="col-3 center" v-on:click="() => $emit('click')">
		<button type="button" :class='`btn btn-primary ${classColor}`' v-html="showTextBtn"></button>
	</div>
</template>

<script>
	export default {
		name: 'CalcButton',
		props: {
			text: String,
			classColor: String
		},
		computed: {
			showTextBtn: function() {
				if(this.text == "left") {
					return `<i class="fas fa-angle-left"></i>`;
				}else if(this.text == "right") {
					return '<i class="fas fa-angle-right"></i>';
				}else if(this.text == "question") {
					return '<i class="fas fa-question"></i>';
				}else if(this.text == "equals") {
					return '<i class="fas fa-equals"></i>';
				}
				return this.text;
			},
		}
	}
</script>

<style>
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
</style>
