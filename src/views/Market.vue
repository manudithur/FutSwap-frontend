<template>
    <v-app>
        <NavBar/>
        <v-main class="bg">
            <v-container class="mb-8">
                <v-row class="ma-0 align-center">
                    <v-col class="col-lg-5 col-sm-12 pa-0">
                        <h1 class="text-h3 text-uppercase white--text font-weight-black" style="text-shadow: 0px 1px 4px #3E4D7C">Market</h1>
                    </v-col>
                    <v-col class="col-lg-5 col-sm-10 pa-0">
                        <v-autocomplete v-model="filter" :items="sections" small-chips multiple clearable
                                    deletable-chips solo dense hide-selected hide-no-data hide-details item-text="name"
                                    item-value="id" placeholder="Busca una sección" color="var(--gold)"
                                    prepend-inner-icon="mdi-magnify" rounded>
                        </v-autocomplete>
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
                                            <v-list-item-action class="ma-0 mt-7 mb-0">
                                                <v-col class="col-md-12">
                                                    <v-slider class="align-center" v-model="radius" :max="250"  thumb-label="always" thumb-color="blue" dense color="var(--gold)" track-color="var(--lightblue)"/>
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
                    <v-col class="col-lg-1 col-sm-2 pa-0 text-center">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-large icon style="color: white" to="/market/newPost" v-bind="attrs" v-on="on">
                                    <v-icon size="38" style="text-shadow: 0px 1px 4px #3E4D7C">mdi-pencil-plus-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Crear publicación</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;">
                <v-row class="pa-4">
                    <template v-for="swap in swaps">
                        <v-col class="col-lg-3 col-md-2 col-sm-3" :key="swap.distance" v-if="swap.distance < radiusbtn">
                            <v-card class="pa-2 grow" elevation="8">
                                <v-img :src=swap.sell style="border-radius: 4px;"></v-img>
                                <v-row no-gutters class="pt-2 align-center">
                                    <v-col class="col-lg-3 text-center">
                                        <v-avatar circle size="30">
                                            <v-img :src=swap.pfp />
                                        </v-avatar>
                                    </v-col>
                                    <v-col class="col-lg-9">
                                        <h3 class="text-overline" style="font-size: 10px;">{{ swap.name }}</h3>
                                    </v-col>
                                    <v-col class="col-lg-4">
                                        <v-rating value="4.5" half-increments color="var(--gold)" background-color="var(--gold)" size="18" dense readonly></v-rating>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="align-center">
                                    <v-col class="col-lg-12 text-right">
                                        <h2 class="text-h5 text-center text-uppercase font-weight-black" style="color:var(--indigo)">{{ player.name }}</h2>
                                        <h3 class="text-subtitle-1 text-center font-weight-bold text-uppercase" style="color:var(--darkblue)">Equipo</h3>
                                    </v-col>
                                    <v-col class="col-lg-12 text-right">
                                        <router-link to="/trading" style="text-decoration:none">
                                            <v-btn rounded color="#3E4D7C"
                                                class="mr-0 btn-custom-md white--text">
                                                Swap
                                            </v-btn>
                                        </router-link>  
                                    </v-col>
                                </v-row>

                                                                  
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
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

