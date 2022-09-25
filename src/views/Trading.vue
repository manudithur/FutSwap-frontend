<template>
  <v-img src="../assets/fondo.png">
    <v-app-bar app height="85%">
      <v-toolbar-title>
        <router-link to="/explorar" style="text-decoration: none;">
          <v-img lazy-src="" max-height="100" max-width="130" src="../assets/FutSwap.png">
          </v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          {{ item.title }}
          <v-icon dark>
            {{item.logo}}
          </v-icon>
        </v-btn>
        <v-btn flat @click="logout">
          Cerrar Sesion
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-app id="TradingSpace" class="transparent" style="overflow-y:scroll;">
      <div class="container pt-10">
        <v-card>
          <v-row class="justify-center">
            <v-card-title class="text-center">
              <h1 class="text-center display-2 font-weight-bold blue--text text--darken-4 pt-5">REALIZAR OFERTA</h1>
            </v-card-title>
          </v-row>
          <v-row class="justify-center pt-8">
            <v-col cols="5">
              <v-card class="pt-5">
                <v-list>
                  <v-list-item-group multiple class="pa-5">
                    <template v-for="(tradeitem, i) in tradeitems" class="pa-5">
                      <v-divider v-if="!tradeitem.name" :key="`divider-${i}`"></v-divider>

                      <v-list-item v-else :key="`tradeitem-${i}`" :value="tradeitem.name"
                        active-class="deep-blue--text text--accent-4">

                        <template v-slot:default="{ active }">

                          <v-avatar size="70">
                            <v-img :src=tradeitem.img>
                            </v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title v-text="tradeitem.name"></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox :input-value="active" color="deep-blue accent-4"></v-checkbox>
                          </v-list-item-action>

                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="5">
              <v-card class="pt-5">
                <v-list>
                  <v-list-item-group multiple class="pa-5">
                    <template v-for="(myinv, i) in yourinventory" class="pa-5">
                      <v-divider v-if="!myinv.name" :key="`divider-${i}`"></v-divider>

                      <v-list-item v-else :key="`myinv-${i}`" :value="myinv.name"
                        active-class="deep-blue--text text--accent-4">

                        <template v-slot:default="{ active }">

                          <v-avatar size="70">
                            <v-img :src=myinv.img>
                            </v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title v-text="myinv.name"></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox :input-value="active" color="deep-blue accent-4"></v-checkbox>
                          </v-list-item-action>

                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-card-actions class="justify-center pa-8">
              <v-btn large   color="primary pa-5" @click="update">
                ENVIAR OFERTA
                <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </div>
      <v-container class="pt-8">

      </v-container>
    </v-app>
  </v-img>
</template>

<script>
import { getAuth } from 'firebase/auth'
import router from '../router/index';
import { signOut } from "firebase/auth";
const auth = getAuth();

export default {
  data: () => ({
    step: 1,
    appTitle: 'FutSwap',
    menuItems: [
      { title: 'Explorar', path: '/explorar' },
      { title: auth.currentUser.email, path: '/profile' },
    ],
    tradeitems: [
      {
        name: 'ARG 5',
        img: require("../assets/figus/arg05.jpg")
      },
      {
        name: 'ARG 10',
        img: require("../assets/figus/arg10.jpg")
      },
      {
        name: 'FRA 6',
        img: require("../assets/figus/fra06.jpg")
      },
      {
        name: 'JPN 3',
        img: require("../assets/figus/jpn03.jpg")
      }
    ],
    yourinventory: [
      {
        name: 'BEL 6',
        img: require("../assets/figus/bel06.jpg")
      },
      {
        name: 'ARG 1',
        img: require("../assets/figus/arg01.jpg")
      },
      {
        name: 'GER 6',
        img: require("../assets/figus/ger06.jpg")
      },
      {
        name: 'POR 3',
        img: require("../assets/figus/por03.jpg")
      }
    ]
  }),

  props: {
    source: String
  },

  methods: {
    logout: async function () {
      const auth = getAuth();
      await signOut(auth);
      await router.push('/landing');
    },
  }
};
</script>