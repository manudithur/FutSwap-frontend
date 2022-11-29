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
                                    <v-icon size="40" style="text-shadow: 0px 1px 4px #3E4D7C">mdi-filter-cog-outline</v-icon>
                                </v-btn>
                            </template>

                            <v-card>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Distancia</v-list-item-subtitle>
                                            <v-list-item-action class="ma-0 mt-7 mb-0">
                                                <v-col class="col-md-12">
                                                    <v-slider class="align-center" v-model="radius" :max="250"  thumb-label="always" thumb-color="var(--gold)" dense color="var(--gold)" track-color="var(--lightblue)"/>
                                                </v-col>
                                            </v-list-item-action>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>

                                <v-card-actions class="justify-center">
                                    <v-btn color="var(--darkblue)" text @click="menu = false">Cancelar</v-btn>
                                    <v-btn color="var(--gold)" text @click="menu = false" v-on:click="radiusbtn = radius; preciobtn = precio">Aplicar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>

            <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;">
                <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :page.sync="page"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
                hide-default-footer
                >
                    <template v-slot:header>
                        <v-toolbar class="elevation-0" style="border-radius: 4px 4px 0 0;">
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-select
                            v-model="sortBy"
                            flat
                            outlined
                            color="var(--gold)"
                            hide-details
                            :items="keys"
                            prepend-inner-icon="mdi-magnify"
                            label="Ordenar por"
                            ></v-select>
                            <v-spacer></v-spacer>
                            <v-btn-toggle rounded class="ml-4" v-model="sortDesc" mandatory>
                                <v-btn icon color="#BBB" :value="false">
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn icon color="#BBB" :value="true">
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </template>
                        </v-toolbar>
                    </template>

                    <template v-slot:default="props">
                        <v-row class="pa-4">
                            <template v-for="item in props.items">
                                <v-col :key="item.name" cols="12" sm="6" md="4" lg="3" v-if="item.distancia < radiusbtn">
                                    <v-card>
                                        <v-img class="profile-pic" :src=item.img></v-img>
                                        <v-row class="pa-4 text-center ">
                                            <v-col class="col-lg-12 pb-0">
                                                <h1 class="text-h5">{{item.name}}</h1>
                                            </v-col>
                                            <v-col class="col-lg-12 py-0">
                                                <span class="text-caption faded pb-2"><v-icon class="faded" size="16" style="padding-bottom: 1px;">mdi-map-marker-outline</v-icon> a {{item.distancia}} km de distancia</span>
                                            </v-col>
                                            <v-col class="col-lg-12 pb-0">
                                                <v-divider class="ma-2 faded"></v-divider>
                                            </v-col>
                                            <v-col class="col-lg-12 py-0">
                                                <v-rating :value="item.rating" half-increments color="var(--gold)" background-color="var(--gold)" size="20" dense readonly></v-rating>
                                            </v-col>
                                            <v-col class="col-lg-12 py-0">
                                                <span class="text-caption faded">{{item.past}} Swaps ● {{item.rate}} Calificaciones</span>
                                            </v-col>
                                            <v-col class="col-lg-12 py-0">
                                                <v-divider class="ma-2 pb-1 faded"></v-divider>
                                            </v-col>
                                            <v-col class="col-lg-6 justify-center d-flex align-center pb-0">
                                                <h3 class="text-subtitle-2" style="color: #999;">Para ti:</h3>
                                            </v-col>
                                            <v-col class="col-lg-6 text-center pb-0">
                                                <h3 class="text-subtitle-2" style="color: #999;">Buscando:</h3>
                                            </v-col>
                                            <v-col class="col-lg-6 pt-0">
                                                <h1 class="text-h5 font-weight-bold d-flex align-center justify-center" style="color: #333;"><v-icon class="pr-1" style="color:var(--gold); padding-bottom: 1px;" size="24">mdi-account-arrow-left-outline</v-icon>{{item.oferta}}</h1>
                                            </v-col>
                                            <v-col class="col-lg-6 pt-0">
                                                <h1 class="text-h5 font-weight-bold d-flex align-center justify-center" style="color: #333;"><v-icon class="pr-1" style="color:var(--gold); padding-bottom: 1px;" size="24">mdi-account-arrow-right-outline</v-icon>{{item.busc}}</h1>
                                            </v-col>
                                            <v-col class="col-lg-12 py-0 text-center">
                                                <router-link to="/trading" style="text-decoration:none">
                                                    <v-btn large block outlined rounded color="var(--indigo)">
                                                        Swap
                                                    </v-btn>
                                                </router-link>  
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </template>
                        </v-row>
                    </template>

                    <template v-slot:footer>
                        <v-row class="px-7 pb-4 align-center justify-center">
                            <span class="text-overline" style="color: #999;">Elementos por página:</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text color="var(--gold)" v-bind="attrs" v-on="on">
                                        {{ itemsPerPage }}
                                        <v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                        v-for="(number, index) in itemsPerPageArray"
                                        :key="index"
                                        @click="updateItemsPerPage(number)"
                                    >
                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                            <v-spacer></v-spacer>

                            <span class="text-overline mr-4" style="color: #999;">
                                Page {{ page }} of {{ numberOfPages }}
                            </span>
                            
                            <v-btn
                                fab
                                small
                                dark
                                outlined
                                color="var(--indigo)"
                                class="mr-1"
                                @click="formerPage"
                            >
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                small
                                dark
                                outlined
                                color="var(--indigo)"
                                class="ml-1"
                                @click="nextPage"
                            >
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </template>
                </v-data-iterator>         
            </v-container>
        </v-main>
        <FooterBar/>
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
    color:#999!important;
}

