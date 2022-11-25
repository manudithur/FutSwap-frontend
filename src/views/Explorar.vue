<template>
  <v-app>
    <NavBar/>
    <v-main class="bg">
      <v-container class="mb-8">
        <v-row class="ma-0 align-center">
          <v-col class="col-lg-11 col-sm-12 pa-0">
            <h1 class="text-h3 text-uppercase white--text font-weight-black"
                style="text-shadow: 0px 1px 4px #3E4D7C">Explorar swaps</h1>
          </v-col>
          <v-col class="col-lg-1 col-sm-2 pa-0 text-center">
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-large icon style="color: white" @click="about" v-bind="attrs" v-on="on">
                  <v-icon size="38" style="text-shadow: 0px 1px 4px #3E4D7C">mdi-filter-cog-outline</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Distancia de búsqueda</v-list-item-subtitle>
                      <v-list-item-action class="ma-0 mt-7 mb-0">
                        <v-col class="col-md-12">
                          <v-slider class="align-center" v-model="radius" :max="250" thumb-label="always"
                                    thumb-color="blue" dense color="var(--gold)" track-color="var(--lightblue)"/>
                        </v-col>
                      </v-list-item-action>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-card-actions class="justify-center">
                  <v-btn color="var(--darkblue)" text @click="menu = false">Cancelar</v-btn>
                  <v-btn color="var(--gold)" text @click="menu = false" v-on:click="radiusbtn = radius">Aplicar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;">
        <v-row class="pa-4">
          <swap-offer-view v-for="(swap, k) in swaps" :key="k" :swap="swap"/>
        </v-row>
      </v-container>
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

.bg {
  background-image: url("../assets/fondo.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.profile-pic {
  height: 180px;
  border-radius: 4px 4px 0 0;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  object-fit: cover;
}

.faded {
  color: #999;
}

.grow {
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.05);
}

</style>

<script>
import NavBar from '../components/NavBar.vue';
import FooterBar from '../components/FooterBar.vue';
import SwapOfferView from "@/components/SwapOfferView";

export default {
  data: () => ({
    radius: 234,
    radiusbtn: 234,
    swaps: [
      {
        distance: 0.7,
        name: "Nestor",
        parati: "7",
        busc: "5",
        past: "50",
        rate: "17",
        id: "1",
        img: require("../assets/persona1.jpeg"),
        rating: "5"
      },
      {
        distance: 0.2,
        name: "Cristian",
        parati: "2",
        busc: "5",
        past: "50",
        rate: "17",
        id: "2",
        img: require("../assets/persona2.jpg"),
        rating: "2"
      },
      {
        distance: 0.7,
        name: "Miguel",
        parati: "7",
        busc: "5",
        past: "50",
        rate: "17",
        id: "3",
        img: require("../assets/persona3.jpg"),
        rating: "3.5"
      },
      {
        distance: 6,
        name: "Jony",
        parati: "10",
        busc: "5",
        past: "50",
        rate: "17",
        id: "4",
        img: require("../assets/persona4.jpg"),
        rating: "5"
      },
      {
        distance: 67,
        name: "Esequiel",
        parati: "200",
        busc: "5",
        past: "50",
        rate: "17",
        id: "5",
        img: require("../assets/persona5.webp"),
        rating: "1.5"
      },
      {
        distance: 233,
        name: "Ricardo",
        parati: "2",
        busc: "5",
        past: "50",
        rate: "17",
        id: "6  ",
        img: require("../assets/persona6.webp"),
        rating: "0.5"
      }
    ]
  }),
  props: {
    source: String
  },
  components: {SwapOfferView, NavBar, FooterBar}
}
</script>
