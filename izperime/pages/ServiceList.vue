<template>
  <div id="service_list">
	  <ServiceNavigation />
    <LazyHydrate when-visible>
      <ServiceBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="service in filtered_services">
          <ServiceBanner
            :key="service._id"
            :banner="service"
            :class="'sf-banner--slim banner__tshirt pointer'"
            @click="setServiceModal(service)"
          />
        </template>
      </ServiceBannerGrid>
    </LazyHydrate>

  </div>
</template>
<script>
import ServiceBanner from '~/components/izperime/ServiceBanner.vue';
import ServiceBannerGrid from '~/components/izperime/ServiceBannerGrid.vue';
import ServiceNavigation from '~/components/izperime/ServiceNavigation.vue';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import { useUiState } from '~/composables';

export default {
  name: 'ServiceList',
	layout: 'app',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
	setup(props, { root }) {
		const { activeServiceCategory, setServiceModal } = useUiState();
		return {
			activeServiceCategory,
			setServiceModal,
		};
	},
  components: {
	  ServiceBannerGrid,
	  ServiceBanner,
	  ServiceNavigation,
    LazyHydrate
  },
  data() {
    return {
      services: [
        {
        	_id: '1',
	        category: 'tops',
	        category_index: 0,
          title: 'Five Shirts',
	        description: "Whether it's an old pair of jeans or your best suit trousers, we'll make sure they look great for every possible occasion",
	        offer_text: 'Five Shirts',
          image: {
        		mobile: '/homepage/productA.webp',
        		desktop: '/homepage/productA.webp'
          },
          price: 15,
          currency: 'EUR',
	        products: [
	        	{
	        		_id: 11,
        		  title: 'High Five',
        		  description: '5x shirts washed, ironed & hung',
			        price: 14,
			        currency: 'EUR',
		        },
	        ],
	        faqs: [
		        {
		        	question: 'Will my items be dry cleaned or laundered?',
			        answer: "We'll always follow the instructions on the care label to ensure the best possible cleaning. If you'd like to give us specific instructions, just let us know in the Cleaning Instructions of your order."
		        }
	        ]
        },
        {
	        _id: '2',
	        category: 'tops',
	        category_index: 0,
          title: 'Blouses',
	        image: {
		        mobile: '/homepage/productB.webp',
		        desktop: '/homepage/productB.webp'
	        },
          price: 7,
          currency: 'EUR',
        },
        {
	        _id: '3',
	        category: 'tops',
	        category_index: 0,
          title: 'T-shirts',
	        image: {
		        mobile: '/homepage/productC.webp',
		        desktop: '/homepage/productC.webp'
	        },
          price: 10,
          currency: 'EUR',
        },
        {
	        _id: '4',
	        category: 'tops',
	        category_index: 0,
          title: 'Knitwear',
	        image: {
		        mobile: '/homepage/productA.webp',
		        desktop: '/homepage/productA.webp'
	        },
          price: 5,
          currency: 'EUR',
        },
        {
	        _id: '5',
	        category: 'laundry',
	        category_index: 1,
          title: 'Baby Bundle',
	        image: {
		        mobile: '/homepage/productB.webp',
		        desktop: '/homepage/productB.webp'
	        },
          price: 10,
          currency: 'EUR',
        },
        {
	        _id: '6',
	        category: 'laundry',
	        category_index: 1,
          title: 'Wash, Dry, Fold',
	        image: {
		        mobile: '/homepage/productC.webp',
		        desktop: '/homepage/productC.webp'
	        },
          price: 15,
          currency: 'EUR',
        },
        {
	        _id: '7',
	        category: 'bedding',
	        category_index: 2,
          title: 'Wash, Dry, Fold',
	        image: {
		        mobile: '/homepage/productC.webp',
		        desktop: '/homepage/productC.webp'
	        },
          price: 15,
          currency: 'EUR',
        },
	      {
		      _id: '7',
		      category: 'trousers',
		      category_index: 4,
		      title: 'Trousers',
		      description: "Whether it's an old pair of jeans or your best suit trousers, we'll make sure they look great for every possible occasion",
		      offer_text: 'Five Shirts',
		      image: {
			      mobile: '/homepage/productA.webp',
			      desktop: '/homepage/productA.webp'
		      },
		      price: 15,
		      currency: 'EUR',
		      products: [
			      {
				      _id: 11,
				      title: 'Trousers',
				      description: 'Cleaned & ironed',
				      price: 9,
				      currency: 'EUR',
			      },
			      {
				      _id: 12,
				      title: 'Silk Trousers',
				      description: 'Includes beaded or sequined trim',
				      price: 9,
				      currency: 'EUR',
			      },
			      {
				      _id: 13,
				      title: '10x Trousers - Pre-paid',
				      bullets: [
					      'Excludes silk & leather',
					      'Valid for 12 months',
				      ],
				      price: 59,
				      currency: 'EUR',
			      },
			      {
				      _id: 14,
				      title: '25x Trousers - Pre-paid',
				      bullets: [
					      'Excludes silk & leather',
					      'Valid for 12 months',
				      ],
				      price: 139,
				      currency: 'EUR',
			      },
		      ]
	      },
      ]
    };
  },
  methods: {
  },
	computed: {
  	filtered_services() {
  		let services = [...this.services]
		  let current_category = this.activeServiceCategory
		  services = services.filter(service=>service.category_index === current_category)
  		return services
	  }
	}
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
    margin: 0 calc(var(--spacer-sm) * -1) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
     -webkit-transform-origin: center;
     transform-origin: center;
  }
}
	.banner-grid {
		margin-top: 0;
	}

	.pointer {
		cursor: pointer;
	}
</style>
