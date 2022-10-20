<template>
  <v-app id="TradingSpace" class="transparent">
    <NavBar />
    <v-main class="content">
      <v-container class="align-center pt-10">
        <v-card>
          <v-row class="justify-center">
            <v-card-title class="text-center">
              <h1
                class="display-2 font-weight-bold pt-5"
                style="color: rgb(62, 77, 124)"
              >
                REVISAR OFERTA
              </h1>
            </v-card-title>
          </v-row>
          <v-row class="justify-center pt-2">
            <v-col cols="5">
              <v-card class="pt-5" elevation="0">
                <v-card-title class="text-center justify-center">
                  <h4
                    class="display-1 font-weight-regular pt-5"
                    style="color: rgb(62, 77, 124)"
                  >
                    RECIBIR
                  </h4>
                </v-card-title>
                <v-list>
                  <v-list-item-group multiple class="pa-5">
                    <template v-for="(tradeitem, i) in tradeitems" class="pa-5">
                      <v-divider
                        v-if="!tradeitem.name"
                        :key="`divider-${i}`"
                      ></v-divider>

                      <v-list-item
                        v-else
                        :key="`tradeitem-${i}`"
                        :value="tradeitem.name"
                        active-class="deep-blue--text text--accent-4"
                      >
                        <template v-slot:default="{ active }" class="grey pa-2">
                          <v-avatar size="70">
                            <v-img :src="tradeitem.img"> </v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title
                              v-text="tradeitem.name"
                            ></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              :input-value="tradeitem.status"
                              disabled
                              color="deep-blue accent-4"
                            ></v-checkbox>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="1" class="text-center">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col cols="5">
              <v-card class="pt-5" elevation="0">
                <v-card-title class="text-center justify-center">
                  <h4
                    class="display-1 font-weight-regular pt-5"
                    style="color: rgb(62, 77, 124)"
                  >
                    ENTREGAR
                  </h4>
                </v-card-title>
                <v-list>
                  <v-list-item-group multiple class="pa-5">
                    <template v-for="(myinv, i) in yourinventory" class="pa-5">
                      <v-divider
                        v-if="!myinv.name"
                        :key="`divider-${i}`"
                      ></v-divider>

                      <v-list-item
                        v-else
                        :key="`myinv-${i}`"
                        :value="myinv.name"
                        active-class="deep-blue--text text--accent-4"
                      >
                        <template v-slot:default="{ active }">
                          <v-avatar size="70">
                            <v-img :src="myinv.img"> </v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title
                              v-text="myinv.name"
                            ></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              :input-value="myinv.status"
                              disabled
                              color="deep-blue accent-4"
                            ></v-checkbox>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-card-actions class="justify-center pa-8">
              <v-btn
                large
                color="red"
                style="font-weight: bold"
                @click="rechazar"
              >
                <v-icon left dark>mdi-cancel</v-icon>
                RECHAZAR
              </v-btn>
              <v-btn
                large
                color="yellow"
                style="font-weight: bold"
                @click="contraoferta"
              >
                CONTRAOFERTA
              </v-btn>
              <v-btn
                large
                color="green"
                style="font-weight: bold"
                @click="aceptar"
              >
                ACEPTAR
                <v-icon right dark>mdi-check-bold</v-icon>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>

  <style>
.activeList {
  background-color: black;
  color: white;
}
</style>
  
  <script>
import router from "../router/index";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";

export default {
  data: () => ({
    tradeitems: [
      {
        name: "ARG 5",
        img: require("../assets/figus/arg05.jpg"),
        status: 1,
      },
      {
        name: "ARG 10",
        img: require("../assets/figus/arg10.jpg"),
        status: 0,
      },
      {
        name: "FRA 6",
        img: require("../assets/figus/fra06.jpg"),
        status: 1,
      },
      {
        name: "JPN 3",
        img: require("../assets/figus/jpn03.jpg"),
        status: 1,
      },
    ],
    yourinventory: [
      {
        name: "BEL 6",
        img: require("../assets/figus/bel06.jpg"),
        status: 0,
      },
      {
        name: "ARG 1",
        img: require("../assets/figus/arg01.jpg"),
        status: 1,
      },
      {
        name: "GER 6",
        img: require("../assets/figus/ger06.jpg"),
        status: 0,
      },
      {
        name: "POR 3",
        img: require("../assets/figus/por03.jpg"),
        status: 0,
      },
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    aceptar: async function () {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "OFERTA ACEPTADA",
        showConfirmButton: false,
        timer: 2000,
      });
      await router.push("/explorar");
    },
    rechazar: async function () {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "OFERTA RECHAZADA",
        showConfirmButton: false,
        timer: 2000,
      });
      await router.push("/explorar");
    },
  },
  components: { NavBar, FooterBar },
};
</script>