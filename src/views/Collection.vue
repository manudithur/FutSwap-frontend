<template>
    <v-app>
        <NavBar/>
        <v-main class="bg">
            <v-container class="mb-8">
                <v-row class="ma-0 align-center">
                    <v-col class="col-lg-6 col-sm-12 pa-0">
                        <h1 class="text-h3 text-uppercase white--text font-weight-black" style="text-shadow: 0px 1px 4px #3E4D7C">Mi Inventario</h1>
                    </v-col>
                    <v-col class="col-lg-5 col-sm-10 pa-0">
                        <v-autocomplete v-model="filter" :items="sections" small-chips multiple clearable
                                    deletable-chips solo dense hide-selected hide-no-data hide-details item-text="name"
                                    item-value="id" placeholder="Busca una sección" color="var(--gold)"
                                    prepend-inner-icon="mdi-magnify" rounded>
                        </v-autocomplete>
                    </v-col>
                    <v-col class="col-lg-1 col-sm-2 pa-0 text-center">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-large icon style="color: white" @click="about" v-bind="attrs" v-on="on">
                                    <v-icon size="38" style="text-shadow: 0px 1px 4px #3E4D7C">mdi-help-circle-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Como funciona</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;">
                <!-- <v-row>
                    <v-card width="100%">
                        <v-img class="align-center" style="border-radius: 4px 4px 0 0;" :aspect-ratio="5" src="../assets/banner6.webp"
                            gradient="to top right, rgba(62,77,124,0.3), rgba(62,77,124,0.6)">
                            <v-card-title class="justify-center text-uppercase">
                                <h1 class="h1">Mi Inventario</h1>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-row> -->
                <v-row class="pa-4">
                    <v-tabs grow color="var(--darkblue)">
                        <v-tabs-slider color="var(--darkblue)"></v-tabs-slider>
                        <v-tab>Todos</v-tab>
                        <v-tab>Faltantes</v-tab>
                        <v-tab>Tengo</v-tab>
                        <v-tab>Repetidos</v-tab>
                        <v-tab-item class="pt-4">
                            <template v-for="(n, index) in teams">
                                <v-row :key="n" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.status" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
                                            <v-card class="grow" :elevation="8" v-if="j.status == -1">
                                                <v-img :src="j.url" style="filter: grayscale(100%)"></v-img>
                                            </v-card>
                                            <v-card class="grow" :elevation="8" v-if="j.status == 0">
                                                <v-img :src="j.url"></v-img>
                                            </v-card>
                                            <v-card class="grow" :elevation="8" v-if="j.status == 1">
                                                <v-img :src="j.url" style="filter:grayscale(100%) brightness(80%) sepia(300%) contrast(60%) hue-rotate(50deg) saturate(500%)"></v-img>
                                            </v-card>
                                        </v-col>
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
                                    </template>
                                    <v-col :key="index" class="col-md-12">
                                        <v-divider v-if="index < teams.length - 1"></v-divider>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-tab-item>
                        <v-tab-item>
                            <template v-for="(n, index) in teams">
                                <v-row :key="n" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.status" v-if="j.status < 0" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
                                            <v-card class="grow" :elevation="8">
                                                <v-img :src="j.url" style="filter: grayscale(100%)"></v-img>
                                            </v-card>
                                        </v-col>
                                    </template>
                                    <v-col :key="index" class="col-md-12">
                                        <v-divider v-if="index < teams.length - 1"></v-divider>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-tab-item>
                        <v-tab-item>
                            <template v-for="(n, index) in teams">
                                <v-row :key="n" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.status" v-if="j.status < 1 && j.status > -1" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
                                            <v-card class="grow" :elevation="8">
                                                <v-img :src="j.url"></v-img>
                                            </v-card>
                                        </v-col>
                                    </template>
                                    <v-col :key="index" class="col-md-12">
                                        <v-divider v-if="index < teams.length - 1"></v-divider>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-tab-item>
                        <v-tab-item>
                            <template v-for="(n, index) in teams">
                                <v-row :key="n" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.status" v-if="j.status > 0" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
                                            <v-card class="grow" :elevation="8">
                                                <v-img :src="j.url" style="filter:grayscale(100%) brightness(80%) sepia(300%) contrast(60%) hue-rotate(50deg) saturate(500%)"></v-img>
                                            </v-card>
                                        </v-col>
                                    </template>
                                    <v-col :key="index" class="col-md-12">
                                        <v-divider v-if="index < teams.length - 1"></v-divider>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-tab-item>
                    </v-tabs>
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

.grow {
    transition: all .2s ease-in-out;
}

.grow:hover {
    transform: scale(1.02);
}
</style>

<script>
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar.vue';
import FooterBar from '../components/FooterBar.vue';

export default {
    data: () => ({
        sections: ['Argentina', 'Netherlands', 'Spain', 'Portugal'],
        filter: [],
        teams: [
            {id: 'Argentina', players: [
                    { url: require("../assets/figuritas/arg01.jpg"), status: -1},
                    { url: require("../assets/figuritas/arg02.jpg"), status: 0},
                    { url: require("../assets/figuritas/arg03.jpg"), status: 1},
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
            {id: 'Netherlands', players: [
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
            {id: 'Spain', players: [
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
            {id: 'Portugal', players: [
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
        increase: function (j) {
            if (j.status != 1)
                j.status++;
        },
        decrease: function (e, j) {
            if (j.status != -1)
                j.status--;
            e.preventDefault();
        },
        about: function () {
            Swal.fire({
                title: "Con click izq y click derecho vas cambiando entre las posibles opciones",
                imageUrl: require("../assets/collectionUse.png"),
                imageAlt: "Custom image",
                width: 900,
                confirmButtonColor: '#3e4d7c'
            })
        },
    },
    props: {
        url: String
    },
    components: { NavBar, FooterBar }
};
</script>
