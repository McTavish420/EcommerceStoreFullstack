// State
export const state = () => ({
    // state
    cart: [],
    cartLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: '',
    userName: '',
    city: '',
    logStatus: false
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
            city: ''
        }
        if (state.auth.loggedIn) {
             data.name = state.auth.user.userName
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
        state.logStatus = false
    }

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
        console.log('get name: ', state.userName);
        return state.userName
    },

    getCity (state) {
        console.log('get city: ', state.city);
        return state.city
    },

    getLog(state) {
        console.log('get log: ', state.logStatus);
        return state.logStatus
    }

    
}