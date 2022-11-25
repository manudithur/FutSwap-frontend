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
                <v-btn x-large icon style="color: white" v-bind="attrs" v-on="on">
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
        <v-row width="100%" class="flex justify-center align-center pb-4">
          <v-progress-circular v-if="isLoadingSwaps" :indeterminate="true"/>
          <h3 v-if="loadSwapsError">{{loadSwapsError}}</h3>
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
import {getSwapOffers} from "@/backend/explore";

export default {
  components: {SwapOfferView, NavBar, FooterBar},

  data: () => ({
    menu: false,
    radius: 234,
    radiusbtn: 234,
    swaps: [],
    isLoadingSwaps: false,
    loadSwapsError: null,
    maxDistance: 25,
    excludeUnlocatedUsers: true,
  }),

  mounted() {
    this.loadMoreSwaps();
  },

  methods: {
    async loadMoreSwaps() {
      if (this.isLoadingSwaps === true)
        return;

      try {
        this.isLoadingSwaps = true;
        this.swaps = await getSwapOffers("qatar2022", this.maxDistance, this.excludeUnlocatedUsers);
        this.loadSwapsError = null;
      } catch(e) {
        console.log('No swaps? 💀', e);
        this.loadSwapsError = "¡Ups! No pudimos cargarte unos swaps 💀... ¡Macri de mierda!";
      } finally {
        this.isLoadingSwaps = false;
      }
    },
  },
}
</script>
