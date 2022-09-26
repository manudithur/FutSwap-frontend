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
                        <v-img class="white--text align-center" :aspect-ratio="5" src="../assets/field.jpg"
                            gradient="to top right, rgba(62,77,124,0.3), rgba(62,77,124,0.6)">
                            <v-card-title class="justify-center text-uppercase" style="text-shadow: 0px 2px 16px #000000">
                                <h1>Mi Inventario</h1>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-row>
                <v-container style="background-color: white">
                    <v-row class="pa-3">
                        <template v-for="n in teams">
                            <v-col :key="n" class="mt-2" cols="12">
                                <h2 class="text-uppercase" style="color:#3E4D7C">{{ n.name }}</h2>
                            </v-col>

                            <v-col v-for="j in n.players" :key="`${n}${j}`" cols="6" md="2">
                                <v-dialog v-model="dialog" width="600">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-card class="grow" :elevation="20" v-bind="attrs" v-on="on" outlined>
                                            <v-img :src="j.url" style="filter:grayscale(50%)"></v-img>
                                        </v-card>
                                    </template>
                                    <v-card class="overflow-hidden">
                                        <v-row>
                                            <v-col cols="5" class="pa-0">
                                                <v-img :src="j.url"></v-img>
                                            </v-col>
                                            <v-col cols="7" class="pr-6 d-flex flex-column">
                                                <h2 class="pt-4 text-center text-uppercase" style="color:#666666">Tus
                                                    Figuritas</h2>

                                                <!-- <button @click="{j.count}++">+</button> -->
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
                                </v-dialog>
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
                    { url: require("../assets/figuritas/arg01.jpg"), count: 0 },
                    { url: require("../assets/figuritas/arg02.jpg"), count: 0 },
                    { url: require("../assets/figuritas/arg03.jpg"), count: 0 },
                    { url: require("../assets/figuritas/arg04.jpg"), count: 0 },
                    { url: require("../assets/figuritas/arg05.jpg"), count: 0 },
                    { url: require("../assets/figuritas/arg06.jpg") },
                    { url: require("../assets/figuritas/arg07.jpg") },
                    { url: require("../assets/figuritas/arg08.jpg") },
                    { url: require("../assets/figuritas/arg09.jpg") },
                    { url: require("../assets/figuritas/arg10.jpg") },
                    { url: require("../assets/figuritas/arg11.jpg") },
                    { url: require("../assets/figuritas/arg12.jpg") },
                    { url: require("../assets/figuritas/arg13.jpg") },
                    { url: require("../assets/figuritas/arg14.jpg") },
                    { url: require("../assets/figuritas/arg15.jpg") },
                    { url: require("../assets/figuritas/arg16.jpg") },
                    { url: require("../assets/figuritas/arg17.jpg") },
                    { url: require("../assets/figuritas/arg18.jpg") },
                    { url: require("../assets/figuritas/arg19.jpg") },
                ]
            },
            {
                name: 'Netherlands', players: [
                    { url: require("../assets/figuritas/ned01.jpg") },
                    { url: require("../assets/figuritas/ned02.jpg") },
                    { url: require("../assets/figuritas/ned03.jpg") },
                    { url: require("../assets/figuritas/ned04.jpg") },
                    { url: require("../assets/figuritas/ned05.jpg") },
                    { url: require("../assets/figuritas/ned06.jpg") },
                    { url: require("../assets/figuritas/ned07.jpg") },
                    { url: require("../assets/figuritas/ned08.jpg") },
                    { url: require("../assets/figuritas/ned09.jpg") },
                    { url: require("../assets/figuritas/ned10.jpg") },
                    { url: require("../assets/figuritas/ned11.jpg") },
                    { url: require("../assets/figuritas/ned12.jpg") },
                    { url: require("../assets/figuritas/ned13.jpg") },
                    { url: require("../assets/figuritas/ned14.jpg") },
                    { url: require("../assets/figuritas/ned15.jpg") },
                    { url: require("../assets/figuritas/ned16.jpg") },
                    { url: require("../assets/figuritas/ned17.jpg") },
                    { url: require("../assets/figuritas/ned18.jpg") },
                    { url: require("../assets/figuritas/ned19.jpg") },
                ]
            },
            {
                name: 'Spain', players: [
                    { url: require("../assets/figuritas/esp01.jpg") },
                    { url: require("../assets/figuritas/esp02.jpg") },
                    { url: require("../assets/figuritas/esp03.jpg") },
                    { url: require("../assets/figuritas/esp04.jpg") },
                    { url: require("../assets/figuritas/esp05.jpg") },
                    { url: require("../assets/figuritas/esp06.jpg") },
                    { url: require("../assets/figuritas/esp07.jpg") },
                    { url: require("../assets/figuritas/esp08.jpg") },
                    { url: require("../assets/figuritas/esp09.jpg") },
                    { url: require("../assets/figuritas/esp10.jpg") },
                    { url: require("../assets/figuritas/esp11.jpg") },
                    { url: require("../assets/figuritas/esp12.jpg") },
                    { url: require("../assets/figuritas/esp13.jpg") },
                    { url: require("../assets/figuritas/esp14.jpg") },
                    { url: require("../assets/figuritas/esp15.jpg") },
                    { url: require("../assets/figuritas/esp16.jpg") },
                    { url: require("../assets/figuritas/esp17.jpg") },
                    { url: require("../assets/figuritas/esp18.jpg") },
                    { url: require("../assets/figuritas/esp19.jpg") },
                ]
            },
            {
                name: 'Portugal', players: [
                    { url: require("../assets/figuritas/por01.jpg") },
                    { url: require("../assets/figuritas/por02.jpg") },
                    { url: require("../assets/figuritas/por03.jpg") },
                    { url: require("../assets/figuritas/por04.jpg") },
                    { url: require("../assets/figuritas/por05.jpg") },
                    { url: require("../assets/figuritas/por06.jpg") },
                    { url: require("../assets/figuritas/por07.jpg") },
                    { url: require("../assets/figuritas/por08.jpg") },
                    { url: require("../assets/figuritas/por09.jpg") },
                    { url: require("../assets/figuritas/por10.jpg") },
                    { url: require("../assets/figuritas/por11.jpg") },
                    { url: require("../assets/figuritas/por12.jpg") },
                    { url: require("../assets/figuritas/por13.jpg") },
                    { url: require("../assets/figuritas/por14.jpg") },
                    { url: require("../assets/figuritas/por15.jpg") },
                    { url: require("../assets/figuritas/por16.jpg") },
                    { url: require("../assets/figuritas/por17.jpg") },
                    { url: require("../assets/figuritas/por18.jpg") },
                    { url: require("../assets/figuritas/por19.jpg") },
                ]
            },
        ],
    }),
    props: {
        url: String
    },
};
</script>