.grow {
    transition: all .2s ease-in-out;
}

.grow:hover {
    transform: scale(1.05);
}

</style>

<script>
import NavBar from '../components/NavBar.vue';
import FooterBar from '../components/FooterBar.vue';

export default {
    data: () => ({
        radius: 234,
        radiusbtn: 234,
        itemsPerPageArray: [4, 8, 12],
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'id',
        keys: [
            'Distancia',
            'Oferta',
            'Rating'
        ],
        items: [
            {
                name: 'Nestor',
                img: require("../assets/persona1.jpeg"),
                distancia: 0.7,
                oferta: 7,
                busc: 5,
                past: 50,
                rate: 17,
                id: 1,
                rating: 5
            },
            {
                name: "Cristian",
                img: require("../assets/persona2.jpg"),
                distancia: 0.2,
                oferta: 2,
                busc: 5,
                past: 50,
                rate: 17,
                id: 2,
                rating: 2
            },
            {
                name: "Miguel",
                img: require("../assets/persona3.jpg"),
                distancia: 6,
                oferta: 10,
                busc: 5,
                past: 50,
                rate: 17,
                id: 3,
                rating: 5
            },
            {
                name: "Jony",
                img: require("../assets/persona4.jpg"),
                distancia: 0.7,
                oferta: 7,
                busc: 5,
                past: 50,
                rate: 17,
                id: 4,
                rating: 3.5
            },
            {
                name: "Esequiel",
                img: require("../assets/persona5.webp"),
                distancia: 67,
                oferta: 200,
                busc: 5,
                past: 50,
                rate: 17,
                id: 5,
                rating: 1.5
            },
            {
                name: "Ricardo",
                img: require("../assets/persona6.webp"),
                distancia: 233,
                oferta: 2,
                busc: 5,
                past: 50,
                rate: 17,
                id: 6,
                rating: 0.5
            },
        ],
    }),
    computed: {
        numberOfPages () {
            return Math.ceil(this.items.length / this.itemsPerPage)
        },
        filteredKeys () {
            return this.keys.filter(key => key !== 'Distancia')
        },
    },
    methods: {
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
            this.itemsPerPage = number
        },
    },
    props: {
        source: String
    },
    components: { NavBar, FooterBar }
}
</script>
