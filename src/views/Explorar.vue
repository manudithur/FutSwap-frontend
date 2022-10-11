<!-- COLORS
Light Blue: #B2D8FF
Indigo Blue: #5779B2
Dark Blue: #3E4D7C
Gold: #E6BF3F
Silver: #666666 -->

<template>
    <div class="bg">
        <NavBar/>
        <v-app id="inspire" class="transparent">
            <v-main class="py-4">
                <v-container class="elevation-1 pt-0" style="background-color: white; border-radius: 4px;">
                    <v-row>
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
                    </v-row>
                    <v-row class="pa-4">
                        <v-col class="col-lg-3 col-md-3 col-sm-6" :key="product.id" v-for="product in products">
                            <v-card class="grow" elevation="8">
                                <v-img class="profile-pic" :src=product.img :alt="product.parati"></v-img>
                                <figcaption class="text-center ma-2">
                                    <h4 class="h4">{{product.name}}</h4>
                                    <subtitle-1><v-icon style="font-size:1.4rem; color:#999;">mdi-map-marker-outline</v-icon> a {{product.distance}} km de distancia</subtitle-1>
                                    <v-divider class="ma-2"></v-divider>
                                    <v-rating :value="product.rating" half-increments color="#E6BF3F" background-color="#E6BF3F" size="20" dense readonly></v-rating>
                                    <subtitle-1>{{product.swaps}} Swaps ● {{product.rate}} Calificaciones</subtitle-1>
                                    <v-divider class="ma-2"></v-divider>
                                </figcaption>
                                <figcaption class="d-flex text-center ma-2">
                                    <div class="col-md-6 pa-2">
                                        <h2 class="h2">{{product.parati}}<v-icon class="pb-1 fig">mdi-cards</v-icon></h2>
                                        <h3 class="h3">Para ti</h3>
                                    </div>
                                    <div class="col-md-6 pa-2">
                                        <h2 class="h2">{{product.busc}}<v-icon class="pb-1 fig">mdi-cards</v-icon></h2>
                                        <h3 class="h3">Buscando</h3>
                                    </div>
                                </figcaption>
                                <!-- <figcaption class="info-wrap">
                                    <p class="desc"> {{product.parati}} </p>
                                    <div class="rating-wrap">
                                        <div class="label-rating">13 Calificaciones</div>
                                        <div class="label-rating">50 Swaps </div>
                                    </div>
                                    <div class="rating-wrap">
                                        <div class="label-rating">{{product.distance}} km</div>
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
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<style scoped>
.bg {
    background-image: url("../assets/fondo.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
.fig {
    font-size:1.6rem;
    color:#3E4D7C;
}
.profile-pic {
    height: 180px;
    border-radius: 4px 4px 0 0;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    object-fit: cover;
}

.h1 {
    color: white;
    text-shadow: 0px 2px 16px black
}

.h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #3E4D7C;
}

.h3 {
    font-size: 0.95rem;
    font-weight: 300;
    color: #000;
}

.h4 {
    font-size: 1.6rem;
    font-weight: 300;
}

subtitle-1 {
    font-size: 0.7rem;
    font-weight: 300;
    color:#999;
}

.grow {
    transition: all .2s ease-in-out;
}

.grow:hover {
    transform: scale(1.005);
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
        menuItems: [
            { title: "Explorar", path: "/explorar" },
            { title: "Inventario", path: "/collection" },
            { title: "Swaps", path: "/swaps" },
            { title: auth.currentUser.email, path: "/profile" },
        ],
        products: [
            {
                distance: "0,7",
                name: "Nestor",
                parati: "7",
                busc: "5",
                swaps: "50",
                rate: "17",
                id: "1",
                img: require("../assets/persona1.jpeg"),
                rating: "5"
            },
            {
                distance: "0,2",
                name: "Cristian",
                parati: "2",
                busc: "5",
                swaps: "50",
                rate: "17",
                id: "2",
                img: require("../assets/persona2.jpg"),
                rating: "2"
            },
            {
                distance: "0,7",
                name: "Miguel",
                parati: "7",
                busc: "5",
                swaps: "50",
                rate: "17",
                id: "3",
                img: require("../assets/persona3.jpg"),
                rating: "3.5"
            },
            {
                distance: "6",
                name: "Jony",
                parati: "10",
                busc: "5",
                swaps: "50",
                rate: "17",
                id: "4",
                img: require("../assets/persona4.jpg"),
                rating: "5"
            },
            {
                distance: "100",
                name: "Esequiel",
                parati: "200",
                busc: "5",
                swaps: "50",
                rate: "17",
                id: "5",
                img: require("../assets/persona5.webp"),
                rating: "1.5"
            },
            {
                distance: "250",
                name: "Ricardo",
                parati: "2",
                busc: "5",
                swaps: "50",
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