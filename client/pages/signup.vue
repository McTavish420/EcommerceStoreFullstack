<template>
    <div class="registerPage">
        <div class="container">
            <div class="row my-5">
                <div class="col-sm-4 mx-auto">
                    <div class="text-center">
                        <nuxt-link to="/"><img src="/img/ECOM.png"></nuxt-link>
                    </div>

                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-larger">
                            <div class="a-box-inner">
                                <h1 class="a-spacing-small text-center">Create Account</h1>

                                <!-- Username Field -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Username</label>
                                    <input type="text"
                                     id="ap_customer_name" 
                                     class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                     v-model="userName">
                                </div>

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
                                    <span class="a-button-primary">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onSignUp">
                                                Create Your Account
                                            </span>
                                        </span>
                                    </span>

                                    <div class="a-row a-spacing-top-medium a-size-small">
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
                                        Already have an account?
                                        <nuxt-link to="/login" class="a-link-emphasis">Sign In</nuxt-link>
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
            userName: '',
            email: '',
            password: ''
        }
    },

    methods: {
        async onSignUp () {
            try {
                let data = {
                    userName: this.userName,
                    email: this.email,
                    password: this.password
                }

                let response = await this.$axios.$post('/api/auth/signup', data)
                console.log(response)

                if (response.success) {
                    // await this.$auth.loginWith('local', {
                    //     data: {
                    //         email: this.email,
                    //         password: this.password
                    //     }
                    // })
                    

                    this.$router.push('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>