<template>
  <v-app fill-height app>
    <NavBar />
    <v-main app class="content align-center pt-10 ma-0">
      <v-row
        class="fill-height justify-center align-center pa-5 ma-0"
        v-if="isLoading"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          :size="70"
          :width="7"
        ></v-progress-circular>
      </v-row>
      <v-row
        dense
        class="fill-height justify-center align-center pa-5 ma-0"
        v-if="!isLoading"
      >
        <v-col cols="3">
          <v-card
            class="text-center justify-center align-center white mx-3 mb-3 pa-3"
          >
            <v-card-title class="justify-center">
              <v-badge
                avatar
                bordered
                bottom
                content=""
                color="var(--darkblue)"
                icon=""
                overlap
                offset-x="32"
                offset-y="32"
              >
                <template v-slot:badge>
                  <v-icon size="20" style="z-index: 1; height:26px !important; width: 26px !important;" @click="handleFileImport">mdi-tray-arrow-up</v-icon>
                </template>
                <v-avatar
                  circle
                  size="150"
                  :loading="isSelecting"
                >
                  <input ref="uploader" class="d-none" type="file" accept="image/jpeg" @change="onFileChanged"/>
                  <v-img v-if="profilePictureUrl" :src="profilePictureUrl" />
                </v-avatar>
              </v-badge>
            </v-card-title>
            <p class="pt-5 pb-0 mb-0">RATING:</p>
            <v-rating
              background-color="var(--gold)"
              color="var(--gold)"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              half-increments
              length="5"
              readonly
              size="20"
              value="4.5"
            ></v-rating>
          </v-card>
          <v-card class="text-center align-center white mx-3 mb-3 pa-3">
            <h1>PROGRESO</h1>
            <v-progress-linear
              v-model="progress"
              color="rgb(62,77,124)"
              height="25"
              >{{ progress }}%
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
              <v-text-field v-model="name" outlined label="Nombre" />
              <v-text-field
                v-model="email"
                disabled
                outlined
                label="Correo Electronico"
              />
              <v-text-field v-model="phone" outlined label="Telefono" />
              <v-text-field v-model="address" outlined label="Direccion" />
            </v-card-text>
            <v-card-actions class="justify-center pb-5 pt-n5">
              <v-btn
                color="rgb(62,77,124)"
                style="color: white"
                @click="update"
              >
                Guardar cambios
                <v-icon left dark>check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<style>
:root {
  --darkblue: #3E4D7C;
  --indigo: #5779B2;
  --lightblue: #B2D8FF;
  --gold: #E6BF3F;
}

html {
    overflow: visible;
    -ms-overflow-style: none;
}

.content {
  background: url("../assets/fondo.png") no-repeat center;
  background-size: cover;
  height: 100%;
}

.v-badge__badge {
  height: 32px !important;
  width: 32px !important;
  border-radius: 50% !important;
  padding: 4px !important;
}

.v-badge__badge::after {
  border-width: 3px !important;
}
</style>

<script> 
import { getAuth } from 'firebase/auth'
import router from '../router/index';
import { signOut } from "firebase/auth";
import Swal from 'sweetalert2';
import { updateUserProfileAsync } from '../backend/users'

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
    update: function () {
        updateUserProfileAsync(this.form.name, '');
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios guardados',
            showConfirmButton: false,
            timer: 1500
        });
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