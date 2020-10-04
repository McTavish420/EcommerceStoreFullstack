<template>
    <div class="registerPage">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 mx-auto my-5">
                    <div class="text-center">
                        <nuxt-link to="/"><img src="/img/ECOM.png"></nuxt-link>
                    </div>

                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-larger">
                            <div class="a-box-inner">
                                <h1 class="a-spacing-small text-center">Sign In</h1>

                                <!-- Email Field -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Email</label>
                                    <input type="email"
                                     id="ap_customer_name" 
                                     class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                     v-model="email">
                                </div>

                                <!-- Password Field -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Password</label>
                                    <input type="password"
                                     id="ap_customer_name" 
                                     class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                     v-model="password">
                                     <div class="a-alert-container">
                                         <div class="a-alert-content">
                                             Password must be have at least 6 characters
                                         </div>
                                     </div>
                                </div>

                                <!-- Create Button -->
                                <div class="a-row a-spacing-extra-large mb-4">
                                    <div class="a-button-primary text-center justify-center">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onLogIn">Continue</span>
                                        </span>
                                    </div>

                                    <div class="a-row a-spacing-top-medium a-size-small text-secondary">
                                        <b>
                                            By creating account you agree to our
                                            <a href="#">Terms &amp; Conditions</a> and
                                            <a href="#">Privacy Notice</a>.
                                        </b>
                                    </div>
                                </div>
                                <hr />

                                <div class="a-row">
                                    <b>
                                        Don't have an account?
                                        <nuxt-link to="/signup" class="a-link-emphasis">Sign Up</nuxt-link>
                                    </b>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    auth: 'guest',
    layout: 'none',
    
    data () {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        async onLogIn () {
            try {

                await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                this.$store.dispatch('setLoggedUser')
                await this.$auth.fetchUser()
                this.$router.push('/')

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="css">
    .a-button-text {
        padding-left: 0px !important;
    }
    .a-alert-container {
        padding-left: 0px !important;
    }
</style>