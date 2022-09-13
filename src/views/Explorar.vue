<template>
    <v-img src="../assets/fondo.png">
        <v-app-bar app height="85%">
            <v-toolbar-title>
            <router-link to="/landing" style="text-decoration: none;">
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
            <v-icon
                dark
            >
                {{item.logo}}
            </v-icon>
            </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-app id="inspire" class="transparent" style="overflow-y: scroll;">
            <div class="container">
                <div class="row pa-5">
                    <div class="col-md-4 grey lighten-5 text--white pa-3" :key="product.id" v-for="product in products">
                        <v-card class="card card-product" outlined>
                            <div class="img-wrap"><v-img src="../assets/persona.jpg" :alt="product.description"></v-img></div>
                            <figcaption class="info-wrap">
                                <div class="text-center ma-2">
                                    <h4 class="title"> {{product.name}} </h4>
                                    <v-rating :value="product.rating" half-increments color="orange" background-color="orange" size="20" dense></v-rating>
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
                            <div class="text-center pa-3">
                                <v-btn
                                    rounded
                                    outlined
                                    color="blue darken-4"
                                    class="mr-0 mr-md-8 mb-5 mb-md-0 btn-custom-md white--text"
                                    nuxt
                                    target="_blank"
                                >
                                    Enviar oferta
                                </v-btn>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </v-app>
    </v-img>
  </template>

  <style scoped>
    .card-product{
        border-radius: 10px;
        border-color: #333;
    }
    .card-product .img-wrap {
        border-radius: 3px 3px 0 0;
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
    
    .label-rating { margin-right:10px;
        color: #333;
        display: inline-block;
        vertical-align: middle;
    }
    
    .card-product .price-old {
        color: #999;
    }

    html {
      overflow: visible;
      -ms-overflow-style: none;
    }
</style>

<script>
    export default {
        data: () => ({
        step: 1,
        appTitle: 'FutSwap',
            menuItems: [
                {title: 'Explorar', path: '/explorar'},
                {title: 'Perfil (15 FutCoins)', path: ''}, 
        ],
        products: [
                {distance:'0,7', name:'Nestor', description: '7 figuritas', id: 'test', product_img: '../assets/persona.jpg', rating: '5'},
                {distance:'0,7', name:'Nestor', description: '7 figuritas', id: 'test', product_img: '../assets/persona.jpg', rating: '2'},
                {distance:'0,7', name:'Nestor', description: '7 figuritas', id: 'test', product_img: '../assets/persona.jpg', rating: '5'},
                {distance:'0,7', name:'Nestor', description: '7 figuritas', id: 'test', product_img: '../assets/persona.jpg', rating: '5'},
                {distance:'0,7', name:'Nestor', description: '7 figuritas', id: 'test', product_img: '../assets/persona.jpg', rating: '5'},
                {distance:'0,7', name:'Nestor', description: '7 figuritas', id: 'test', product_img: '../assets/persona.jpg', rating: '5'}]
        }),
        props: {
        source: String
        },
    };
</script>