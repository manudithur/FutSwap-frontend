<template>
  <v-img src="../assets/fondo.png">
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
        <div class="contain">
          <v-row>
            <v-col cols="5">  
              <v-card>
                <v-cardtile class="text--black"> His Available Trades </v-cardtile>
                <div>
                  <v-list shaped>
                    <v-list-item-group multiple>
                      <template v-for="(tradeitem, i) in tradeitems">
                        <v-divider
                          v-if="!tradeitem.name"
                          :key="`divider-${i}`"
                        ></v-divider>

                        <v-list-item
                          v-else
                          :key="`tradeitem-${i}`"
                          :value="tradeitem.name"
                          active-class="deep-blue--text text--accent-4">

                          <template v-slot:default="{ active }">
                            <v-list-item-content>
                              <v-list-item-title v-text="tradeitem.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-checkbox
                                :input-value="active"
                                color="deep-blue accent-4"
                              ></v-checkbox>
                            </v-list-item-action>
                          </template>
                        </v-list-item>
                      </template>
                    </v-list-item-group> 
                  </v-list>
                </div>
              </v-card>
              <v-card>
                <v-cardtile class="text--black"> Your Available Trades </v-cardtile>
                <div>
                  <v-list shaped>
                    <v-list-item-group multiple>
                      <template v-for="(invitem, i) in yourinventory">
                        <v-divider
                          v-if="!invitem.name"
                          :key="`divider-${i}`"
                        ></v-divider>

                        <v-list-item
                          v-else
                          :key="`invitem-${i}`"
                          :value="invitem.name"
                          active-class="deep-blue--text text--accent-4">

                          <template v-slot:default="{ active }">
                            <v-list-item-content>
                              <v-list-item-title v-text="invitem.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-checkbox
                                :input-value="active"
                                color="deep-blue accent-4"
                              ></v-checkbox>
                            </v-list-item-action>
                          </template>
                        </v-list-item>
                      </template>
                    </v-list-item-group> 
                  </v-list>
                </div>
              </v-card>
              <div>
                <v-button class="blue">
                  SendTrade
                </v-button>
              </div>
            </v-col>
          </v-row>
        </div>
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
      {title: 'Explorar', path: '/explorar'},
      {title: auth.currentUser.email, path: '/profile'},
    ],
    tradeitems: [
      {
        name: 'sen 5',
        quantity: '2'
      },
      {
        name: 'arg 10',
        quantity: '1',
      },
      {
        name: 'fra 6',
        quantity: '2',
      },
      {
        name: 'jap 3',
        quantity: '3',
      }
    ],
    yourinventory: [
      {
        name: 'chi 5',
        quantity: '2'
      },
      {
        name: 'arg 1',
        quantity: '1',
      },
      {
        name: 'ger 6',
        quantity: '1',
      },
      {
        name: 'chi 3',
        quantity: '3',
      }
    ]
    /*products: [
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: 'test',
        product_img: '../assets/persona.jpg',
        rating: '5'
      },
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: 'test',
        product_img: '../assets/persona.jpg',
        rating: '2'
      },
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: 'test',
        product_img: '../assets/persona.jpg',
        rating: '5'
      },
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: 'test',
        product_img: '../assets/persona.jpg',
        rating: '5'
      },
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: 'test',
        product_img: '../assets/persona.jpg',
        rating: '5'
      },
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: 'test',
        product_img: '../assets/persona.jpg',
        rating: '5'
      }]*/
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