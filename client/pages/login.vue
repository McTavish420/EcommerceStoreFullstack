<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 mx-auto my-5">
          <div class="text-center">
            <nuxt-link to="/"><img src="/img/ECOM.png" /></nuxt-link>
          </div>

          <form class="mt-4">
            <div class="a-box a-spacing-extra-larger">
              <div class="a-box-inner">
                <h1 class="a-spacing-small text-center">Sign In</h1>

                <!-- Email Field -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_email" class="a-form-label"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="ap_customer_email"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="email"
                  />
                  <div class="a-alert-container" v-if="eError">
                    <div
                      class="a-alert-content text-danger"
                      style="font-weight: normal; font-size: 7"
                    >
                      {{ emailError }}
                    </div>
                  </div>
                </div>

                <!-- Password Field -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_password" class="a-form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    id="ap_customer_password"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="password"
                  />
                  <div class="a-alert-container" v-if="pError">
                    <div
                      class="a-alert-content text-danger"
                      style="font-weight: normal; font-size: 7"
                    >
                      {{ passError }}
                    </div>
                  </div>
                </div>

                <!-- Create Button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <div class="a-button-primary text-center justify-center">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onLogIn"
                        >Continue</span
                      >
                    </span>
                  </div>

                  <div
                    class="a-row a-spacing-top-medium a-size-small text-secondary"
                  >
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
                    <nuxt-link to="/signup" class="a-link-emphasis"
                      >Sign Up</nuxt-link
                    >
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
  middleware: "auth",
  auth: "guest",
  layout: "none",

  data() {
    return {
      email: "",
      password: "",
      emailError: "Please enter Correct Email Address",
      passError: "Please enter Correct Password",
      eError: false,
      pError: false,
    };
  },

  methods: {
    async onLogIn() {
      try {
        let data = {
          email: this.email,
          password: this.password,
        };
        let eSuccess = false;
        let pSuccess = false;
        if (!this.checkEmail(data.email)) {
          this.eError = true;
        } else {
          this.eError = false;
          eSuccess = true;
        }
        if (!this.checkPassword(data.password)) {
          this.pError = true;
        } else {
          this.pError = false;
          pSuccess = true;
        }
        if (eSuccess && pSuccess) {
          let response = await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });
          await this.$auth.fetchUser()
          await this.$store.dispatch("setLoggedUser");

          this.$router.push("/");
        }
      } catch (error) {
          this.pError = true
          this.eError = true
        console.log('error here', error);
      }
    },
    checkEmail(data) {
      return data.length > 0;
    },
    checkPassword(data) {
      return data.length > 0;
    },
  },
};
</script>

<style lang="css">
.a-button-text {
  padding-left: 0px !important;
}
.a-alert-container {
  padding-left: 0px !important;
}
</style>