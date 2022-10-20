<template>
    <v-app>
        <NavBar/>
        <v-main class="bg">
            <v-container class="mb-8">
                <v-row class="ma-0 align-center">
                    <v-col class="col-lg-11 col-sm-12 pa-0">
                        <h1 class="text-h3 text-uppercase white--text font-weight-black"
                        style="text-shadow: 0px 1px 4px #3E4D7C">Explorar swaps</h1>
                    </v-col>
                    <v-col class="col-lg-1 col-sm-2 pa-0 text-center">
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-width="200"
                            offset-y left
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-large icon style="color: white" @click="about" v-bind="attrs" v-on="on">
                                    <v-icon size="38" style="text-shadow: 0px 1px 4px #3E4D7C">mdi-filter-cog-outline</v-icon>
                                </v-btn>
                            </template>
                            
                            <v-card>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Distancia de búsqueda</v-list-item-subtitle>
                                            <v-list-item-action class="ma-0">
                                                <v-col class="col-md-12">
                                                    <v-slider class="align-center" v-model="radius" :max="250" dense color="var(--gold)" track-color="var(--lightblue)">
                                                        <template v-slot:append>
                                                            <v-text-field v-model="radius" color="var(--gold)" flat dense rounded outlined hide-details hide-spin-buttons class="ma-0 pa-0" type="number" suffix="km" style="width: 100px; max-height: 100%;"></v-text-field>
                                                        </template>
                                                    </v-slider>
                                                </v-col>
                                            </v-list-item-action>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>

                                <v-card-actions class="justify-center">
                                    <v-btn color="var(--darkblue)" text @click="menu = false">Cancelar</v-btn>
                                    <v-btn color="var(--gold)" text @click="menu = false" v-on:click="radiusbtn = radius">Aplicar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;">
                <!-- <v-row>
                    <v-card width="100%">
                        <v-img 
                        class="align-center" 
                        style="border-radius: 4px 4px 0 0;" 
                        :aspect-ratio="5" 
                        src="../assets/banner.webp"
                        gradient="to top right, rgba(62,77,124,0.3), rgba(62,77,124,0.6)">
                            <v-card-title class="justify-center text-uppercase">
                                <h1 class="h1">Explorar swaps</h1>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-row> -->
                <v-row class="pa-4">
                    <template v-for="swap in swaps">
                        <v-col class="col-lg-3 col-md-3 col-sm-6" :key="swap.distance" v-if="swap.distance < radiusbtn">
                            <v-card class="grow" elevation="8">
                                <v-img class="profile-pic" :src=swap.img :alt="swap.parati"></v-img>
                                <figcaption class="text-center pa-4">
                                    <h1 class="text-h5 pb-1">{{swap.name}}</h1>
                                    <span class="text-caption faded pb-1"><v-icon class="faded" size="20">mdi-map-marker-outline</v-icon> a {{swap.distance}} km de distancia</span>
                                    <v-divider class="ma-2"></v-divider>
                                    <v-rating :value="swap.rating" half-increments color="var(--gold)" background-color="var(--gold)" size="20" dense readonly></v-rating>
                                    <span class="text-caption faded">{{swap.past}} Swaps ● {{swap.rate}} Calificaciones</span>
                                    <v-divider class="ma-2 pb-1"></v-divider>
                                    <v-row class="px-4 pb-1">
                                        <v-col class="col-md-6">
                                            <h1 class="text-h5 font-weight-black" style="color: var(--darkblue);">{{swap.parati}}<v-icon class="pb-1" style="color: var(--darkblue);">mdi-cards</v-icon></h1>
                                            <h1 class="text-subtitle-2 font-weight-bold" style="color: var(--darkblue);">Para ti</h1>
                                        </v-col>
                                        <v-col class="col-md-6">
                                            <h1 class="text-h5 font-weight-black" style="color: var(--darkblue);">{{swap.busc}}<v-icon class="pb-1" style="color: var(--darkblue);">mdi-cards</v-icon></h1>
                                            <h1 class="text-subtitle-2 font-weight-bold" style="color: var(--darkblue);">Buscando</h1>
                                        </v-col>
                                    </v-row>
                                </figcaption>
                                <!-- <figcaption class="info-wrap">
                                    <p class="desc"> {{swap.parati}} </p>
                                    <div class="rating-wrap">
                                        <div class="label-rating">13 Calificaciones</div>
                                        <div class="label-rating">50 Swaps </div>
                                    </div>
                                    <div class="rating-wrap">
                                        <div class="label-rating">{{swap.distance}} km</div>
                                    </div>
                                </figcaption> -->
                                <div class="justify-center text-center pb-6">
                                    <router-link to="/trading" style="text-decoration:none">
                                        <v-btn rounded color="#3E4D7C"
                                            class="mr-0 btn-custom-md white--text">
                                            Swap
                                        </v-btn>
                                    </router-link>
                                </div>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
:root {
  --darkblue: #3E4D7C;
  --indigo: #5779B2;
  --lightblue: #B2D8FF;
  --gold: #E6BF3F;
}

.bg {
    background-image: url("../assets/fondo.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

.profile-pic {
    height: 180px;
    border-radius: 4px 4px 0 0;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    object-fit: cover;
}

.faded {
    color:#999;
}

.grow {
    transition: all .2s ease-in-out;
}

.grow:hover {
    transform: scale(1.05);
}

</style>

<script>
import { getAuth } from 'firebase/auth'
import router from '../router/index';
import { signOut } from "firebase/auth";
import NavBar from '../components/NavBar.vue';
const auth = getAuth();

export default {
    data: () => ({
        step: 1,
        appTitle: "FutSwap",
        radius: 234,
        radiusbtn: 234,
        menuItems: [
            { title: "Explorar", path: "/explorar" },
            { title: "Inventario", path: "/collection" },
            { title: "Swaps", path: "/swaps" },
            { title: auth.currentUser.email, path: "/profile" },
        ],
        swaps: [
            {
                distance: 0.7,
                name: "Nestor",
                parati: "7",
                busc: "5",
                past: "50",
                rate: "17",
                id: "1",
                img: require("../assets/persona1.jpeg"),
                rating: "5"
            },
            {
                distance: 0.2,
                name: "Cristian",
                parati: "2",
                busc: "5",
                past: "50",
                rate: "17",
                id: "2",
                img: require("../assets/persona2.jpg"),
                rating: "2"
            },
            {
                distance: 0.7,
                name: "Miguel",
                parati: "7",
                busc: "5",
                past: "50",
                rate: "17",
                id: "3",
                img: require("../assets/persona3.jpg"),
                rating: "3.5"
            },
            {
                distance: 6,
                name: "Jony",
                parati: "10",
                busc: "5",
                past: "50",
                rate: "17",
                id: "4",
                img: require("../assets/persona4.jpg"),
                rating: "5"
            },
            {
                distance: 67,
                name: "Esequiel",
                parati: "200",
                busc: "5",
                past: "50",
                rate: "17",
                id: "5",
                img: require("../assets/persona5.webp"),
                rating: "1.5"
            },
            {
                distance: 233,
                name: "Ricardo",
                parati: "2",
                busc: "5",
                past: "50",
                rate: "17",
                id: "6  ",
                img: require("../assets/persona6.webp"),
                rating: "0.5"
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
            await router.push("/landing");
        },
        methods: {
            logout: async function () {
                const auth = getAuth();
                await signOut(auth);
                await router.push("/landing");
            },
        },
        components: { NavBar }
    },
    components: { NavBar }
}
</script>