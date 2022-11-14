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
            <v-row
                class="fill-height justify-center align-center pa-5 ma-0"
                v-if="loading"
            >
                <v-progress-circular
                indeterminate
                color="primary"
                :size="70"
                :width="7"
                ></v-progress-circular>
            </v-row>
            <v-container class="mb-8 elevation-8" v-if="!loading" style="background-color: white; border-radius: 4px;">
                <v-row class="pa-4">
                    <v-tabs grow color="var(--darkblue)">
                        <v-tabs-slider color="var(--darkblue)"></v-tabs-slider>
                        <v-tab>Todos</v-tab>
                        <v-tab>Faltantes</v-tab>
                        <v-tab>Tengo</v-tab>
                        <v-tab>Repetidos</v-tab>
                        <v-tab-item class="pt-4">
                            <template v-for="(n, index) in teams">
                                <v-row :key="index" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.figuCode" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
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
                                    </template>
                                    <v-col :key="index" class="col-md-12">
                                        <v-divider v-if="index < teams.length - 1"></v-divider>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-tab-item>
                        <v-tab-item>
                            <template v-for="(n, index) in teams">
                                <v-row :key="index" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.figuCode" v-if="j.status < 0" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
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
                                <v-row :key="index" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.figuCode" v-if="j.status < 1 && j.status > -1" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
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
                                <v-row :key="index" class="pa-4" v-if="filter.includes(n.id) || filter.length == 0">
                                    <v-col class="col-md-12 pa-0"><v-subheader>{{ n.id }}</v-subheader></v-col>
                                    <template v-for="j in n.players">
                                        <v-col :key="j.figuCode" v-if="j.status > 0" class="col-md-2 col-sm-3" @click="increase(j)"  @contextmenu="decrease($event, j)">
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
import { getCurrentUser } from '@/backend/users';
import { getInventoryAllIntoAsync, setInventoryFiguAsync } from '@/backend/inventory';
import {getAllFigusDataAsync} from "@/backend/figuritas";

const album = 'qatar2022';

export default {
    data: () => ({
        sections: null,
        filter: [],
        loading: true,
        teams: null,
    }),

    created(){
        this.load();
    },
    mounted(){
        this.load();
    },

    methods: {
        increase: async function (j) {
            if (j.status != 1){
                j.status++;
                const user = await getCurrentUser();
                await setInventoryFiguAsync(album, user.uid, j.id, j.status);
            }
                
        },
        decrease: async function (e, j) {
            if (j.status != -1){
                j.status--;
                const user = await getCurrentUser();
                await setInventoryFiguAsync(album, user.uid, j.id, j.status);
            }
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
        test: function(){
            alert(this.teams[1].players[1].status);
        },
        async load(){
          this.loading = true;
          try {
            const user = await getCurrentUser();
            const allFigus = await getAllFigusDataAsync(album);
            await getInventoryAllIntoAsync(album, user.uid, allFigus);

            const sections = [];
            const teams = [];

            for (let i = 0; i < allFigus.length; i++) {
              const figu = allFigus[i];
              let teamObj = teams.find((t) => t.id === figu.category);
              if (!teamObj) {
                teamObj = {id: figu.category, players: []};
                sections.push(figu.category);
                teams.push(teamObj);
              }

              let url = null;
              try {
                url = require("../assets/figuritas/" + figu.figuCode + ".jpg");
              } catch(e) {
                // console.log('No se pudo cargar img 💀', figu.figuCode, e);
              }

              teamObj.players.push({
                id: figu.figuCode,
                url: url,
                status: figu.status
              });
            }
            this.teams = teams;
            this.sections = sections;
          } finally {
            this.loading = false;
          }
        }
    },
    props: {
        url: String
    },
    components: { NavBar, FooterBar }
};
</script>