export default {
    data: () => ({
        radius: 234,
        radiusbtn: 234,
        swaps: [
            {
                distance: 0.7,
                name: "Nestor",
                parati: "7",
                busc: "5",
                past: "50",
                rate: "17",
                id: "1",
                pfp: require("../assets/persona1.jpeg"),
                sell: require("../assets/figuritas/arg19.jpg"),
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
                pfp: require("../assets/persona2.jpg"),
                sell: require("../assets/figuritas/por17.jpg"),
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
                pfp: require("../assets/persona3.jpg"),
                sell: require("../assets/figuritas/arg06.jpg"),
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
                pfp: require("../assets/persona4.jpg"),
                sell: require("../assets/figuritas/por02.jpg"),
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
                pfp: require("../assets/persona5.webp"),
                sell: require("../assets/figuritas/arg10.jpg"),
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
                pfp: require("../assets/persona6.webp"),
                sell: require("../assets/figuritas/por11.jpg"),
                rating: "0.5"
            }
        ],
        teams: [
            {   team: "Argentina", index: 1,
                players: [
                    { name:"Argentina", url: require("../assets/figuritas/arg01.jpg"), status: -1 },
                    { name:"Emiliano Martínez", url: require("../assets/figuritas/arg02.jpg"), status: -1 },
                    { name:"Franco Armani", url: require("../assets/figuritas/arg03.jpg"), status: -1 },
                    { name:"Marcos Acuña", url: require("../assets/figuritas/arg04.jpg"), status: -1 },
                    { name:"Nahuel Molina", url: require("../assets/figuritas/arg05.jpg"), status: -1 },
                    { name:"Nicolás Otamendi", url: require("../assets/figuritas/arg06.jpg"), status: -1 },
                    { name:"Germán Pezzella", url: require("../assets/figuritas/arg07.jpg"), status: -1 },
                    { name:"Cristian Romero", url: require("../assets/figuritas/arg08.jpg"), status: -1 },
                    { name:"Rodrigo De Paul", url: require("../assets/figuritas/arg09.jpg"), status: -1 },
                    { name:"Ángel Di María", url: require("../assets/figuritas/arg10.jpg"), status: -1 },
                    { name:"Giovani Lo Celso", url: require("../assets/figuritas/arg11.jpg"), status: -1 },
                    { name:"Leandro Paredes", url: require("../assets/figuritas/arg12.jpg"), status: -1 },
                    { name:"Guido Rodríguez", url: require("../assets/figuritas/arg13.jpg"), status: -1 },
                    { name:"Julián Álvarez", url: require("../assets/figuritas/arg14.jpg"), status: -1 },
                    { name:"Joaquín Correa", url: require("../assets/figuritas/arg15.jpg"), status: -1 },
                    { name:"Alejandro Gómez", url: require("../assets/figuritas/arg16.jpg"), status: -1 },
                    { name:"Nicolás González", url: require("../assets/figuritas/arg17.jpg"), status: -1 },
                    { name:"Lautaro Martínez", url: require("../assets/figuritas/arg18.jpg"), status: -1 },
                    { name:"Lionel Messi", url: require("../assets/figuritas/arg19.jpg"), status: -1 },
                ]
            },
            {   team: "Portugal", index: 2,
                players: [
                    { name:"Portugal", url: require("../assets/figuritas/por01.jpg"), status: -1 },
                    { name:"Diogo Costa", url: require("../assets/figuritas/por02.jpg"), status: -1 },
                    { name:"Rui Patrício", url: require("../assets/figuritas/por03.jpg"), status: -1 },
                    { name:"João Cancelo", url: require("../assets/figuritas/por04.jpg"), status: -1 },
                    { name:"José Fonte", url: require("../assets/figuritas/por05.jpg"), status: -1 },
                    { name:"Nuno Mendes", url: require("../assets/figuritas/por06.jpg"), status: -1 },
                    { name:"Pepe", url: require("../assets/figuritas/por07.jpg"), status: -1 },
                    { name:"Raphaël Guerreiro", url: require("../assets/figuritas/por08.jpg"), status: -1 },
                    { name:"Rúben Dias", url: require("../assets/figuritas/por09.jpg"), status: -1 },
                    { name:"Bernardo Silva", url: require("../assets/figuritas/por10.jpg"), status: -1 },
                    { name:"Bruno Fernandes", url: require("../assets/figuritas/por11.jpg"), status: -1 },
                    { name:"Danilo Pereira", url: require("../assets/figuritas/por12.jpg"), status: -1 },
                    { name:"João Moutinho", url: require("../assets/figuritas/por13.jpg"), status: -1 },
                    { name:"Renato Sanches", url: require("../assets/figuritas/por14.jpg"), status: -1 },
                    { name:"Rúben Neves", url: require("../assets/figuritas/por15.jpg"), status: -1 },
                    { name:"André Silva", url: require("../assets/figuritas/por16.jpg"), status: -1 },
                    { name:"Cristiano Ronaldo", url: require("../assets/figuritas/por17.jpg"), status: -1 },
                    { name:"Diogo Jota", url: require("../assets/figuritas/por18.jpg"), status: -1 },
                    { name:"Gonçalo Guedes", url: require("../assets/figuritas/por19.jpg"), status: -1 },
                ]
            },
        ],
    }),
    props: {
        source: String
    },
    components: { NavBar, FooterBar }
}
</script>