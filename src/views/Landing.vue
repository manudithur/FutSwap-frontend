<template>
    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="100%">
      <v-app-bar app>
        <v-toolbar-title>
          <v-img
                lazy-src=""
                max-height="100"
                max-width="130"
                src="../assets/FutSwap.png"></v-img>
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
      <h1 class="white--text ">LANDING PAGE NOT DEVELOPED</h1>
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
            {title: '¿Que es FutSwap?', path: ''},
            { title: 'Ingresar / Registrame', path: '/'},   
       ]
    }),
    props: {
      source: String
    },
  };
  
  </script>