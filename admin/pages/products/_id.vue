<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Update {{ product.title }}</h2>
                        <form>
                            <!-- Category Dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Category</label>
                                <select class="a-select-option" v-model="categoryID">
                                    <option 
                                    v-for="category in categories"
                                    :key="category._id"
                                    :value="category._id">{{ category.type }}</option>
                                </select>
                            </div>

                            <!-- Owner Dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Owner</label>
                                <select class="a-select-option" v-model="ownerID">
                                    <option 
                                    v-for="owner in owners"
                                    :key="owner._id"
                                    :value="owner._id">{{ owner.name }}</option>
                                </select>
                            </div>

                            <!-- Title Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Title</label>
                                <input type="text"
                                 class="a-input-text" 
                                 style="width: 100%"
                                 v-model="title" 
                                 :placeholder="product.title">
                            </div>

                            <!-- Description Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Description</label>
                                <textarea 
                                :placeholder="product.description"
                                style="width: 100%" v-model="description" ></textarea>
                            </div>

                            <!-- Price Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Price</label>
                                <input type="number"
                                 class="a-input-text"
                                 style="width: 100%"
                                 v-model="price" 
                                 :placeholder="product.price">
                            </div>

                            <!-- Stock Quantity Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Stock Quantity</label>
                                <input type="number"
                                 class="a-input-text"
                                 style="width: 100%"
                                 v-model="stockQuantity" 
                                 :placeholder="product.stockQuantity">
                            </div>

                            <!-- Uploading Photo -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Add Photo</label>
                                <div class="a-row a-spacing-top-medium">
                                    <label class="chooefile-button">
                                        <i class="fal fa-plus"></i>
                                        <input type="file" @change="onSelectedFile">
                                        <p style="margin-top: -70px">{{fileName || 'Name of the Photo'}}</p>
                                    </label>
                                </div>
                            </div>

                            <hr>
                            <!-- Add Button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span 
                                        class="a-button-text" 
                                        @click="onUpdateProduct">Add Product</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData ({ $axios, params }) {
        try {
            let categories = $axios.$get('https://ecommstore2019.herokuapp.com/api/categories')
            let owners = $axios.$get('https://ecommstore2019.herokuapp.com/api/owners')
            let product = $axios.$get(`https://ecommstore2019.herokuapp.com/api/products/${params.id}`)

        const [catResponse, 
               ownersResponse, 
               productResponse] = await Promise.all([
            categories,
            owners,
            product
        ])

        // here line 84 and 85 was supposed to have 'await'
        // but I don't wanna run one request and keep the other waiting
        // Promise.all() function runs the two request in line 84 and 85 parallel

        return {
            categories: catResponse.categories,
            owners: ownersResponse.owners,
            product: productResponse.product
        }
        } catch (error) {
            
        }
    },
    // asyncData() process on server side,
    // data() process on client side
    data () {
        return {
            categoryID: null,
            ownerID: null,
            title: '',
            description: '',
            price: null,
            stockQuantity: null,
            selectedFile: null,
            fileName: ''
        }
    },

    methods: {
        onSelectedFile (event) {
            this.selectedFile = event.target.files[0]
            this.fileName = event.target.files[0].name
        },
        
        async onUpdateProduct () {
            try {
                let data = new FormData()
                data.append('title', this.title)
                data.append('description', this.description)
                data.append('price', this.price)
                data.append('stockQuantity', this.stockQuantity)
                data.append('category', this.categoryID)
                data.append('owner', this.ownerID)
                data.append('photo', this.selectedFile, this.selectedFile.name)

            let result = await this.$axios.$put(
                `https://ecommstore2019.herokuapp.com/api/products/${this.$route.params.id}`,
                data
            )

            this.$router.push('/')
            } catch (error) {
                
            }

        }
    }
}
</script>