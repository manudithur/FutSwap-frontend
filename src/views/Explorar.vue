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
                          <v-slider class="align-center" v-model="maxDistance" :max="50" :min="1" thumb-label="always"
                                    thumb-color="blue" dense color="var(--gold)" track-color="var(--lightblue)"/>
                        </v-col>
                      </v-list-item-action>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>

                    <v-checkbox v-model="includeUnlocatedUsers" label="Incluir usuarios sin ubicación"/>
                  </v-list-item>
                </v-list>

                <v-card-actions class="justify-center">
                  <v-btn color="var(--gold)" text v-on:click="onReloadRequested">Aplicar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;">
        <v-row v-if="!isLoadingSwaps" class="pa-4">
          <template v-if="swaps.length == 0">
            <div v-if="!loadSwapsError" style="display: flex; flex-direction: column" class="flex justify-center align-center pb-4">
              <span>No pudimos encontrar ningún swap para vos :/</span>
              <span>Y si probas con otros filtros? 👉👈🥺</span>
            </div>
          </template>
          <swap-offer-view v-else v-for="(swap, k) in swaps" :key="k" :swap="swap" @swap-clicked="onSwapClicked"/>
        </v-row>
        <v-row width="100%" class="flex justify-center align-center py-4">
          <v-progress-circular v-if="isLoadingSwaps" :indeterminate="true"/>
          <h3 v-if="loadSwapsError">{{ loadSwapsError }}</h3>
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
    swaps: [],
    isLoadingSwaps: false,
    loadSwapsError: null,
    maxDistance: 25,
    includeUnlocatedUsers: false,
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
        this.swaps = await getSwapOffers("qatar2022", this.maxDistance, !this.includeUnlocatedUsers);
        this.loadSwapsError = null;
      } catch (e) {
        console.log('No swaps? 💀', e);
        this.loadSwapsError = "¡Ups! No pudimos cargarte swaps";
      } finally {
        this.isLoadingSwaps = false;
      }
    },

    onReloadRequested() {
      this.loadMoreSwaps();
    },

    onSwapClicked(swap) {
      this.$store.commit('explore/setExploreSwap', swap);
      this.$router.push('/trading')
    }
  },
}
</script>
