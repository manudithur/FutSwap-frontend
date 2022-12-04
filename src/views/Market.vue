<template>
    <v-app>
        <NavBar/>
        <v-main class="bg">
            <v-container class="mb-8">
                <v-row class="ma-0 align-center">
                    <v-col class="col-lg-10 col-sm-12 pa-0">
                        <h1 class="text-h3 text-uppercase white--text font-weight-black" style="text-shadow: 0px 1px 4px #3E4D7C">Market</h1>
                    </v-col>
                    <v-col class="col-lg-1 col-sm-2 pa-0 text-center">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-large icon style="color: white" to="/market/newPost" v-bind="attrs" v-on="on">
                                    <v-icon size="40" style="text-shadow: 0px 1px 4px #3E4D7C">mdi-pencil-plus-outline</v-icon>
                                </v-btn>
                            </template>
                            <span class="text-caption text-uppercase">Crear publicación</span>
                        </v-tooltip>
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
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Precio</v-list-item-subtitle>
                                            <v-list-item-action class="ma-0 mt-7 mb-0">
                                                <v-col class="col-md-12">
                                                    <v-slider class="align-center" v-model="price" :max="250"  thumb-label="always" thumb-color="var(--gold)" dense color="var(--gold)" track-color="var(--lightblue)"/>
                                                </v-col>
                                            </v-list-item-action>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>

                                <v-card-actions class="justify-center">
                                    <v-btn color="var(--darkblue)" text @click="menu = false">Cancelar</v-btn>
                                    <v-btn color="var(--gold)" text @click="menu = false" v-on:click="radiusbtn = radius; pricebtn = price">Aplicar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>

            <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;" v-if="!isLoading">
                <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :search="search"
                :page.sync="page"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
                hide-default-footer
                >
                    <template v-slot:header>
                        <v-toolbar class="elevation-0" style="border-radius: 4px 4px 0 0;">
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-text-field
                                v-model="search"
                                clearable
                                flat
                                color="var(--gold)"
                                outlined
                                hide-details
                                prepend-inner-icon="mdi-magnify"
                                label="Search"
                            ></v-text-field>
                            <v-spacer></v-spacer>
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
                                <v-col :key="item.name" cols="12" sm="6" md="4" lg="3" v-if="item.distancia < radiusbtn && item.precio < pricebtn">
                                    <v-dialog transition="dialog-bottom-transition" max-width="742">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-card class="pa-2 grow" elevation="8" v-bind="attrs" v-on="on">
                                                <v-img :src=item.sell style="border-radius: 4px;"></v-img>
                                                <v-row no-gutters class="pa-4 pb-0 align-center">
                                                    <v-col class="col-lg-6 text-left d-flex align-center">
                                                        <h3 class="text-subtitle-2" style="color: #999;">Distancia:</h3>
                                                    </v-col>
                                                    <v-col class="col-lg-6 text-right">
                                                        <h3 class="text-subtitle-2" style="color: #999;">Precio:</h3>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters class="pa-4 pt-0 align-center">
                                                    <v-col class="col-lg-6">
                                                        <h3 class="text-body-1 d-flex align-center justify-start font-weight-bold" style="color:#333"><v-icon class="pr-1" style="color:var(--gold); padding-bottom: 1px;" size="20">mdi-map-marker-outline</v-icon>{{ item.distancia }} KM</h3>
                                                    </v-col>
                                                    <v-col class="col-lg-6">
                                                        <h3 class="text-body-1 d-flex align-center justify-end font-weight-bold" style="color:#333"><v-icon class="pr-1" style="color:var(--gold); padding-bottom: 1px;" size="20">mdi-currency-usd</v-icon>{{ item.precio }} FTC</h3>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters class="px-4 pb-2 align-center">
                                                    <v-col class="col-lg-12 text-center">
                                                        <router-link to="/trading" style="text-decoration:none">
                                                            <v-btn large block outlined rounded color="var(--indigo)">
                                                                Swap
                                                            </v-btn>
                                                        </router-link>  
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </template>
                                        <template v-slot:default="dialog">
                                            <v-card>
                                                <v-row no-gutters class="pa-0 elevation-4">
                                                    <v-col cols="5" class="pa-2">
                                                        <v-card class="elevation-0" style="border-radius: 4px;">
                                                            <v-img :src="item.sell"></v-img>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="7" class="pa-4">
                                                        <v-row no-gutters class="pa-4 pb-0 align-center">
                                                            <v-col class="col-lg-12 pb-2 text-left">
                                                                <h3 class="text-subtitle-2" style="color: #999;">Equipo:</h3>
                                                                <h2 class="text-body-1 text-uppercase font-weight-bold" style="color:#333">{{ item.team }}</h2>
                                                            </v-col>
                                                            <v-col class="col-lg-12 text-left">
                                                                <h3 class="text-subtitle-2" style="color: #999;">Figurita:</h3>
                                                                <h2 class="text-body-1 text-uppercase font-weight-bold" style="color:#333">{{ item.figurita }}</h2>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters class="pa-4 pb-0 align-center">
                                                            <v-col class="col-lg-6 text-left">
                                                                <h3 class="text-subtitle-2" style="color: #999;">Distancia:</h3>
                                                            </v-col>
                                                            <v-col class="col-lg-6 text-right">
                                                                <h3 class="text-subtitle-2" style="color: #999;">Precio:</h3>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters class="pa-4 pt-0 align-center">
                                                            <v-col class="col-lg-6 text-left d-flex align-center justify-start">
                                                                <h3 class="text-body-1 font-weight-bold" style="color:#333"><v-icon class="pr-1 pb-1" style="color:var(--gold);" size="24">mdi-map-marker-outline</v-icon>{{ item.distancia }} KM</h3>
                                                            </v-col>
                                                            <v-col class="col-lg-6 text-left d-flex align-center justify-end">
                                                                <h3 class="text-body-1 font-weight-bold" style="color:#333"><v-icon class="pr-1 pb-1" style="color:var(--gold);" size="24">mdi-currency-usd</v-icon>{{ item.precio }} FTC</h3>
                                                            </v-col>
                                                        </v-row>
                                                        <v-divider class="mx-4"></v-divider>
                                                        <h2 class="text-overline px-4 pb-2" style="color:#BBB;">Información del vendedor</h2>
                                                        <v-row no-gutters class="align-center px-4 pb-4">
                                                            <v-col class="col-lg-2 pa-0 text-left">
                                                                <v-avatar circle size="40">
                                                                    <v-img :src=item.img />
                                                                </v-avatar>
                                                            </v-col>
                                                            <v-col class="col-lg-6">
                                                                <h3 class="text-subtitle-2">{{ item.name }}</h3>
                                                            </v-col>
                                                            <v-col class="col-lg-4 text-right">
                                                                <v-rating :value=item.rating half-increments color="var(--gold)" background-color="var(--gold)" size="18" dense readonly></v-rating>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters class="px-4 pt-4">
                                                            <v-btn x-large block outlined rounded color="var(--indigo)">
                                                                Swap
                                                            </v-btn>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </template>
                                    </v-dialog>
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
import NavBar from '../components/NavBar.vue';
import FooterBar from '../components/FooterBar.vue';
import { getActiveMarketPosts } from '@/backend/market';
import { getUserProfilePictureAsync, getUserPublicProfileAsync } from '../backend/users';

