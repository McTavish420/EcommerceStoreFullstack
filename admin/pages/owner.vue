<template>
    <main>
        <div class="container-fluid c-section">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Add A New Product</h2>
                        <form>

                            <!-- Name Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Name</label>
                                <input type="text"
                                 class="a-input-text" 
                                 style="width: 100%"
                                 v-model="name">
                            </div>

                            <!-- About Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">About</label>
                                <textarea 
                                placeholder="Please provide details info about Owner"
                                style="width: 100%" v-model="about"></textarea>
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
                                        @click="onAddOwner">Add Owner</span>
                                    </span>
                                </span>
                            </div>
                        </form>

                        <br>
                        <ul class="list-group-item">
                            <li 
                            v-for="owner in owners" 
                            :key="owner._id">{{ owner.name }} <hr></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData ({ $axios }) {
        try {
            let response = await $axios.$get('https://ecommstore2019.herokuapp.com/api/owners')

        return {
            owners: response.owners
        }
        } catch (error) {
            
        }
    },
    // asyncData() process on server side,
    // data() process on client side
    data () {
        return {
            name: '',
            about: '',
            selectedFile: null,
            fileName: ''
        }
    },

    methods: {
        onSelectedFile (event) {
            this.selectedFile = event.target.files[0]
            this.fileName = event.target.files[0].name
        },
        
        async onAddOwner () {
            try {
                let data = new FormData()
                data.append('name', this.name)
                data.append('about', this.about)
                data.append('photo', this.selectedFile, this.selectedFile.name)

            let result = await this.$axios.$post(
                'https://ecommstore2019.herokuapp.com/api/owners',
                data
            )
            this.owners.push(this.name)
            } catch (error) {
                
            }

        }
    }
}
</script>