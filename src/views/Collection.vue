<!-- COLORS
Light Blue: #B2D8FF
Indigo Blue: #5779B2
Dark Blue: #3E4D7C
Gold: #E6BF3F
Silver: #666666 -->

<template>
    <v-app id="inspire">
        <title>Test</title>
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
        <v-main class="bg">
            <v-container>
                <v-row class="pl-3 pr-3 pt-4">
                    <v-card class="d-flex mx-auto" width="100%" tile>
                        <v-img class="white--text align-center" :aspect-ratio="5" src="../assets/banner3.jpg"
                            gradient="to top right, rgba(62,77,124,0.3), rgba(62,77,124,0.6)">
                            <v-card-title class="justify-center text-uppercase" style="text-shadow: 0px 2px 16px #000000">
                                <h1>Mi Inventario</h1>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-row>
                <v-container style="background-color: white" class="justify-center">
                    <v-row class="justify-center pt-5">
                        <v-btn x-large style="color:white; background-color: rgb(62,77,124)" @click="about">Como funciona<v-icon right>mdi-comment-question-outline</v-icon></v-btn>
                    </v-row>
                    <v-row class="pa-3">
                        <template v-for="n in teams">
                            <v-col :key="n" class="mt-2" cols="12">
                                <h2 class="text-uppercase" style="color:#3E4D7C">{{ n.name }}</h2>
                            </v-col>

                            <v-col v-for="j in n.players" :key="`${n}${j}`" @click="increase(j)"  @contextmenu="decrease($event, j)" cols="6" md="2">
                                    <template>
                                        <v-card class="grow justify-center" :elevation="20" outlined v-if="j.status == -1">
                                            <v-img :src="j.url" style="filter: grayscale(100%)"></v-img>
                                        </v-card>
                                        <v-card class="grow" :elevation="20" outlined v-if="j.status == 0">
                                            <v-img :src="j.url"></v-img>
                                        </v-card>
                                        <v-card class="grow" :elevation="20" outlined v-if="j.status == 1">
                                            <v-img :src="j.url" style="filter:grayscale(100%) brightness(80%) sepia(300%) contrast(60%) hue-rotate(50deg) saturate(500%)"></v-img>
                                        </v-card>

                                    </template>
                                    <!--
                                    <v-card class="overflow-hidden">
                                        <v-row>
                                            <v-col cols="5" class="pa-0">
                                                <v-img :src="j.url"></v-img>
                                            </v-col>
                                            <v-col cols="7" class="pr-6 d-flex flex-column">
                                                <h2 class="pt-4 text-center text-uppercase" style="color:#666666">Tus
                                                    Figuritas</h2>

                                                <button @click="{j.count}++">+</button>
                                                <div class="text-center ma-auto" style="color:#333333; font-size: 8rem;">
                                                    {{j.count}}</div>

                                                <v-divider class="mt-auto"></v-divider>

                                                <v-card-actions class="pa-4 justify-center">
                                                    <v-btn class="ma-1" outlined rounded color="#3E4D7C" dark>Buy</v-btn>
                                                    <v-btn class="ma-1" outlined rounded color="#3E4D7C" dark>Swap</v-btn>
                                                    <v-btn class="ma-1" outlined rounded color="#3E4D7C" dark>Sell</v-btn>
                                                </v-card-actions>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    -->
                            </v-col>
                        </template>
                    </v-row>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
.bg {
    background-image: url("../assets/fondo.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

html {
    overflow: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

html::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.grow {
    transition: all .2s ease-in-out;
}

.grow:hover {
    transform: scale(1.025);
}
</style>
  
<script>
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
const auth = getAuth();
export default {
    data: () => ({
        step: 1,
        appTitle: 'FutSwap',
        sidebar: false,
        menuItems: [
            {title: 'Explorar', path: '/explorar'},
            {title: 'Inventario', path:'/collection'},
            {title: auth.currentUser.email, path: '/profile'},
        ],
        teams: [
            {
                name: 'Argentina', players: [
                    { url: require("../assets/figuritas/arg01.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg02.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg03.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg04.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg05.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg06.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg07.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg08.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg09.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg10.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg11.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg12.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg13.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg14.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg15.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg16.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg17.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg18.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg19.jpg"), status: -1},
                ]
            },
            {
                name: 'Netherlands', players: [
                    { url: require("../assets/figuritas/ned01.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned02.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned03.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned04.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned05.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned06.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned07.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned08.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned09.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned10.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned11.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned12.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned13.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned14.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned15.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned16.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned17.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned18.jpg"), status: -1},
                    { url: require("../assets/figuritas/ned19.jpg"), status: -1},
                ]},
            {
                name: 'Spain', players: [
                    { url: require("../assets/figuritas/esp01.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp02.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp03.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp04.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp05.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp06.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp07.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp08.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp09.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp10.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp11.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp12.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp13.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp14.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp15.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp16.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp17.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp18.jpg"), status: -1},
                    { url: require("../assets/figuritas/esp19.jpg"), status: -1},
                ]
            },
            {
                name: 'Portugal', players: [
                    { url: require("../assets/figuritas/por01.jpg"), status: -1},
                    { url: require("../assets/figuritas/por02.jpg"), status: -1},
                    { url: require("../assets/figuritas/por03.jpg"), status: -1},
                    { url: require("../assets/figuritas/por04.jpg"), status: -1},
                    { url: require("../assets/figuritas/por05.jpg"), status: -1},
                    { url: require("../assets/figuritas/por06.jpg"), status: -1},
                    { url: require("../assets/figuritas/por07.jpg"), status: -1},
                    { url: require("../assets/figuritas/por08.jpg"), status: -1},
                    { url: require("../assets/figuritas/por09.jpg"), status: -1},
                    { url: require("../assets/figuritas/por10.jpg"), status: -1},
                    { url: require("../assets/figuritas/por11.jpg"), status: -1},
                    { url: require("../assets/figuritas/por12.jpg"), status: -1},
                    { url: require("../assets/figuritas/por13.jpg"), status: -1},
                    { url: require("../assets/figuritas/por14.jpg"), status: -1},
                    { url: require("../assets/figuritas/por15.jpg"), status: -1},
                    { url: require("../assets/figuritas/por16.jpg"), status: -1},
                    { url: require("../assets/figuritas/por17.jpg"), status: -1},
                    { url: require("../assets/figuritas/por18.jpg"), status: -1},
                    { url: require("../assets/figuritas/por19.jpg"), status: -1},
                ]            
            },
        ],
    }),
    methods: {
        increase: function(j) {
            if(j.status != 1)
                j.status++;
        },
        decrease: function(e, j){
            if(j.status != -1)
                j.status--;
            e.preventDefault();
        },
        about: function(){
            Swal.fire({
                title: 'Con click izq y click derecho vas cambiando entre las posibles opciones',
                imageUrl: require("../assets/collectionUse.png"),
                imageAlt: 'Custom image',
                width: 900,
                confirmButtonColor: '#3e4d7c'
            })
        }
    },
    props: {
        url: String
    },
};
</script>