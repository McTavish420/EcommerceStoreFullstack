<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium">
              <h2 class="a-spacing-base">
                <b>Create Review</b> for <b>{{ $store.getters.getProduct.title }}</b>
              </h2>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-4 col-sm-3 col-3">
                  <img :src="$store.getters.getProduct.photo" style="width: 100%; border-radius: 5px" />
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <h2 class="a-spacing-base">Overall Rating</h2>
              <div class="a-row">
                <!-- Rating -->
                <client-only placeholder="loading...">
                  <star-rating v-model="rating"></star-rating>
                </client-only>
                
              </div>
              <div class="a-row a-spacing-top-large">
                <h2>Add photo or video</h2>
                <p
                  style="font-size: 14px; font-weight: 700;"
                >Shoppers find images and videos more helpful than text alone.</p>
              </div>
              <div class="a-row a-spacing-top-medium">
                <!-- Choose a Photo -->
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>
                  <input type="file" @change="onSelectedFile"/>
                </label>
                <p>{{ fileName }}</p>
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a headline</h2>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 70%;"
                  placeholder="What's most important to know?"
                  v-model="headline"
                />
              </div>
              <!-- Body -->
              <div class="a-spacing-base">
                <h2 class="a-spacing-base">Write your review</h2>
                <textarea
                  placeholder="What do you like or dislike? What did you see this product for?"
                  v-model="body"
                  style="height:6em; width: 100%; padding: 10px"
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div class="a-spacing-top-medium">
              <p
                style="font-size: 14px; font-weight: 700;"
              >This is how you'll appear to other customers:</p>
              <div class="media a-spacing-top-large">
                <div class="media-left">
                  <img src="/img/avatar.png" class="img-fluid" style="width: 50px;" />
                </div>
                <div class="media-body pl-3 pt-2">
                  <input type="text" class="a-input-text" style="width: 100%;"  disabled
                   :value="$store.getters.getUser.userName"/>
                </div>
              </div>
            </div>
            <div class="a-row a-spacing-top-medium">
              <span class="a-color-tertiary">Don't worry, you can always change this on your profile</span>
            </div>
            <div class="a-row text-right a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddReview">Submit</span>
                </span>
              </span>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
const rating = process.client ? require('vue-rate-it') : {}
export default {
  middleware: 'auth',
  components: {
    StarRating: rating.StarRating
  },
  fetch ({ store, params }) {
  // console.log('inside page params fetch:\t', params);
  return store.dispatch('singleProduct', params.review)
},
  beforeRouteEnter (to, from, next) {
    console.log('before from:\t', from);
    if (from.name === null) {
      next(vm => {
        // console.log('before enter: ', to.path);
        // vm.$router.push(`${to.path.toString()}`)
        vm.$store.dispatch('singleProduct', to.params.review)
      })
    } else {
      next()
    }
  },
  async asyncData ({ store, params }) {
    // console.log('inside page params async:\t', params);
  await store.dispatch('singleProduct', params.review)
  },

  data () {
    return {
      rating: 0,
      body: '',
      headline: '',
      selectedFile: null,
      fileName: null
    }
  },

  methods: {
    onSelectedFile (event) {
            this.selectedFile = event.target.files[0]
            this.fileName = event.target.files[0].name
    },

    async onAddReview () {
      try {
        // console.log('params: \t', this.$route.params);
        let data = new FormData()
        data.append('headline', this.headline)
        data.append('body', this.body)
        data.append('rating', this.rating)
        data.append('photo', this.selectedFile, this.selectedFile.name)

        let response = await this.$axios.$post(`${process.env.DEV_BACKEND}/api/review/${this.$route.params.review}`, data)

        if (response.success) {
          this.$router.push({path: `/products/${this.$route.params.review}`})
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>