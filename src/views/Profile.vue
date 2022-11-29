<template>
  <v-app fill-height app>
    <NavBar/>
    <v-main app class="content align-center pt-10 ma-0">
      <v-row class="fill-height justify-center align-center pa-5 ma-0" v-if="isLoading">
        <v-progress-circular indeterminate color="primary" :size="70" :width="7"
        ></v-progress-circular>
      </v-row>
      <v-row dense class="fill-height justify-center align-center pa-5 ma-0" v-if="!isLoading">
        <v-col cols="3">
          <v-card class="text-center justify-center align-center white mx-3 mb-3 pa-3">
            <v-card-title class="justify-center">
              <v-badge avatar bordered bottom content="" color="var(--darkblue)" icon="" overlap offset-x="32"
                       offset-y="32">
                <template v-slot:badge>
                  <v-icon size="20" style="z-index: 1; height:26px !important; width: 26px !important;"
                          @click="handleFileImport">mdi-tray-arrow-up
                  </v-icon>
                </template>
                <v-avatar circle size="150" :loading="isSelecting">
                  <input ref="uploader" class="d-none" type="file" accept="image/jpeg" @change="onFileChanged"/>
                  <v-img v-if="profilePictureUrl" :src="profilePictureUrl"/>
                </v-avatar>
              </v-badge>
            </v-card-title>
            <div style="height: 80px">
              <v-progress-circular v-if="isLoadingRating" :indeterminate="true" class="mt-4"/>
              <p v-else-if="ratingError">{{ ratingError }}</p>
              <template v-else>
              <p class="pt-5 pb-0 mb-0">CALIFICACIÓN:</p>
              <v-rating background-color="var(--gold)" color="var(--gold)" empty-icon="mdi-star-outline"
                        full-icon="mdi-star" half-icon="mdi-star-half-full" half-increments length="5"
                        readonly size="20" :value="rating"/>
              </template>
            </div>
          </v-card>
          <v-card class="text-center align-center white mx-3 mb-3 pa-3">
            <h1>PROGRESO</h1>
            <v-progress-linear v-model="progress" color="rgb(62,77,124)" height="25">{{ progress }}%</v-progress-linear>
          </v-card>
          <v-card class="text-center align-center white ma-3 pa-3">
            <h1>SWAPS</h1>
            <h1>73</h1>
          </v-card>
        </v-col>
        <v-col cols="6 ma-0">
          <v-card class="text-center ma-0 align-center justify-center pa-5">
            <v-card-text>
              <v-text-field v-model="name" outlined label="Nombre"/>
              <v-text-field v-model="email" disabled outlined label="Correo Electronico"/>
              <v-text-field v-model="phone" outlined label="Telefono"/>
              <v-text-field v-model="address" outlined label="Direccion"/>
            </v-card-text>
            <v-card-actions class="justify-center pb-5 pt-n5">
              <v-btn color="rgb(62,77,124)" style="color: white" @click="update">
                Guardar cambios
                <v-icon left dark>check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar/>
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
import router from "../router/index";
import Swal from "sweetalert2";
import {
  getCurrentUser,
  getUserPrivateProfileAsync,
  getUserProfilePictureAsync,
  getUserPublicProfileAsync,
  getUserRatingAsync,
  signOutAsync,
  updateUserPrivateProfileAsync,
  updateUserPublicProfileAsync,
  uploadProfilePicture,
} from "@/backend/users";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";

export default {
  data: () => ({
    progress: 25,
    isLoading: true,
    name: null,
    email: null,
    phone: null,
    address: null,
    isSelecting: false,

    isLoadingProfileUrl: false,
    profilePictureUrl: null,

    isLoadingRating: false,
    rating: null,
    ratingError: null,

    isUploadingProfilePicture: false,
    profileUploadFile: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    // Empiezo a buscar el dato a la API. Esta tarea queda corriendo en el fondo.
    this.loadData();
    this.loadProfilePicture();
    this.loadRating();
  },
  methods: {
    async loadData() {
      try {
        const user = getCurrentUser();
        this.email = user.email;
        const publicProfilePromise = getUserPublicProfileAsync(user.uid);
        const privateProfilePromise = getUserPrivateProfileAsync();
        const publicData = await publicProfilePromise;
        const privateData = await privateProfilePromise;

        this.name = publicData.displayName;
        this.phone = publicData.phone;
        if (privateData.address)
          this.address = privateData.address;
        else if (privateData.location)
          this.address = privateData.location.toString();
        else
          this.address = '';

        // ~~PROVISORIO~~ PARA HACER AUTOMÁTICO EL PASAJE DE user.displayName A publicProfile.displayName
        if (!publicData.displayName || publicData.displayName == '') {
          this.name = user.displayName;
          await updateUserPublicProfileAsync({displayName: user.displayName}, true);
        }
      } finally {
        // Haya pasado lo que haya pasado, pongo esto en false para indicar que ya no estoy cargando más.
        this.isLoading = false;
      }
    },

    async loadProfilePicture() {
      this.isLoadingProfileUrl = true;
      try {
        this.profilePictureUrl = await getUserProfilePictureAsync(getCurrentUser().uid);
      } finally {
        this.isLoadingProfileUrl = false;
      }
    },

    async loadRating() {
      this.isLoadingRating = true;
      try {
        this.rating = (await getUserRatingAsync(getCurrentUser().uid)).average;
      } catch (e) {
        console.log("Ratings F 💀", e);
        this.rating = null;
        this.ratingError = "No pudimos cargar tu calificación 💀";
      } finally {
        this.isLoadingRating = false;
      }
    },

    async onFileChanged(e) {
      if (this.isUploadingProfilePicture) {
        alert('Por favor espere a que termine de subir el archivo anterior');
        return;
      }

      this.isUploadingProfilePicture = true;
      this.isLoadingProfileUrl = true;
      this.profileUploadFile = e.target.files[0];
      try {
        this.profilePictureUrl = await uploadProfilePicture(this.profileUploadFile);
      } catch (e) {
        console.log(e);
        alert('No pudimos subir tu foto de perfil. Asegurate que pese menos de 5MBs!');
      } finally {
        this.isUploadingProfilePicture = false;
        this.isLoadingProfileUrl = false;
      }
    },

    logout: async function () {
      await signOutAsync();
      await router.push("/landing");
    },

    update: async function () {
      try {
        const updatePublicPromise = updateUserPublicProfileAsync({
          displayName: this.name,
          phone: this.phone ? this.phone : ""
        }, true);
        const updatePrivatePromise = updateUserPrivateProfileAsync({address: this.address ? this.address : ""}, true);
        await updatePublicPromise;
        await updatePrivatePromise;

        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Cambios guardados",
          showConfirmButton: true,
        });
      } catch (e) {
        console.log(e);
        // Si hubo algun error...
        const errorMessage =
            "Error al actualizar perfil. Reintentar. Si persiste el error contactar soporte";
        await Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: true,
        });
      }
    },
    handleFileImport() {
      this.isSelecting = true;
      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
          "focus",
          () => {
            this.isSelecting = false;
          },
          {once: true}
      );
      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },
  },
  components: {NavBar, FooterBar},
};
</script>
