<template>
    <v-img src="../assets/fondo.png">
        <v-app-bar app height="85%">
            <v-toolbar-title>
                <router-link to="/explorar" style="text-decoration: none;">
                    <v-img lazy-src="" max-height="100" max-width="130" src="../assets/FutSwap.png">
                    </v-img>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                    {{ item.title }}
                </v-btn>
                <v-btn flat @click="logout"> 
                    <v-icon rightdark>
                        logout
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-app id="inspire" class="transparent">
            <div class="container pt-10">
                <v-row dense class="justify-center pa-7">
                    <v-col :cols="8">
                        <v-card>
                            <v-card-title class="justify-center">
                                <v-avatar size="200" class="pt-5">
                                    <v-img
                                        src="../assets/juanfer.jpg"
                                        alt="John"

                                    ></v-img>
                                </v-avatar>
                            </v-card-title>
                            <v-card-text>
                                <v-card-actions class="justify-center pa-5">
                                    <v-btn color="rgb(62,77,124)" style="color:white" small elevation="2" :loading="isSelecting"  @click="handleFileImport">
                                        foto
                                        <v-icon left dark>mdi-cloud-upload</v-icon>
                                    </v-btn>
                                    <input 
                                        ref="uploader" 
                                        class="d-none" 
                                        type="file" 
                                        @change="onFileChanged"
                                    >
                                </v-card-actions>
                                <v-text-field v-model="form.name" outlined label="Nombre"></v-text-field>
                                <v-text-field v-model="form.phone" outlined label="Telefono"></v-text-field>
                                <v-text-field v-model="form.contactEmail" disabled outlined label="Correo Electronico"></v-text-field>
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
        </v-app>
    </v-img>
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

const auth = getAuth();

export default {
  data: () => ({
    loading: false,
    form: {
      name: auth.currentUser.displayName,
      contactEmail: auth.currentUser.email,
      phone: auth.currentUser.phoneNumber,
    },
    step: 1,
    appTitle: 'FutSwap',
    menuItems: [
        {title: 'Explorar', path: '/explorar'},
        {title: 'Inventario', path:'/collection'},
        {title: auth.currentUser.email, path: ''},
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
      await router.push('/landing');
    },
    update: async function () {
        alert(auth.currentUser.uid);
        alert(auth.currentUser.displayName);
        alert(auth.currentUser.phoneNumber);
    },
    handleFileImport() {
                this.isSelecting = true;

                // After obtaining the focus when closing the FilePicker, return the button state to normal
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, { once: true });
                
                // Trigger click on the FileInput
                this.$refs.uploader.click();
            },
            onFileChanged(e) {
                this.selectedFile = e.target.files[0];

                alert(this.selectedFile.name);
            },
  }
};
</script>