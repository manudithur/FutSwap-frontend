<template>
  <v-app style="overflow:auto">
    <v-app-bar app height="72px" color="white" elevate-on-scroll>
      <v-toolbar-title>
          <router-link to="/explorar" style="text-decoration: none;">
              <v-img lazy-src="" max-height="56" max-width="108" src="../assets/FutSwap.png">
              </v-img>
          </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path" text color="#3E4D7C">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main class="pt-0">
      <section>
        <v-img src="../assets/fondo.png" height="100vh" style="margin-top: -72px;">
          <v-container fluid>
            <v-col class="col-md-8 text-center" style="margin-top: 20vh;">
              <v-img class="mx-auto" max-height="325" max-width="625" src="../assets/FutSwap.png"></v-img>
              <v-row class="mt-4 justify-center">
                <v-btn class="mx-3" to="/" x-large rounded dark color="#3E4D7C">
                  Empezar
                </v-btn>
                <v-btn class="mx-3" x-large rounded outlined color="#3E4D7C" @click="info">
                  Saber más
                </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-img>
      </section>
      <section class="pa-12" style="background-color: #f7fbff;">
        <v-container fluid class="my-8 px-8">
          <v-row class="align-center">
            <v-col class="col-md-7 text-left">
              <h1 class="text-h4 font-weight-black" style="color: var(--darkblue); font-size: 35px">¿Qué es FutSwap?</h1>
              <p class="text-body-1 mt-8" style="color: #181e31; font-size: 30px;">FutSwap es una plataforma que te permite intercambiar y vender figuritas con gente cercana a vos. Maneja tu inventario con facilidad, basta del papelito para ver cuales tenes y cuales no!</p>
            </v-col>
            <v-col class="col-md-5 text-center">
              <v-card style="border-radius: 0.5rem;" elevation="4">
                <v-img src="../assets/VideoPlayer.png"></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <div style="background-color: #f7fbff;">
        <v-divider class="mx-16" color="#3E4D7C" style="opacity: 0.05;"></v-divider>
      </div>
      <section class="pa-12" style="background-color: #zzzB2D8FF;">
        <v-container fluid class="my-8 px-8">
          <v-row class="align-center">
            <v-col class="col-12 text-center">
              <h1 class="pb-8 text-h4 font-weight-black" style="color: var(--darkblue); font-size: 35px">Funciones</h1>
            </v-col>
            <v-col v-for="(feature, i) in features" :key="i" class="col-lg-4 col-md-6 col-sm-12">
              <v-card class="pa-8 text-center grow" height="fixed" elevation="4">
                <v-icon class="pb-4" size="64" color="#E6BF3F">
                  {{feature.icon}}
                </v-icon>
                <h1 class="pb-4 text-h5 font-weight-bold" style="color: #3E4D7C; font-size: 30px;">{{ feature.title }}</h1>
                <p class="text-body-2 text--secundary" style="color: #666;">{{ feature.text }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<style>
:root {
  --darkblue: #3E4D7C;
  --indigo: #5779B2;
  --lightblue: #B2D8FF;
  --gold: #E6BF3F;
}

.dark-blue {color: var(--darkblue);}

.grow {
    transition: all .2s ease-in-out;
}

.grow:hover {
    transform: scale(1.005);
}

</style>

<script>
export default {
  data: () => ({
    menuItems: [
      {title: 'Ingresar / Registrame', path: '/'},
    ],
    features: [
        {
          icon: "mdi-book-open-page-variant-outline",
          title: "Administra",
          text: "Maneja facilmente que figuritas tenes y cuales te faltan. Ya no uses mas el papelito!  ",
        },
        {
          icon: "mdi-swap-horizontal-variant",
          title: "Swapea",
          text: "Nosotros te ayudamos a encontrar gente cerca tuyo para intercambiar. Negocia con la seguridad de nuestra plataforma.",
        },
        {
          icon: "mdi-piggy-bank-outline",
          title: "Ahorra",
          text: "Intercambiando lo maximo posible podes llegar a ahorrar un 85% del costo total de completar el album.",
        },
      ],
  }),
  props: {
    source: String
  },
  methods: {
    info () {
      window.scroll({
        top: 90.5*window.innerHeight/100,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>
