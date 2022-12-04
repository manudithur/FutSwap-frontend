<template>
  <v-app id="TradingSpace" class="transparent">
    <NavBar/>
    <v-main class="content">
      <v-container class="align center pt-10">
        <v-card>
          <v-row class="justify-center">
            <v-card-title class="text-center">
              <h1
                  class="display-2 font-weight-bold pt-5"
                  style="color: rgb(62, 77, 124)"
              >
                REALIZAR OFERTA
              </h1>
            </v-card-title>
          </v-row>
          <template v-if="errorMessage">
            <v-row width="100%" class="flex justify-center align-center pb-4">
              <h3>{{ errorMessage }}
                <router-link to="/explorar"> Volver a explorar</router-link>
              </h3>
            </v-row>
          </template>
          <template v-else>
            <v-row class="justify-center pt-2">
              <v-col cols="5">
                <v-card class="pt-5" elevation="0">
                  <v-card-title class="text-center justify-center">
                    <h4
                        class="display-1 font-weight-regular pt-5"
                        style="color: rgb(62, 77, 124)"
                    >
                      CUÁLES DOY
                    </h4>
                  </v-card-title>
                  <v-list>
                    <v-list-item-group multiple class="pa-5">
                      <v-list-item v-for="(figu, i) in figuCodesSender" :key="i" class="pa-5" :value="figu.name"
                                   active-class="deep-blue--text text--accent-4" @click="figu.checked = !figu.checked">
                        <template v-slot:default="{ active }">
                          <v-avatar size="70">
                            <v-img :src="figu.img"></v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title v-text="figu.name"/>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox :v-model="figu.checked" color="deep-blue accent-4" :value="figu.checked"/>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="5">
                <v-card class="pt-5" elevation="0">
                  <v-card-title class="text-center justify-center">
                    <h4
                        class="display-1 font-weight-regular pt-5"
                        style="color: rgb(62, 77, 124)"
                    >
                      CUÁLES RECIBO
                    </h4>
                  </v-card-title>
                  <v-list>
                    <v-list-item-group multiple class="pa-5">
                      <v-list-item v-for="(figu, i) in figuCodesReceiver" :key="i" class="pa-5" :value="figu.name"
                                   active-class="deep-blue--text text--accent-4" @click="figu.checked = !figu.checked">
                        <template v-slot:default="{ active }">
                          <v-avatar size="70">
                            <v-img :src="figu.img"></v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title v-text="figu.name"/>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox :v-model="figu.checked" color="deep-blue accent-4" :value="figu.checked"/>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-card-actions class="justify-center pa-8">
                <v-btn large color="rgb(62,77,124)" style="color: white" :loading="isSending" @click="sendClicked">
                  ENVIAR OFERTA
                  <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
              </v-card-actions>
            </v-row>
          </template>
        </v-card>
      </v-container>
    </v-main>
    <FooterBar/>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import Swal from "sweetalert2";
import {createSwapAsync} from "@/backend/swaps";

export default {
  components: {NavBar, FooterBar},

  data: () => ({
    errorMessage: null,
    swap: null,

    figuCodesReceiver: [],
    figuCodesSender: [],

    isSending: false,
  }),

  mounted() {
    this.swap = this.$store.state.explore.exploreSwap;
    if (!this.swap) {
      this.errorMessage = "¡Ups! Ocurrió un error cargando esta página";
      return;
    }

    this.swap.figuCodesReceiver.forEach(f => {
      this.figuCodesReceiver.push({
        figuCode: f,
        name: f.toUpperCase(),
        img: require("../assets/figuritas/" + f + ".jpg"),
        checked: false,
      });
    })

    this.swap.figuCodesSender.forEach(f => {
      this.figuCodesSender.push({
        figuCode: f.figuCode,
        name: f.figuCode.toUpperCase(),
        img: require("../assets/figuritas/" + f.figuCode + ".jpg"),
        checked: false,
      });
    })
  },

  methods: {
    async sendClicked() {
      if (this.isSending === true)
        return;

      const figusSender = this.figuCodesSender.filter(f => f.checked).map(f => f.figuCode);
      const figusReceiver = this.figuCodesReceiver.filter(f => f.checked).map(f => f.figuCode);

      if (figusSender.length == 0 && figusReceiver.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Por favor seleccione las figuritas que quiere intercambiar",
          showConfirmButton: true,
        });
        return;
      }

      if (figusSender.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Todos queremos que nos regalen figuritas, pero nadie va a aceptar un swap en el que no recibe nada!",
          showConfirmButton: true,
        });
        return;
      }

      if (figusReceiver.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Es muy lindo de tu parte regalar figuritas! Pero te pedimos que eligas cuáles queres recibir.",
          showConfirmButton: true,
        });
        return;
      }

      try {
        this.isSending = true;
        const createdSwap = await createSwapAsync("qatar2022", this.swap.uidReceiver, figusReceiver, figusSender);
        console.log("Swap created!", createdSwap);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha creado el swap!",
          showConfirmButton: true,
        });
        await this.$router.back();
      } catch(e) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error mandando el swap! :/\n Vuelva a intentar más tarde.",
          showConfirmButton: true,
        });
      } finally {
        this.isSending = false;
      }
    }
  }
};
</script>