<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isLoginModalOpen"
    class="modal"
    transitionOverlay="sf-fade"
    transitionModal="our-collapse-bottom"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar"
        :close="true"
        :title="$t(barTitle)"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="isLogin">
	      {{ $t('Sign In to place an order') }}
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form class="form" @submit.prevent="handleSubmit(handleLogin)">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-email'"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-password'"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
<!--            <SfCheckbox-->
<!--              v-e2e="'login-modal-remember-me'"-->
<!--              v-model="rememberMe"-->
<!--              name="remember-me"-->
<!--              label="Remember me"-->
<!--              class="form__element checkbox"-->
<!--            />-->
            <div class="error-message" v-if="error.login">
              {{ $t(error.login) }}
	            <span v-if="error.login === 'confirmEmail'"
	                  class="resend-verification-email"
	                  @click="resendVerificationEmail({email: form.email})"
	            >
		            {{$t('resendEmail')}}
	            </span>
            </div>
            <SfButton v-e2e="'login-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Login') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          <SfButton class="sf-button--text" @click="setIsForgottenValue(true)">
            {{ $t('Forgotten password?') }}
          </SfButton>
        </div>
        <div class="bottom">
          <p class="bottom__paragraph">{{ $t('No account') }}</p>
          <SfButton class="sf-button--text" @click="setIsLoginValue(false)">
            {{ $t('Register today') }}
          </SfButton>
        </div>
      </div>
      <div v-else-if="isForgotten">
        <p>{{ $t('Forgot Password') }}</p>
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form class="form" @submit.prevent="handleSubmit(handleForgotten)">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'forgot-modal-email'"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                :label="$t('Forgot Password Modal Email')"
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="forgotPasswordError.request">
              {{ forgotPasswordError.request.message }}
            </div>
            <SfButton
              v-e2e="'forgot-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="forgotPasswordLoading"
            >
              <SfLoader :class="{ loader: forgotPasswordLoading }" :loading="forgotPasswordLoading">
                <div>{{ $t('Reset Password') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
      </div>
      <div v-else-if="isThankYouAfterForgotten" class="thank-you">
        <i18n tag="p" class="thank-you__paragraph" path="forgotPasswordConfirmation">
          <span class="thank-you__paragraph--bold">{{ userEmail }}</span>
        </i18n>
        <p class="thank-you__paragraph">{{ $t('Thank You Inbox') }}</p>
      </div>
      <div v-else class="form">
        <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
          <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-email'"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
<!--            <ValidationProvider rules="required" v-slot="{ errors }">-->
<!--              <SfInput-->
<!--                v-e2e="'login-modal-firstName'"-->
<!--                v-model="form.firstName"-->
<!--                :valid="!errors[0]"-->
<!--                :errorMessage="errors[0]"-->
<!--                name="first-name"-->
<!--                label="First Name"-->
<!--                class="form__element"-->
<!--              />-->
<!--            </ValidationProvider>-->
<!--            <ValidationProvider rules="required" v-slot="{ errors }">-->
<!--              <SfInput-->
<!--                v-e2e="'login-modal-lastName'"-->
<!--                v-model="form.lastName"-->
<!--                :valid="!errors[0]"-->
<!--                :errorMessage="errors[0]"-->
<!--                name="last-name"-->
<!--                label="Last Name"-->
<!--                class="form__element"-->
<!--              />-->
<!--            </ValidationProvider>-->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-password'"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
<!--            <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">-->
<!--              <SfCheckbox-->
<!--                v-e2e="'login-modal-create-account'"-->
<!--                v-model="createAccount"-->
<!--                :valid="!errors[0]"-->
<!--                :errorMessage="errors[0]"-->
<!--                name="create-account"-->
<!--                label="I want to create an account"-->
<!--                class="form__element"-->
<!--              />-->
<!--            </ValidationProvider>-->
            <div class="error-message" v-if="error.register">
              {{ $t(error.register) }}
            </div>
            <SfButton
              v-e2e="'login-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Create an account') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          {{ $t('or') }}
          <SfButton v-e2e="'login-modal-login-to-your-account'" class="sf-button--text" @click="setIsLoginValue(true)">
            {{ $t('login in to your account') }}
          </SfButton>
        </div>
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
    SfBar
  },
  setup() {
    const { isLoginModalOpen, toggleLoginModal, LoginModalAction } = useUiState();
    const form = ref({});
    const isLogin = ref(true);
    const isForgotten = ref(false);
    const isThankYouAfterForgotten = ref(false);
    const userEmail = ref('');
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { user, register, login, loading, userError, resendVerificationEmail,  requestNewPass, forgotPasswordError, forgotPasswordLoading } = userState();

    const error = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    const barTitle = computed(() => {
      if (isLogin.value) {
        return 'Sign in';
      } else if (isForgotten.value || isThankYouAfterForgotten.value) {
        return 'Reset Password';
      } else {
        return 'Register';
      }
    });

    watch(LoginModalAction, () => {
      if (LoginModalAction.value === 'login') {
	      setIsLoginValue(true)
      }
      if (LoginModalAction.value   === 'register') {
	      setIsLoginValue(false)
      }
    });
    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
      }
    });

    const setIsLoginValue = (value) => {
      resetErrorValues();
      isLogin.value = value;
    };

    const setIsForgottenValue = (value) => {
      resetErrorValues();
      isForgotten.value = value;
      isLogin.value = !value;
    };

    const handleForm = (fn) => async () => {
      resetErrorValues();
      let res = await fn({ ...form.value });

      console.log('handleForm res', res)
	    if(!res) return

	    console.log('handleForm userError', userError)
      const hasUserErrors = userError.value.register || userError.value.login;
	    console.log('handleForm hasUserErrors', hasUserErrors)
      if (hasUserErrors) {
        error.login = userError.value.login;
        error.register = userError.value.register;
        return;
      }
      toggleLoginModal();
    };

    const closeModal = () => {
      setIsForgottenValue(false);
      toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    const handleForgotten = async () => {
      userEmail.value = form.value.email;
      await requestNewPass({ email: userEmail.value });

      if (!forgotPasswordError.value.request) {
        isThankYouAfterForgotten.value = true;
        isForgotten.value = false;
      }
    };

    return {
      form,
      error,
      userError,
      loading,
      isLogin,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      setIsLoginValue,
      isForgotten,
      setIsForgottenValue,
	    resendVerificationEmail,
      forgotPasswordError,
      forgotPasswordLoading,
      handleForgotten,
      closeModal,
      isThankYouAfterForgotten,
      userEmail,
	    user,
      barTitle
    };
  }
};
</script>

<style lang="scss" scoped>

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
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}
	.resend-verification-email {
		cursor: pointer;
		text-decoration: underline;
		color: #7F828B;
	}
	.error-message {
		margin-bottom: 2rem;
		margin-top: -2rem;
	}
</style>
