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
                    <v-icon rightdark>
                        logout
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-app id="inspire" class="transparent" style="overflow-y: scroll;">
            <div class="container">
                <v-row class="pt-2 pl-7 pr-7">
                    <v-card class="d-flex mx-auto" width="100%" tile>
                        <v-img class="white--text align-center" :aspect-ratio="5" src="../assets/banner.webp"
                            gradient="to top right, rgba(178,216,255,0.3), rgba(178,216,255,0.6)">
                            <v-card-title class="justify-center text-uppercase" style="text-shadow: 0px 2px 16px #000000">
                                <h1>Explorar swaps</h1>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-row>
                <div class="row pl-7 pr-7">
                    <div class="col-md-4 text--white pa-5" style="background-color: white;" :key="product.id" v-for="product in products">
                        <v-card class="card card-product" elevation="5">
                            <div class="img-wrap">
                                <v-img :src=product.img :alt="product.description"></v-img>
                            </div>
                            <figcaption class="info-wrap">
                                <div class="text-center ma-2">
                                    <h3 class="title"> {{product.name}} </h3>
                                    <v-rating :value="product.rating" half-increments color="orange"
                                        background-color="orange" size="20" dense></v-rating>
                                </div>
                            </figcaption>
                            <figcaption class="info-wrap">
                                <p class="desc"> {{product.description}} </p>
                                <div class="rating-wrap">
                                    <div class="label-rating">13 Calificaciones</div>
                                    <div class="label-rating">50 Swaps </div>
                                </div>
                                <div class="rating-wrap">
                                    <div class="label-rating">{{product.distance}} km</div>
                                </div>
                            </figcaption>
                            <div class="text-center pa-7">
                                <router-link to="/trading" style="text-decoration:none">
                                    <v-btn rounded color="rgb(62,77,124)"
                                        class="mr-0 mr-md-8 mb-5 mb-md-0 btn-custom-md white--text">
                                        Enviar oferta
                                    </v-btn>
                                </router-link>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </v-app>
    </v-img>
</template>

<style scoped>
.card-product .img-wrap {
    border-radius: 4px 4px 0 0;
    border-color: black;
    position: relative;
    overflow: hidden;
    height: 220px;
    text-align: center;
}

.card-product .img-wrap img {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    object-fit: cover;
}

.card-product .info-wrap {
    overflow: hidden;
    padding: 15px;
    border-top: 1px solid #eee;
}

.card-product .bottom-wrap {
    padding: 15px;
    border-top: 1px solid #eee;
}

.label-rating {
    margin-right: 10px;
    color: #333;
    display: inline-block;
    vertical-align: middle;
}

.card-product .price-old {
    color: #999;
}

</style>

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
        {title: 'Inventario', path:'/collection'},
        {title: auth.currentUser.email, path: '/profile'},
    ],
    products: [
      {
        distance: '0,7',
        name: 'Nestor',
        description: '7 figuritas',
        id: '1',
        img: require("../assets/persona1.jpeg"),
        rating: '5'
      },
      {
        distance: '0,2',
        name: 'Cristian',
        description: '2 figuritas',
        id: '2',
        img: require("../assets/persona2.jpg"),
        rating: '2'
      },
      {
        distance: '0,7',
        name: 'Miguel',
        description: '7 figuritas',
        id: '3',
        img: require("../assets/persona3.jpg"),
        rating: '3.5'
      },
      {
        distance: '6',
        name: 'Jony',
        description: '10 figuritas',
        id: '4',
        img: require("../assets/persona4.jpg"),
        rating: '5'
      },
      {
        distance: '100',
        name: 'Esequiel',
        description: '200 figuritas',
        id: '5',
        img: require("../assets/persona5.webp"),
        rating: '1.5'
      },
      {
        distance: '250',
        name: 'Ricardo',
        description: '2 figuritas',
        id: '6  ',
        img: require("../assets/persona6.webp"),
        rating: '0.5'
      }]
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