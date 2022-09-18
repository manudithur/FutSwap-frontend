<template>
  <v-img src="../assets/fondo.png">
    <title>Test</title>
    <v-app-bar app height="85%">
      <v-toolbar-title>
        <router-link to="/landing" style="text-decoration: none;">
          <v-img lazy-src="" max-height="100" max-width="130" src="../assets/FutSwap.png">
          </v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-app id="inspire" class="transparent" style="overflow-y: scroll;">
      <v-container class="mt-12 pt-10">
        <v-row justify="center">
          <v-col cols="12" md="7" lg="6" class="d-flex align-center mt-10 pt-10">
            <v-card class="pa-10 mt-12 blue darken-4">
              <div class="text-center text-md-left">
                <h1 class="banner-title font-weight-bold white--text">
                  ¡Usa FutSwap y completa tu album!
                </h1>
                <h4 class="banner-subtitle white--text font-weight-regular py-3">
                  ¿Sabias que intercambiando la maxima cantidad de figuritas podes ahorrar hasta un 85% de dinero en
                  llenar el album?
                </h4>
                <h4 class="banner-subtitle white--text font-weight-regular py-3">
                  Te ayudamos a encontrar gente con la cual intercambiar o vender figuritas cerca de tu ubicacion.
                  !Swappea o vende, vos elegis!
                </h4>
                <div class="mt-16 pt-2">
                  <router-link to="/" style="text-decoration: none;">
                    <v-btn rounded color="error" class="mr-0 mr-md-8 mb-5 mb-md-0 btn-custom-md" nuxt large
                      target="_blank" elevation="0">
                      Ingresar/Registrar
                    </v-btn>
                  </router-link>
                  <router-link to="/about" style="text-decoration: none;">
                    <v-btn nuxt large rounded to="/about" outlined color="white" elevation="0">
                      Conocer Mas
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" lg="6" class="d-flex align-center">
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </v-img>
</template>

<style>
html {
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
  
<script>
export default {
  data: () => ({
    step: 1,
    appTitle: 'FutSwap',
    sidebar: false,
    menuItems: [
      { title: '¿Que es FutSwap?', path: '' },
      { title: 'Ingresar / Registrame', path: '/' },
    ]
  }),
  props: {
    source: String
  },
};

</script>