<template>
  <v-col class="col-lg-3 col-md-3 col-sm-6" :key="swap.distance" v-if="swap.distance < radiusbtn">
    <v-card class="grow" elevation="8">
      <v-img class="profile-pic" :src=swap.img :alt="swap.parati"></v-img>
      <figcaption class="text-center pa-4">
        <h1 class="text-h5 pb-1">{{ swap.name }}</h1>
        <span class="text-caption faded pb-1"><v-icon class="faded"
                                                      size="20">mdi-map-marker-outline</v-icon> a {{ swap.distance }} km de distancia</span>
        <v-divider class="ma-2"></v-divider>
        <v-rating :value="swap.rating" half-increments color="var(--gold)" background-color="var(--gold)" size="20"
                  dense readonly></v-rating>
        <span class="text-caption faded">{{ swap.past }} Swaps ● {{ swap.rate }} Calificaciones</span>
        <v-divider class="ma-2 pb-1"></v-divider>
        <v-row class="px-4 pb-1">
          <v-col class="col-md-6">
            <h1 class="text-h5 font-weight-black" style="color: var(--darkblue);">{{ swap.parati }}
              <v-icon class="pb-1" style="color: var(--darkblue);">mdi-cards</v-icon>
            </h1>
            <h1 class="text-subtitle-2 font-weight-bold" style="color: var(--indigo);">Para ti</h1>
          </v-col>
          <v-col class="col-md-6">
            <h1 class="text-h5 font-weight-black" style="color: var(--darkblue);">{{ swap.busc }}
              <v-icon class="pb-1" style="color: var(--darkblue);">mdi-cards</v-icon>
            </h1>
            <h1 class="text-subtitle-2 font-weight-bold" style="color: var(--indigo);">Buscando</h1>
          </v-col>
        </v-row>
      </figcaption>
      <div class="justify-center text-center pb-6">
        <router-link to="/trading" style="text-decoration:none">
          <v-btn rounded color="#3E4D7C" class="mr-0 btn-custom-md white--text">
            Swap
          </v-btn>
        </router-link>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "SwapOfferView",
  props: ['swap'],

  data: () => ({
    radius: 234,
    radiusbtn: 234,
  }),

  mounted() {
    console.log('my swap is ', this.swap)
  }
}
</script>


<style scoped>
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