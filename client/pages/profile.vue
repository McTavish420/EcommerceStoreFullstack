<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 >Profile Page</h2>
                        <a href="#" @click="onLogOut">Log Out</a>
                        <form>

                            <!-- Name Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Username</label>
                                <input type="text"
                                 class="a-input-text" 
                                 style="width: 100%"
                                 v-model="userName"
                                 :placeholder="$store.getters.getUserName">
                            </div>

                            <!-- Email Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Email</label>
                                <input type="email"
                                 class="a-input-text" 
                                 style="width: 100%"
                                 v-model="email"
                                 :placeholder="$store.getters.getUser.email">
                            </div>

                            <!-- Password Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Password</label>
                                <input type="password"
                                 class="a-input-text" 
                                 style="width: 100%"
                                 v-model="password">
                            </div>

                            <hr>
                            <!-- Add Button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span 
                                        class="a-button-text" 
                                        @click="onUpdateProfile">Update Profile</span>
                                    </span>
                                </span>
                            </div>
                        </form>

                        <br>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    middleware: 'auth',
    data () {
        return {
            userName: '',
            email: '',
            password: ''
        }
    },


    methods: {
        ...mapGetters(['getUserName', 'getUser']),
        async onUpdateProfile () {
            let data = {
                userName: this.userName,
                email: this.email,
                password: this.password
            }

            try {
                let response = await this.$axios.$put(`${process.env.DEV_BACKEND}/api/auth/user`, data)
                if (response.success) {
                    this.userName = ''
                    this.email = ''
                    this.password = ''

                    await this.$auth.fetchUser()
                    await this.$store.dispatch('setLoggedUser')
                }
            } catch (error) {
                console.log(error)
            }
        },

        async onLogOut () {
            await this.$auth.logout()
            this.$store.dispatch('clearUser')
            this.$store.commit('clearCart')
            this.$router.push('/')
        }
    }

}
</script>