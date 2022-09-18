<template>
  <v-img src="../assets/fondo.png">
    <v-app-bar app height="85%">
      <v-toolbar-title>
        <router-link to="/landing">
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
    <v-app id="inspire" class="transparent">
    </v-app>
  </v-img>
</template>
  
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