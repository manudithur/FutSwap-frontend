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
              <v-avatar
                circle
                size="150"
                class="pt-5"
                :loading="isSelecting"
                @click="handleFileImport"
              >
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  @change="onFileChanged"
                />
                <v-img src="../assets/juanfer.jpg" />
              </v-avatar>
            </v-card-title>
            <p class="pt-5 pb-0 mb-0">RATING:</p>
            <v-rating
              background-color="warning lighten-1"
              color="warning"
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

<style scoped>
html {
  overflow: visible;
  -ms-overflow-style: none;
}

.content {
  background: url("../assets/fondo.png") no-repeat center;
  background-size: cover;
  height: 100%;
}
</style>

<script>
import { getAuth } from "firebase/auth";
import router from "../router/index";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import {
  getCurrentUser,
  getUserPrivateProfileAsync,
  getUserPublicProfileAsync,
  updateUserPrivateProfileAsync,
  updateUserProfileAsync,
  updateUserPublicProfileAsync,
} from "../backend/users";
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
    selectedFile: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    // Empiezo a buscar el dato a la API. Esta tarea queda corriendo en el fondo.
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const user = await getCurrentUser();
        this.name = user.displayName;
        this.email = user.email;
        const publicData = await getUserPublicProfileAsync(user.uid);
        this.phone = publicData.phone;
        const privateData = await getUserPrivateProfileAsync();
        this.address = privateData.address;
      } finally {
        // Haya pasado lo que haya pasado, pongo esto en false para indicar que ya no estoy cargando más.
        this.isLoading = false;
      }
    },
    logout: async function () {
      const auth = getAuth();
      await signOut(auth);
      await router.push("/landing");
    },
    update: async function () {
      try {
        await updateUserProfileAsync(this.name, "");
        await updateUserPublicProfileAsync({phone: this.phone}, true);
        await updateUserPrivateProfileAsync({address: this.address}, true)
      } catch (e) {
        // Si hubo algun error...
        const errorMessage =
          "Error al actualizar perfil. Reintentar. Si persiste el error contactar soporte";
        await Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: true,
        });
      } finally {
        // Haya pasado lo que haya pasado, pongo esto en false para indicar que ya no estoy cargando más.
        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Cambios guardados",
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
        { once: true }
      );
      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      alert(this.selectedFile.name);
    },
  },
  components: { NavBar, FooterBar },
};
</script>