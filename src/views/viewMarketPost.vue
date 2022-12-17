<template>
    <v-app>
        <NavBar />
        <v-main class="content justify-center align-center pt-0 mt-0">
            <v-container class="align-center justify-center" v-if="(!isLoading)">
                <v-card>
                    <v-row no-gutters class="pa-0 elevation-4 justify-center">
                        <v-col cols="5" class="pa-2 justify-center align-center">
                            <v-card class="elevation-0 justify-center" style="border-radius: 4px;">
                                <v-img :src="item.img" max-width="500"></v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="7" class="pa-4">
                            <v-row no-gutters class="pa-4 pb-0 align-center">
                                <v-col class="col-lg-12 text-left">
                                    <h2 style="color: #999;">Figurita:</h2>
                                    <h2 class="text-uppercase font-weight-bold" style="color:#333">{{ item.figurita }}
                                    </h2>
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="pa-4 pb-0 align-center">
                                <v-col class="col-lg-12 text-left">
                                    <h2 style="color: #999;">Precio:</h2>
                                    <h2 class="font-weight-bold" style="color:#333"><v-icon class="pr-1 pb-1"
                                            style="color:var(--gold);" size="40">mdi-currency-usd</v-icon>{{ item.precio
                                            }} FTC</h2>
                                </v-col>
                            </v-row>
                            <v-divider class="mx-4 my-5"></v-divider>
                            <h3 class="px-4 pb-2" style="color:#BBB;">Información del vendedor</h3>
                            <v-row no-gutters class="align-center px-4 pb-4">
                                <v-col class="col-lg-2 pa-0 text-left">
                                    <v-avatar circle size="80">
                                        <v-img :src=item.seller />
                                    </v-avatar>
                                </v-col>
                                <v-col class="col-lg-6">
                                    <h2>{{ item.name }}</h2>
                                </v-col>
                                <v-col class="col-lg-4 text-right">
                                    <v-rating :value=item.rating half-increments color="var(--gold)"
                                        background-color="var(--gold)" size="30" dense readonly></v-rating>
                                </v-col>
                            </v-row>
                            <v-row class="justify-center pt-2 pb-8">
                                <p style="font-size: 25px"><v-icon class="px-3" size="30" color="var(--gold)">mdi-phone</v-icon> Telefono: {{item.phone}} </p>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-main>
        <FooterBar />
    </v-app>
</template>
  
<style>
.activeList {
    background-color: black;
    color: white;
}
</style>
    
<script>
//import Swal from "sweetalert2";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { getPendingMarketPostAsync } from "@/backend/market"
import { getUserProfilePictureAsync, getUserPublicProfileAsync, getUserRatingAsync } from "../backend/users";

export default {
    data: () => ({
        tradeitems: [],
        yourinventory: [],
        isLoading: true,
        error: false,
        item: { img: require("../assets/figuritas/arg01.jpg"),
                figurita: "arg01",
                precio: 500,
                name: "Pedro", 
                seller: require("../assets/persona2.jpg"), 
                rating: 4, 
                phone: "110000000"
        }

    }),
    props: {
        source: String,
    },
    mounted() {
        this.loadData()
    },
    methods: {

        // name: "ARG 5",
        // img: require("../assets/figus/arg05.jpg"),
        // status: 1,
        async loadData() {
            try {
                const id = this.$route.params.id
                const swap = await getPendingMarketPostAsync(id)

                if (swap == null)
                    this.error = true
                else{
                    const user = swap.seller
                    const figu = swap.figus[0].figu
                    this.item.figurita = figu
                    this.item.precio = swap.price
                    this.item.seller = await getUserProfilePictureAsync(user)
                    const data = await getUserPublicProfileAsync(user)
                    this.item.name = data.displayName
                    this.item.rating = (await getUserRatingAsync(user))/2
                    this.item.phone = data.phone
                }

                
            } finally {
                this.isLoading = false
            }

        },
    },
    components: { NavBar, FooterBar },
};
</script>
