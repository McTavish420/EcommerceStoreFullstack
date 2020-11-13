<template>
  <main class="listingPage">
    <div class="container">
    <div class="row">
      <!-- Side Bar -->
      <!-- <div class="col-xl-2 col-lg-3 md-4 col-sm-4"></div> -->

      <!-- Main Contents -->
      <div class="col-xl-10 col-lg-9 md-8 col-sm-8 mx-auto">
        <FeaturedProduct :products="products"></FeaturedProduct>

        <div class="mainResults">
          <ul class="s-result-list">
            <li class="s-result-item celwidget" 
                v-for="product in products" :key="product._id">
              <div class="s-item-container my-5">
                <!-- Best Seller -->
                <div class="a-spacing-micro">
                  <div class="bestSeller">
                    <a href="#">Best Seller</a>
                  </div>
                </div>

                <!-- image -->
                <div>
                  <div class="row">
                    <div class="col-sm-3 text-center product-image">
                      <a href="#">
                        <img :src="product.photo || `https://i.pinimg.com/originals/e7/83/ff/e783ff19f77241517137a0fa6a709ec2.jpg`" 
                         class="img-fluid">
                      </a>
                    </div>

                    <div class="col-sm-9">
                      <!-- Title and Date -->
                      <div class="a-row a-spacing-small">
                        <nuxt-link  :to="`/products/${product._id}`" class="a-link-normal">
                          <h2 class="a-size-medium">
                            {{ product.title }}
                            <span class="a-letter-space"></span>
                            <span class="a-letter-space"></span>
                            <span class="a-size-small a-color-secondary">Sep 25, 2020</span>
                          </h2>
                        </nuxt-link>
                      </div>

                      <!-- Author's Name -->
                      <div class="a-row a-spacing-small">
                        <span class="a-size-small a-color-secondary">by</span>
                        <span class="a-size-small a-color-secondary">
                          <p class="a-link-normal a-text-normal">
                            {{ product.owner.name }}
                          </p>
                        </span>
                      </div>

                      <!-- Shipment -->
                      <div class="a-row" v-if="$store.getters.getLog">
                        <span class="a-size-small">{{ $store.getters.getCity }}</span>
                      </div>

                      <div class="row">
                        <div class="col-sm-7">
                          <div class="a-row a-spacing-none">
                            <b class="a-link-normal a-text-normal">
                               Hardcover
                            </b>
                          </div>

                          <!-- Price -->
                          <div class="a-row a-spacing-none">
                            <a href="#" class="a-link-normal a-text-normal">
                              <span class="a-offscreen">${{ product.price }}</span>
                              <span class="a-color-base sx-zero-spacing">
                                <span class="sx-price sx-price-large">
                                  <sup class="sx-price-currency">$</sup>
                                  <span class="sx-price-whole">{{ product.price }}</span>
                                  <sup class="sx-price-fractional">99</sup>
                                </span>
                              </span>
                            </a>
                            <span class="a-letter-space"></span>
                            <span class="a-size-base-plus a-color-secondary a-text-strike">$28.99</span>
                          </div>

                          <!-- Discount Section -->
                          <!-- <div class="a-row a-spacing-none">
                            <span class="a-size-small a-color-secondary">Free with Audible Trial</span>
                          </div>
                          <hr/> -->

                          <!-- Other Formats -->
                          <span class="a-size-small a-color-secondary my-5">
                            Product's Category:
                            <span class="a-letter-space"></span>
                            <span class="a-size-small a-link-normal a-text-normal">{{ product.category.type }}</span>
                          </span>

                        </div>

                        <!-- Ratings -->
                        <div class="col-sm-5">
                          <div class="a-row a-spacing-mini">
                            <!-- Star Ratings -->
                            <client-only>
                              <star-rating
                               :rating="product.averageRating" :show-rating="false"
                               :glow="1"
                               :border-width="1"
                               :rounded-corners="true"
                               :read-only="true"
                               :star-size="12"
                               :star-points="[23,2,14,17,0,19,10,34,7,50,23,43,38,50,36,34,46,19,31,17]"></star-rating>
                            </client-only>
                          </div>
                        </div>


                      </div>


                    </div>
                  </div>
                </div>
                
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </main>
</template>

<script>
import FeaturedProduct from '../components/FeaturedProduct'
import { mapGetters } from 'vuex'
const rating = process.client ? require('vue-rate-it') : {}
export default {
  components: {
    FeaturedProduct,
    StarRating: rating.StarRating
  },

  async asyncData ({ $axios }) {
    try {
      let response = await $axios.$get(`${process.env.DEV_BACKEND}/api/products`)
      response.products.forEach(product => {
        console.log(`${product.title}:\t`, product.averageRating);
      })
      return {
        products: response.products,
      }
    } catch (error) {
      console.log(error);
    }
  },

  data () {
    return {
      products: {
        product: {
          _id: 0,
          title: '',
          description: '',
          photo: '',
          price: 0,
          stockQuantity: 0,
          category: {
            type: ''
          },
          owner: {
            name: ''
          },
          averageRating: 0
        }
      }
    }
  },

  computed: {
        ...mapGetters(['getCity', 'getLog'])
    },
}
</script>

<style lang="css">
  .vue-rate-it-rating-item svg {
    transform: scale(0.6);
  }
  .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      background: #ccc;
  }
</style>