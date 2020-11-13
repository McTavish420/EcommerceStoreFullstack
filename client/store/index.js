
// State
export const state = () => ({
    // state
    cart: [],
    cartLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: '',
    userName: '',
    city: '',
    user: '',
    logStatus: false,
    product: '',
    reviews: ''
})

// Actions
export const actions = {
    addProductToCart ({ state, commit }, product) {
        const cartProduct = state.cart.find(prod => prod._id === product._id)

        if (!cartProduct) {
            commit('pushProductToCart', product)
        } else {
            commit('incrementProductQty', cartProduct)
        }

        commit('incrementCartLength')
    },

    setLoggedUser ({ state, commit }) {
        let data = {
            name: '',
            city: '',
            user: ''
        }
        if (state.auth.loggedIn) {
             data.name = state.auth.user.userName
             data.user = state.auth.user
            if (state.auth.user.address === null || state.auth.user.address == undefined) {
                data.city = 'Not Set Yet'
            } else {
                data.city = state.auth.user.address.city
            }
        } 

        commit('setTheUser', data)
    },

    clearUser ({state, commit}) {
        commit('remove')
    },

    async singleProduct({commit}, params) {
        try {
            let response = await this.$axios.$get(`${process.env.DEV_BACKEND}/api/products/${params}`)
            // console.log('inside Store Product:\n', response.product);

            commit('setProduct', response.product)
        } catch (error) {
            console.log(error);
        }
    }

    
}

// Mutations
export const mutations = {
    pushProductToCart (state, product) {
        product.quantity = 1
        state.cart.push(product)
    },

    incrementProductQty (state, product) {
        product.quantity++
        let indexOfProduct = state.cart.indexOf(product)
        state.cart.splice(indexOfProduct, 1, product)
    },

    incrementCartLength (state) {
        state.cartLength = 0
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity
            })
        }
    },

    /* 
    1. Find the product in the cart
    2. change the quantity of the product
    3. Update the length of the cart
    4. replace the old product with the new product in the cart
    */

    changeQty (state, { product, qty }) {
        let cartProduct = state.cart.find(prod => prod._id === product._id)
        cartProduct.quantity = qty

        state.cartLength = 0
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity
            })
        }

        let indexOfProduct = state.cart.indexOf(cartProduct)
        state.cart.splice(indexOfProduct, 1, cartProduct)
    },

    /* 
    1. Remove the product quantity from the cart length
    2. Find the index of the product in the state.cart that we want to delete
    3. remove the product by using splice
    */

    removeProduct (state, product) {
        state.cartLength -= product.quantity

        let indexOfProduct = state.cart.indexOf(product)
        state.cart.splice(indexOfProduct, 1)
    },

    setShipping (state, { price, estimatedDelivery }) {
        state.shippingPrice = price
        state.shippingEstimatedDelivery = estimatedDelivery
    },

    clearCart (state) {
        state.cart = []
        state.cartLength = 0
        state.shippingPrice = 0
        state.shippingEstimatedDelivery = ''
    },


    setTheUser (state, data ) {
        if (data.user === null) {
            state.user = ''
        } else {
            state.user = data.user
        }
        if (data.name === null) {
            state.userName = ''
        } else {
            state.userName = data.name
        }
        if (data.city === 'Not Set Yet') {
            state.city = 'Choose Your Address'
        } else {
            state.city = data.city
        }

        state.logStatus = true
    },

    remove (state) {
        state.userName = '',
        state.city = '',
        state.user = ''
        state.logStatus = false
    },
    
    setProduct (state, data) {
        state.product = data
        // console.log('inside store product:\n', state.product);
    },

    setReviews(state, data) {
        state.reviews = data
        // console.log('inside store reviews:\n', state.reviews);
    },

}

// Getters
export const getters = {
    getCartLength (state) {
        return state.cartLength
    },

    getCart (state) {
        return state.cart
    },

    getCartTotalPrice (state) {
        let total = 0
        state.cart.map(product => {
            total += product.price * product.quantity
        })

        return total
    },

    getCartTotalPriceWithTotalPrice (state) {
        let total = 0
        state.cart.map(product => {
            total += product.price * product.quantity
        })

        return total + state.shippingPrice
    },

    getEstimatedDelivery (state) {
        return state.shippingEstimatedDelivery
    },

    getUserName (state) {
        return state.userName
    },

    getCity (state) {
        return state.city
    },

    getUser (state) {
        return state.user
    },

    getLog(state) {
        return state.logStatus
    },

    getProduct (state) {
        return state.product
    },

    getReviews(state) {
        return state.reviews
    }

    
}