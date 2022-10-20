<template>
  <div>
    <v-app id="inspire" class="transparent">
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
    <v-main class="content">
      <v-container class=" justify-center">
        <v-row class="justify-center">
          <v-col cols="6" class="align-center mt-10 pt-10">
            <v-card class="pa-3 " style="background-color: rgb(62,77,124)">
              <v-img src="../assets/VideoPlayer.png"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid id="features" class="mt-2">
        <v-row justify="center">
          <v-col cols="10">
            <v-row  justify="space-around">
              <v-col
                cols="12"
                sm="4"
                class="text-center"
                v-for="(feature, i) in features"
                :key="i"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card class="pa-3" style="background-color: rgb(62,77,124);">
                    <v-card
                      class="card"
                      outlined
                      height="250"
                      :elevation="hover ? 10 : 4"
                      :class="{ up: hover }"
                    >
                      <v-icon class="pa-5" style="color: rgb(230,191,63)" size="80">
                      {{feature.icon}}
                      </v-icon>
                      <h1 class="font-weight-bold" style="color:rgb(62,77,124)">{{ feature.title }}</h1>
                      <h4 class="font-weight-regular pa-3 subtitle-1">
                        {{ feature.text }}
                      </h4>
                    </v-card>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    </v-app>
  </div>
</template>
  
<script>
export default {
  data: () => ({
    menuItems: [
      {title: 'Ingresar / Registrame', path: '/'},
    ],
  }),
  props: {
    source: String
  },
};
</script>