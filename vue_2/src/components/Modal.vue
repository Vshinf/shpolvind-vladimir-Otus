<template>
	<div>
		<!--<b-button @click="showModal">Open Modal</b-button>-->
		<b-modal ref="my-modal" hide-footer :title="title">
			<div class="modal-body">
				{{ text }}
			</div>
			<div class="modal-footer">
				<router-link v-if="button == '2'" to="/">
					<button type="button" @click="hideModal" class="btn btn-success">Еще</button>
				</router-link>
				<router-link v-else-if="button == '3'" to="/">
					<button type="button" @click="hideModal" class="btn btn-danger">Я могу лучше</button>
				</router-link>
				<button v-else-if="button != '4'" type="button" @click="hideModal" class="btn btn-secondary">Закрыть</button>
			</div>
		</b-modal>
	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			text: String,
			button: String
			/* проверка типа и другие правила валидации
			age: {
				type: Number,
				default: 0,
				required: true,
				validator: function (value) {
					return value >= 0
				}
			}*/
		},

		methods: {
			showModal() {
				this.$refs['my-modal'].show()
			},
			hideModal() {
				this.$refs['my-modal'].hide()
			}
		},

		mounted() {

		},
	}
</script>

<style>
	.modal-backdrop {
		opacity: 0.7;
	}
</style>
