<template>
 <main>
   <div class="a-spacing-large"></div>
   <div class="container-fluid browsing-history">
     <div class="row">
       <div class="col-sm-8 col-8">
         <h1 class="a-size-large a-spacing-none a-text-normal">All Products</h1>
         <div class="a-spacing-large"></div>
         <!-- Button -->
         <nuxt-link to="/products" class="a-button-buy-again">Add A New Product</nuxt-link>
         <nuxt-link to="/category" class="a-button-history margin-right-10">Add A New Category</nuxt-link>
         <nuxt-link to="/owner" class="a-button-history margin-right-10">Add A New Owner</nuxt-link>
         <nuxt-link to="/orders" class="a-button-history margin-right-10">All Orders</nuxt-link>

         <!-- <a href="/products" class="a-button-buy-again">Add A New Product</a>
         <a href="/category" class="a-button-history margin-right-10">Add A New Category</a>
         <a href="/owner" class="a-button-history margin-right-10">Add A New Owner</a> -->
       </div>
     </div>
   </div>

   <div class="a-spacing-large"></div>
   <!-- Listing Page -->
   <div class="container-fluid browsing-history">
     <div class="row">
       <div 
        v-for="(product, index) in products"
        :key="product._id"
        class="col-xs-2 col-lg-2 col-md-3 col-sm-6 br bb">
         <div class="history-box">
           <div class="text-center">
             <!-- Product Image -->
             <a href="#" class="a-link-normal">
               <img :src="product.photo" class="img-fluid">
             </a>

             <!-- Product Title -->
             <div class="a-spacing-top-base asin-title">
               <span class="a-text-normal">
                 <div class="p13n-sc-turncated">{{ product.title }}</div>
               </span>
             </div>

             <!-- Product Rating -->
             <div class="a-row">
               <div class="a-row a-spacing-mini">
                            <!-- Star Ratings -->
                            <client-only>
                              <star-rating
                              class="d-flex justify-content-center"
                               :rating="product.averageRating" :show-rating="false"
                               :glow="1"
                               :border-width="1"
                               :rounded-corners="true"
                               :read-only="true"
                               :star-size="25"
                               :star-points="[23,2,14,17,0,19,10,34,7,50,23,43,38,50,36,34,46,19,31,17]"></star-rating>
                            </client-only>
                          </div>
             </div>

             <!-- Product Price -->
             <div class="a-row">
               <span class="a-size-base a-color-price">
                 <span class="p13n-sc-price">${{ product.price }}</span>
               </span>
             </div>

             <!-- Product Buttons -->
             <div class="a-row">
               <nuxt-link :to="`/products/${product._id}`" class="a-button-history margin-right-10">Update</nuxt-link>
               <a href="#" 
                 class="a-button-history margin-right-10" 
                 @click="onDelete(product._id, index)">Delete</a>
             </div>
           </div>
         </div>
       </div>

 

     </div>
   </div>
 </main>
</template>

<script>
const rating = process.client ? require('vue-rate-it') : {}
export default {
  components: {
    StarRating: rating.StarRating
  },
  // asyncData is fetching data before nuxt page finished loading
  // this is good for SEO since data is loaded first 
  async asyncData ({ $axios }) {
    try {
      let response = await $axios.$get('https://ecommstore2019.herokuapp.com/api/products')
      return {
        products: response.products
      }
    } catch (error) {
      
    }
  },

  methods: {
    async onDelete (id, index) {
      try {
        let response = await this.$axios.$delete(`https://ecommstore2019.herokuapp.com/api/products/${id}`)
        if (response.success) {
          this.products.splice(index, 1)
        }
      } catch (error) {
        
      }
    }
  }
}
</script>

<style lang="css">
  .vue-rate-it-rating-item svg {
    transform: scale(0.5) !important;
  }
</style>
