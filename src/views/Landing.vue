<template>
    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="100%">
      <v-app-bar app>
        <v-toolbar-title>
          <router-link to="/landing">
          <v-img
            lazy-src=""
            max-height="100"
            max-width="130"
            src="../assets/FutSwap.png">
        </v-img></router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          {{ item.title }}
        </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    <v-app id="inspire" class="transparent">
        <v-container>
          <v-row justify="center">
          <v-col cols="12" md="7" lg="6" class="d-flex align-center">
            <div class="text-center text-md-left">
              <h1 class="banner-title font-weight-bold white--text">
                ¡Usa FutSwap y completa tu album!
              </h1>
              <h4 class="banner-subtitle white--text font-weight-regular py-3">
                ¿Sabias que intercambiando la maxima cantidad de figuritas podes ahorrar hasta un 85% de dinero en llenar el album?
              </h4>
              <h4 class="banner-subtitle white--text font-weight-regular py-3">
                Te ayudamos a encontrar gente con la cual intercambiar o vender figuritas cerca de tu ubicacion. !Swappea o vende, vos elegis!
              </h4>
              <div class="mt-16 pt-2">
                <v-btn
                  rounded
                  color="error"
                  class="mr-0 mr-md-8 mb-5 mb-md-0 btn-custom-md"
                  nuxt
                  large
                  target="_blank"
                  elevation="0"
                >
                  Ingresar/Registrar
                </v-btn>
                <v-btn
                  nuxt
                  large
                  rounded
                  to="/about"
                  outlined
                  color="white"
                  elevation="0"
                >
                  Conocer Mas
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="6" class="d-flex align-center">
              <v-img
                :src="require('../assets/press.gif')"
                alt="banner"
                contain
                height="50%"
              />
          </v-col>
        </v-row>
        </v-container>
    </v-app>
    </v-parallax>
  </template>
  
  <script>
  export default {
    data: () => ({
      step: 1,
      appTitle: 'FutSwap',
        sidebar: false,
        menuItems: [
            {title: '¿Que es FutSwap?', path: '/about'},
            { title: 'Ingresar / Registrame', path: '/'},   
       ]
    }),
    props: {
      source: String
    },
  };
  
  </script>