<template>
  <div class="registerPage">
    <div class="container">
      <div class="row my-5">
        <div class="col-sm-4 mx-auto">
          <div class="text-center">
            <nuxt-link to="/"><img src="/img/ECOM.png" /></nuxt-link>
          </div>

          <form class="mt-4">
            <div class="a-box a-spacing-extra-larger">
              <div class="a-box-inner">
                <h1 class="a-spacing-small text-center">Create Account</h1>

                <!-- Username Field -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Username</label
                  >
                  <input
                    type="text"
                    id="ap_customer_name"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="userName"
                  />
                  
                  <div class="a-alert-container">
                    <div
                      v-text="validateUsername()"
                      :class="nError ? `text-danger` : `text-success`"
                    >
                    </div>
                  </div>
                </div>

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
                  <div class="a-alert-container">
                    <div
                      v-text="checkEmail()" 
                      :class="eError ? `text-danger` : `text-success`">
                    </div>
                  </div>
                  <div class="a-alert-container" v-if="eAvail">
                    <div
                      class="a-alert-content text-danger"
                      style="font-weight: normal; font-size: 7"
                    >
                      {{ emailAvail }}
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
                  <div class="a-alert-container">
                    <div
                      v-text="checkPassword()" 
                      :class="pError ? `text-danger` : `text-success`">
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
                    <nuxt-link to="/login" class="a-link-emphasis"
                      >Sign In</nuxt-link
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
      userName: "",
      email: "",
      password: "",
      emailAvail: "",
      eAvail: false,
      nError: false,
      eError: false,
      pError: false,
    };
  },

  methods: {
      validateUsername () {
          if (this.userName.length == 0) {
              this.nError = true
              return 'Username is Required'
          } else if (this.userName.length >= 12) {
              this.nError = true
              return 'Username is too long'
          } else if (this.userName.length <= 6) {
              this.nError = true
              return 'Username is too short'
          } else {
              this.nError = false
              return 'Username seems OK'
          }
      },
    async onSignUp() {
      try {
        let data = {
          userName: this.userName,
          email: this.email,
          password: this.password,
        };
        let response = await this.$axios.$post(
          `${process.env.DEV_BACKEND}/api/auth/email`,
          data
        );
        if (!response.success) {
          this.eAvail = true;
          this.emailAvail = response.message;
          return;
        } else {
          this.eAvail = false;
          this.emailAvail = "";
        }

        if (!this.nError && !this.eError && !this.pError) {
          let response = await this.$axios.$post(
            `${process.env.DEV_BACKEND}/api/auth/signup`,
            data
          );

          if (response.success) {
            this.$router.push("/verify");
          }
        }
      } catch (error) {
        this.nError = true
        this.pError = true;
        this.eError = true;
        console.log(error);
      }
    },
    checkEmail() {
        let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if (!regex.test(this.email)) {
            this.eError = true
            return 'Enter a valid Email Address'
        } else {
            this.eError = false
            return 'Email Address is OK'
        }
    },
    checkPassword() {
      let letter = /[a-z]+/;
      let upper = /[A-Z]+/;
      let number = /[0-9]+/;
      let special = /[-+_!@#$%^&*., ?]+/;
      if (this.password.length == 0) {
          this.pError = true
          return 'Please Enter a strong Password'
      } else if (this.password.length < 6) {
          this.pError = true
          return 'Password must contain at least 6 characters'
      } else if (!letter.test(this.password)) {
          this.pError = true
          return 'Password must contain at least 1 lowercase letter'
      } else if (!upper.test(this.password)) {
          this.pError = true
          return 'Password must contain at least 1 uppercase letter'
      } else if (!number.test(this.password)) {
          this.pError = true
          return 'Password must contain at least 1 numerical digit'
      } else if (!special.test(this.password)) {
          this.pError = true
          return 'Password must contain at least 1 special character like !@#$%'
      } else {
          this.pError = false
          return 'Password is OK'
      }
    },
  },
};
</script>