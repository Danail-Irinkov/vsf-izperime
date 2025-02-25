<template>
	<div
		class="sf-input"
		:class="{
      'has-text': !!value,
      invalid: !valid,
    }"
		:data-testid="name"
	>
		<div class="sf-input__wrapper">
			<input
				:id="name"
				v-focus
				v-bind="$attrs"
				:value="value"
				:required="required"
				:disabled="disabled"
				:placeholder="label"
				:name="name"
				:class="{ 'address-input-green-border': valid }"
				:type="inputType"
				v-on="listeners"
			/>
		</div>
	</div>
</template>
<script>
	import { focus } from "@storefront-ui/vue/src/utilities/directives";
	export default {
		name: "SfInput",
		directives: {
			focus,
		},
		inheritAttrs: false,
		props: {
			/**
			 * Current input value (`v-model`)
			 */
			value: {
				type: [String, Number],
				default: "",
			},
			/**
			 * Form input label
			 */
			label: {
				type: String,
				default: "",
			},
			/**
			 * Form input name
			 */
			name: {
				type: String,
				default: "",
			},
			/**
			 * Form input type
			 */
			type: {
				type: String,
				default: "text",
			},
			/**
			 * Validate value of form input
			 */
			valid: {
				type: Boolean,
				default: true,
			},
			/**
			 * Error message value of form input. It will be appeared if `valid` is `true`.
			 */
			errorMessage: {
				type: String,
				default: "",
			},
			/**
			 * Native input required attribute
			 */
			required: {
				type: Boolean,
				default: false,
				description: "Native input required attribute",
			},
			/**
			 * Native input disabled attribute
			 */
			disabled: {
				type: Boolean,
				default: false,
				description: "Native input disabled attribute",
			},
			/**
			 * Status of show password icon display
			 */
			hasShowPassword: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				isPasswordVisible: false,
				inputType: "",
				isNumberTypeSafari: false,
			};
		},
		computed: {
			listeners() {
				return {
					...this.$listeners,
					input: (event) => this.$emit("input", event.target.value),
				};
			},
			isPassword() {
				return this.type === "password" && this.hasShowPassword;
			},
		},
		watch: {
			type: {
				immediate: true,
				handler: function (type) {
					let inputType = type;
					// Safari has bug for number input
					if (typeof window !== "undefined" || typeof document !== "undefined") {
						const ua = navigator.userAgent.toLocaleLowerCase();
						if (
							ua.indexOf("safari") !== -1 &&
							ua.indexOf("chrome") === -1 &&
							type === "number"
						) {
							this.isNumberTypeSafari = true;
							inputType = "text";
						}
					}
					this.inputType = inputType;
				},
			},
			value: {
				immediate: true,
				handler: function (value) {
					if (!this.isNumberTypeSafari) return;
					if (isNaN(value)) {
						this.$emit("input");
					}
				},
			},
		},
		methods: {
			switchVisibilityPassword() {
				this.isPasswordVisible = !this.isPasswordVisible;
				this.inputType = this.isPasswordVisible ? "text" : "password";
			},
		},
	};
</script>
<style lang="scss">
	@import "~@storefront-ui/shared/styles/components/atoms/SfInput.scss";
	.sf-input__wrapper {
		& > input {
			outline: none;
			border-color: var(--c-light);
		}
		& > input.address-input-green-border {
			border-color: var(--c-primary);
		}
	}
</style>
