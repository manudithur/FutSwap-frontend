<template>
<v-app class="ma-0 pa-0">
    <NavBar />
    <v-main id="inspire" class="transparent">
        <div class="container pt-10">
            <v-row dense class="justify-center align-center pa-7">
                <v-col cols="3">
                    <v-card class="text-center justify-center align-center white mx-3 mb-3 pa-3">
                        <v-card-title class="justify-center">
                            <v-avatar circle size="150" class="pt-5" :loading="isSelecting" @click="handleFileImport">
                                <input ref="uploader" class="d-none" type="file" @change="onFileChanged">
                                <v-img src="../assets/juanfer.jpg" />
                            </v-avatar>
                        </v-card-title>
                        <p class="pt-5 pb-0 mb-0">RATING:</p>
                        <v-rating background-color="warning lighten-1" color="warning" empty-icon="mdi-star-outline"
                            full-icon="mdi-star" half-icon="mdi-star-half-full" half-increments length="5" readonly
                            size="20" value="4.5"></v-rating>
                    </v-card>
                    <v-card class="text-center align-center white mx-3 mb-3 pa-3">
                        <h1>PROGRESO</h1>
                        <v-progress-linear v-model=progress color="rgb(62,77,124)" height="25">{{progress}}%
                        </v-progress-linear>
                    </v-card>
                    <v-card class="text-center align-center white ma-3 pa-3">
                        <h1>SWAPS</h1>
                        <h1>73</h1>
                    </v-card>
                </v-col>
                <v-col cols="6 ma-0">
                    <v-card class="text-center ma-0 align-center justify-center pa-5">
                        <v-card-text>
                            <v-text-field v-model="form.name" outlined label="Nombre" />
                            <v-text-field v-model="form.contactEmail" disabled outlined label="Correo Electronico" />
                            <v-text-field v-model="form.phone" outlined label="Telefono" />
                            <v-text-field v-model="form.direccion" outlined label="Direccion" />
                        </v-card-text>
                        <v-card-actions class="justify-center pb-5 pt-n5">
                            <v-btn color="rgb(62,77,124)" style="color:white" @click="update">
                                Guardar cambios
                                <v-icon left dark>check</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-main>
    <FooterBar/>
</v-app>
</template>

<style scoped>
html {
    overflow: visible;
    -ms-overflow-style: none;
}
</style>

<script>
import { getAuth } from 'firebase/auth'
import router from '../router/index';
import { signOut } from "firebase/auth";
import Swal from 'sweetalert2';
import { updateUserProfileAsync } from '../backend/users'
import NavBar from '../components/NavBar.vue';
import FooterBar from '../components/FooterBar.vue';

const auth = getAuth();

export default {
    data: () => ({
        loading: false,
        progress: 25,
        form: {
            name: auth.currentUser.displayName,
            contactEmail: auth.currentUser.email,
            phone: auth.currentUser.phoneNumber,
        },
        step: 1,
        appTitle: "FutSwap",
        menuItems: [
            { title: "Explorar", path: "/explorar" },
            { title: "Inventario", path: "/collection" },
            { title: auth.currentUser.email, path: "" },
        ],
        isSelecting: false,
        selectedFile: null
    }),
    props: {
        source: String
    },
    methods: {
        logout: async function () {
            const auth = getAuth();
            await signOut(auth);
            await router.push("/landing");
        },
        update: function () {
            updateUserProfileAsync(this.form.name, "");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cambios guardados",
                showConfirmButton: false,
                timer: 1500
            });
        },
        handleFileImport() {
            this.isSelecting = true;
            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener("focus", () => {
                this.isSelecting = false;
            }, { once: true });
            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },
        onFileChanged(e) {
            this.selectedFile = e.target.files[0];
            alert(this.selectedFile.name);
        },
    },
    components: { NavBar, FooterBar }
};
</script>