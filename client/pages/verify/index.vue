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
                                <h1 class="a-spacing-small text-center">Verification</h1>

                                <!-- Email Field -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">
                                        An email is sent to your Email Address.
                                    </label>
                                    <label for="ap_customer_name" class="a-form-label">
                                        It might take a few moments to receive the email.
                                    </label>
                                    <label for="ap_customer_name" class="a-form-label">
                                        Please Check your Email and confirm sign up.
                                    </label>
                                </div>

                                <hr />

                                

                                <!-- Create Button -->
                                <div class="a-row a-spacing-extra-large mb-4">
                                    <div class="a-button-primary text-center justify-center">
                                        <span class="a-button-inner">
                                            <nuxt-link to="/" class="a-button-text"> 
                                                Back to Homepage
                                             </nuxt-link>
                                        </span>
                                    </div>
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