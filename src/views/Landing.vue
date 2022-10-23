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
              <h1 class="text-h4 font-weight-black" style="color: var(--darkblue);">¿Qué es FutSwap?</h1>
              <p class="text-body-1 mt-8" style="color: #181e31;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vivamus fermentum at enim eget lobortis. Integer ante nulla, lacinia vitae mi eu, hendrerit laoreet mauris.
                Aliquam ullamcorper nibh arcu, eu sagittis tellus laoreet vitae.</p>
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
      <section class="pa-12" style="background-color: #f7fbff;">
        <v-container fluid class="my-8 px-8">
          <v-row class="align-center">
            <v-col class="col-12 text-center">
              <h1 class="pb-8 text-h4 font-weight-black" style="color: var(--darkblue);">Funciones</h1>
            </v-col>
            <v-col v-for="(feature, i) in features" :key="i" class="col-lg-4 col-md-6 col-sm-12">
              <v-card class="pa-8 text-center grow" height="250" elevation="4">
                <v-icon class="pb-4" size="64" color="var(--gold)">
                  {{feature.icon}}
                </v-icon>
                <h1 class="pb-4 text-h5 font-weight-bold" style="color: #333;">{{ feature.title }}</h1>
                <p class="text-body-2 text--secundary" style="color: #666;">{{ feature.text }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <!--
            <v-col cols="5" class="align-center justify-center mt-10 pt-10">
              <v-card class="pa-10 mt-12 " style="background-color: rgb(62,77,124)">
                <div class="text-md-left">
                  <h1 class="banner-title font-weight-bold white--text">
                    ¡Usa FutSwap y completa tu album!
                  </h1>
                  <h3 class="banner-subtitle white--text font-weight-regular py-3">
                    ¿Sabias que intercambiando la maxima cantidad de figuritas podes ahorrar hasta un 85% de dinero en
                    llenar el album?
                  </h3>
                  <h3 class="banner-subtitle white--text font-weight-regular py-3">
                    Te ayudamos a encontrar gente con la cual intercambiar o vender figuritas cerca de tu ubicacion.
                    !Swappea o vende, vos elegis!
                  </h3>
                </div>
              </v-card>
            </v-col>
            -->
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
