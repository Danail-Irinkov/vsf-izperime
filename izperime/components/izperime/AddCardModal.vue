<template>
  <SfModal
    v-e2e="'add-card-modal'"
    :visible="isAddCardModalOpen"
    class="modal"
    transitionOverlay="sf-fade"
    transitionModal="our-collapse-bottom"
    @close="toggleAddCardModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="$t('Add a Card')"
        @click:close="toggleAddCardModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div class="form">
<!--        <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">-->
<!--          <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">-->
<!--            <ValidationProvider rules="required|email" v-slot="{ errors }">-->
<!--              <SfInput-->
<!--                v-e2e="'login-modal-email'"-->
<!--                v-model="form.email"-->
<!--                :valid="!errors[0]"-->
<!--                :errorMessage="errors[0]"-->
<!--                name="email"-->
<!--                label="Your email"-->
<!--                class="form__element"-->
<!--              />-->
<!--            </ValidationProvider>-->
<!--          </form>-->
<!--        </ValidationObserver>-->

	      <CardForm
		      :form-data="formData"
		      @submit="addCreditCard"
	      />

      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref, watch, reactive, computed } from '@vue/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert, SfBar } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { userState } from '~/composables';
import { useUiState } from '~/composables';
import CardForm from '~/components/izperime/CardForm/CardForm.vue';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar,
	  CardForm
  },
	data(){
  	return {
		  formData: {
			  cardName: '',
			  cardNumber: '',
			  cardMonth: '',
			  cardYear: '',
			  cardCvv: '',
			  CardType: ''
		  }
	  }
	},
  setup() {
    const { isAddCardModalOpen, toggleAddCardModal } = useUiState();
    const { getCards, saveCardVSF } = userState();

    return {
	    isAddCardModalOpen,
	    toggleAddCardModal,
	    getCards,
	    saveCardVSF,
    };
  },
	methods: {
		addCreditCard() {
			console.log('addCreditCard', this.formData)
			this.saveCardVSF(this.formData)

		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .sf-modal__content {
	height: 100%;
}
.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
</style>
