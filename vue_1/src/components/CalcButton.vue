<template>
	<div class="col-3 center">
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