export default {
    data: () => ({
        price: 250,
        pricebtn: 250,
        radius: 234,
        radiusbtn: 234,
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'id',
        keys: [
            'Figurita',
            'Distancia',
            'Precio',
            'Rating'
        ],

        isLoading: true,
        items: []
    }),
    computed: {
        numberOfPages () {
            return Math.ceil(this.items.length / this.itemsPerPage)
        },
        filteredKeys () {
            return this.keys.filter(key => key !== 'Distancia')
        },
    },
    mounted() {
        // Empiezo a buscar el dato a la API. Esta tarea queda corriendo en el fondo.
        this.isLoading = true
        this.loadData();
    },
    created(){
        this.isLoading = true
        this.loadData();
    },
    
    methods: {
        // name: 'Nestor',
        // img: require("../assets/persona1.jpeg"),
        // distancia: 0.7,
        // id: 1,
        // sell: require("../assets/figuritas/arg19.jpg"),
        // figurita: "Lionel Messi",
        // team: "Argentina",
        // precio: 230,
        // rating: "5"
        async loadData(){
            this.isLoading = true;
            var toRet = []
            try {
                const posts = await getActiveMarketPosts(null)
                for(var i = 0  ; i < posts.length ; i++){
                    var uid = posts[i].seller
                    var publicData = await getUserPublicProfileAsync(uid)
                    var img = await getUserProfilePictureAsync(uid)
                    if(!img)
                        img = require("../assets/empty-profile.jpg")

                    var url = require("../assets/figuritas/" + posts[i].figus[0].figu + ".jpg")
                    toRet.push({name: publicData.displayName,
                        img: img,
                        distancia: 10,
                        sell: url,
                        id: posts[i].id,
                        figurita: posts[i].figus[0].figu,
                        precio: posts[i].price
                    })
                }
            } finally {
                this.items = toRet
                this.isLoading = false;
            }
        },
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