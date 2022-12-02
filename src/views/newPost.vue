<template>
    <v-app>
        <NavBar />
        <v-main class="bg fill-height">
            <v-container class="mb-8 pa-0 fill-height">
                <v-row class="ma-0 align-start" v-if="!isLoading">
                    <v-col class="mr-2 elevation-8 pa-4" cols="4" style="background-color: white; border-radius: 4px;">
                        <h1 class="text-overline" style="color:#999;">Market</h1>
                        <h1 class="text-h5 mb-4">Crear publicación</h1>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-select
                                v-model="equipo"
                                :items="teams"
                                item-text="id"
                                item-value="index"
                                :rules="[v => !!(v+1) || 'This field is required']"
                                label="Equipo"
                                color="var(--gold)"
                                required
                                outlined
                            ></v-select>
                            <v-select
                                v-model="player"
                                :items="teams[equipo].players"
                                item-text="id"
                                item-value="index"
                                :rules="[v => !!v || 'This field is required']"
                                label="Figurita"
                                color="var(--gold)"
                                required
                                outlined
                                return-object
                            ></v-select>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="price"
                                        :rules="[v => !!v || 'This field is required']"
                                        label="Precio"
                                        append-icon="mdi-currency-usd"
                                        color="var(--gold)"
                                        type="number"
                                        hide-spin-buttons
                                        required
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-checkbox
                            v-model="checkbox"
                            class="terms"
                            dense
                            :rules="[v => !!v || 'This field is required']"
                            label="He leído y comprendido los términos y condiciones."
                            required
                            ></v-checkbox>

                            <div class="text-right">
                                <v-btn text rounded color="var(--darkblue)" @click="reset">
                                    Reset
                                </v-btn>

                                <v-btn :disabled="!valid" text rounded color="var(--gold)" @click="createPost">
                                    Publicar
                                </v-btn>
                            </div>
                        </v-form>
                    </v-col>
                    <v-col class="ml-2 elevation-8 pa-4" style="background-color: white; border-radius: 4px;">
                        <h1 class="text-overline" style="color:#999;">Vista previa</h1>
                            <v-row no-gutters class="pa-0 elevation-4" style="border-radius: 4px;">
                                <v-col cols="5" class="pa-0">
                                    <v-card class="elevation-0" style="border-radius: 4px 0 0 4px;">
                                        <v-img v-if="!player" src="../assets/figuritas/placeholder.jpg"></v-img>
                                        <v-img v-if="player" :src="player.url"></v-img>
                                    </v-card>
                                </v-col>
                                <v-col cols="7" class="pa-4">
                                    <v-container style="height: 50%;">
                                        <h2 class="text-h5 text-center text-uppercase font-weight-black" style="color:var(--indigo)" v-if="!player">Figurita</h2>
                                        <h2 class="text-h5 text-center text-uppercase font-weight-black" style="color:var(--indigo)" v-if="player">{{ player.name }}</h2>
                                        <h3 class="text-subtitle-1 text-center font-weight-bold text-uppercase" style="color:var(--darkblue)" v-if="!equipo">Equipo</h3>
                                        <h3 class="text-subtitle-1 text-center font-weight-bold text-uppercase" style="color:var(--darkblue)" v-if="equipo">{{ teams[equipo-1].team }}</h3>
                                        <h3 class="text-h3 text-center font-weight-black mt-8" style="color:var(--gold)" v-if="!price">FutCoins</h3>
                                        <h3 class="text-h3 text-center font-weight-black mt-8" style="color:var(--gold)" v-if="price">{{ price }} FutCoins</h3>
                                    </v-container>
                                    <v-container style="height: 30%;">
                                        <v-divider></v-divider>
                                        <h2 class="text-overline" style="color:#999;">Información del vendedor</h2>
                                        <v-row no-gutters class="align-center">
                                            <v-col class="col-lg-2 pa-0 text-center">
                                                <v-avatar circle size="50">
                                                    <v-img :src="profilePictureUrl" v-if="profilePictureUrl"/>
                                                </v-avatar>
                                            </v-col>
                                            <v-col class="col-lg-6 pl-2">
                                                <h3 class="text-subtitle-1">{{name}}</h3>
                                            </v-col>
                                            <v-col class="col-lg-4 text-right">
                                                <v-rating :value="rating" half-increments color="var(--gold)" background-color="var(--gold)" size="18" dense readonly></v-rating>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                    </v-col>
                </v-row>
            </v-container>
      </v-main>
      <FooterBar />
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

.terms .v-label {
  font-size: 13px!important;
} 
</style>
  
<script>
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { getCurrentUser } from '@/backend/users';
import {getInventoryAllIntoAsync} from '@/backend/inventory';
import {getAllFigusDataAsync} from "@/backend/figuritas";
import { getUserProfilePictureAsync, getUserPublicProfileAsync, getUserRatingAsync } from '../backend/users';
import { createMarketPost } from '@/backend/market';
import Swal from 'sweetalert2';
import { Router } from "../router/index.js";
    
    export default {
        data: () => ({
            isLoading: true,
            name: null,
            profilePictureUrl: null,
            rating: 0,

            error: false,
            isCreatingPost: false,
            

            valid: true,
            equipo: 0,
            player: null,
            price: null,
            checkbox: false,
            disabled: 1,
            teams: null,
            sections: null,
        }),

        props: {
            source: String,
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

            async createPost(){
                try{
                    //export async function createMarketPost(price, figus, amounts)
                    this.isCreatingPost = true
                    this.validate()
                    if(this.price > 0 && this.player)
                        await createMarketPost(this.price, [{figu: this.player.id}], [1])
                    else
                        this.error = true
                    
                }catch(e){
                    if(e){
                        this.error = true
                        await Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: "Publicacion Creada",
                            showConfirmButton: true,
                        });
                    }
                }  finally{
                    if(!this.error){
                        await Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "Publicacion Creada",
                            showConfirmButton: true,
                        });
                        Router.push('/market')
                    }
                    this.isCreatingPost = false
                }
            },

            async loadData() {
                this.isLoading = true;
                const album = 'qatar2022'
                try {
                    const user = await getCurrentUser();
                    const allFigus = await getAllFigusDataAsync(album);
                    await getInventoryAllIntoAsync(album, user.uid, allFigus);

                    const sections = [];
                    const teams = [];
                    var teamIdx = 0;
                    var playerIndex = 0;

                    for (let i = 0; i < allFigus.length; i++) {
                        const figu = allFigus[i];
                        let teamObj = teams.find((t) => t.id === figu.category);
                        if (!teamObj) {
                            playerIndex = 0
                            teamObj = {id: figu.category, players: [], index: teamIdx};
                            teamIdx++;
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
                            index: playerIndex,
                            url: url,
                        });
                        playerIndex++
                    }
                    this.teams = teams;
                    this.sections = sections;

                    const userPublicData = await getUserPublicProfileAsync(user.uid)
                    this.name = userPublicData.displayName
                    this.profilePictureUrl = await getUserProfilePictureAsync(user.uid)

                    this.rating = (await getUserRatingAsync(user.uid)).average / 2;

                } finally {
                    this.isLoading = false;
                }
            },

            test(){
                alert(this.player.id)
            },

            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
                this.equipo = 0
                this.player = null
            },

        },
        components: { NavBar, FooterBar },
        };
</script>