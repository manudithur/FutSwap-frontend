<template>
  <v-app id="PostTradingSpace" class="transparent">
    <NavBar />
    <v-container class="align-center pt-10">
      <v-card>
        <v-row class="justify-center">
          <v-card-title class="text-center">
            <h1
              class="display-2 font-weight-bold pt-5"
              style="color: rgb(62, 77, 124)"
            >
              Felicidades por usar nuestra app para tradear
            </h1>
            <h2
              class="display-2 font-weight-bold pt-5"
              style="color: rgb(62, 77, 124)"
            >
              Debajo esta la informacion del trade que acaba de realizar
            </h2>
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
                  Lo que recibiste
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
                      <template v-slot:default="{ active }">
                        <v-avatar size="70">
                          <v-img :src="tradeitem.img"> </v-img>
                        </v-avatar>

                        <v-list-item-content class="pa-8">
                          <v-list-item-title
                            v-text="tradeitem.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </template>
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
                  Lo que ofertaste
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
              color="rgb(62,77,124)"
              style="color: white"
              @click="update"
            >
              VOLVER A EXPLORAR
              <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <v-btn
              large
              color="rgb(62,77,124)"
              style="color: white"
              @click="update"
            >
              VOLVER A TRADEAR
              <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions class="pa-4">
            Califique este trade
            <v-spacer></v-spacer>
            <span class="grey--text text--lighten-2 text-caption mr-2">
              ({{ rating }})
            </span>
            <v-rating
              v-model="rating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="16"
            ></v-rating>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-container>
    <FooterBar />
  </v-app>
</template>


<script>
import router from "../router/index";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";

export default {
  data: () => ({
    tradeitems: [
      {
        name: "ARG 5",
        img: require("../assets/figus/arg05.jpg"),
      },
      {
        name: "ARG 10",
        img: require("../assets/figus/arg10.jpg"),
      },
      {
        name: "FRA 6",
        img: require("../assets/figus/fra06.jpg"),
      },
      {
        name: "JPN 3",
        img: require("../assets/figus/jpn03.jpg"),
      },
    ],
    yourinventory: [
      {
        name: "BEL 6",
        img: require("../assets/figus/bel06.jpg"),
      },
      {
        name: "ARG 1",
        img: require("../assets/figus/arg01.jpg"),
      },
      {
        name: "GER 6",
        img: require("../assets/figus/ger06.jpg"),
      },
      {
        name: "POR 3",
        img: require("../assets/figus/por03.jpg"),
      },
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    logout: async function () {
      signOutAsync();
      await router.push("/landing");
    },
  },
  components: { NavBar, FooterBar },
};
</script>