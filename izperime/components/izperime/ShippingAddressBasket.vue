<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="shipping-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <AddressInput
            v-model="form.firstName"
            name="firstName"
            :label="$t('First Name')"
            required
            :valid="!!form.firstName && !errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <AddressInput
            v-model="form.lastName"
            name="lastName"
            :label="$t('Last Name')"
            required
            :valid="!!form.lastName && !errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required"
        v-slot="{ errors }"
        class="form__element"
      >
        <AddressInput
          v-model="form.streetName"
          name="streetName"
          :label="$t('Street Name')"
          required
          :valid="!!form.streetName && !errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        v-slot="{ errors }"
        class="form__element"
      >
        <AddressInput
          v-model="form.apartment"
          name="apartment"
          :label="$t('House/Apartment number')"
          required
          :valid="!!form.apartment && !errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider
        rules="required|phone"
        v-slot="{ errors }"
        class="form__element"
      >
        <AddressInput
          v-model="form.phone"
          name="phone"
          :label="$t('Phone number')"
          required
          :valid="!!form.phone && !errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>


<!--	    <SfIcon color="black" size="20px" icon="search" />-->
	    <AddressInput
		    v-model="form.deliveryNotes"
		    :valid="!!form.deliveryNotes"
		    name="streetName"
		    :label="$t('Delivery Notes')"
	    />
    </form>
  </ValidationObserver>
</template>

<script>
import {
	SfIcon,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import AddressInput from '~/components/izperime/AddressInput.vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive, computed, watch } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import '@/helpers/validators/phone';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'ShippingAddressForm',

  components: {
	  SfIcon,
	  AddressInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        id: undefined,
        firstName: '',
        lastName: '',
        streetName: '',
        apartment: '',
        city: '',
        phone: '',
	      deliveryNotes: '',
      })
    },
    isNew: {
      type: Boolean,
      required: false
    }
  },

  setup(props, { emit }) {
    const { $ct: { config } } = useVSFContext();
    const form = reactive({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      streetName: props.address.streetName,
      apartment: props.address.apartment,
      city: props.address.city,
      phone: props.address.phone,
	    deliveryNotes: ''
    });

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: () => {},
        // TODO: Handle Error
        onError: () => {}
      });
    };

    const statesInSelectedCountry = computed(() => {
      if (!form.country) {
        return null;
      }
      const selectedCountry = config.countries.find(country => country.name === form.country);
      return selectedCountry && selectedCountry.states;
    });

    const validationRules = {
      contry: `required|oneOf:${config.countries.map(c => c.name).join(',')}`,
      state: !statesInSelectedCountry ? null : 'required|min:2'
    };

    watch(statesInSelectedCountry, statesInSelectedCountry => {
      const countryHasStates = statesInSelectedCountry && statesInSelectedCountry.length;
      if (!countryHasStates && form.state) {
        form.state = null;
      }
    });

    return {
      form,
      validationRules,
      submitForm,
      countries: config.countries,
      statesInSelectedCountry
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: 0;
	  & > .sf-input__error-message {
		  display: none;
	  }
  }
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
