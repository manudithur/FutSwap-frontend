<template>
    <v-app>
        <NavBar />
        <v-main class="bg">
            <v-container class="mb-8 pa-0">
                <v-row class="ma-0 align-start">
                    <v-col class="mr-2 elevation-8 pa-4" cols="4" style="background-color: white; border-radius: 4px;">
                        <h1 class="text-overline" style="color:#999;">Market</h1>
                        <h1 class="text-h5 mb-4">Crear publicación</h1>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-select
                                v-model="equipo"
                                :items="teams"
                                item-text="team"
                                item-value="index"
                                :rules="[v => !!v || 'This field is required']"
                                label="Equipo"
                                color="var(--gold)"
                                required
                                outlined
                                @input="disabled = disabled + 1"
                            ></v-select>
                            <v-select
                                v-if="!equipo"
                                v-model="player"
                                :items="teams[1].players"
                                item-text="name"
                                item-value="url"
                                :rules="[v => !!v || 'This field is required']"
                                label="Figurita"
                                color="var(--gold)"
                                required
                                outlined
                                return-object
                                :disabled="disabled == 1"
                            ></v-select>

                            <v-select
                                v-if="equipo"
                                v-model="player"
                                :items="teams[equipo-1].players"
                                item-text="name"
                                item-value="url"
                                :rules="[v => !!v || 'This field is required']"
                                label="Figurita"
                                color="var(--gold)"
                                required
                                outlined
                                return-object
                                :disabled="disabled == 1"
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
                                        :disabled="disabled == 1"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="6">
                                    <h4 class="text-caption font-italic" style="color: #999;">Precio medio de mercado:</h4>
                                    <v-chip small color="var(--gold)" text-color="white" v-if="player">
                                        25 FutCoins
                                    </v-chip>
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

                                <v-btn :disabled="!valid" text rounded color="var(--gold)" @click="validate">
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
                                                    <v-img src="../assets/persona.jpg" />
                                                </v-avatar>
                                            </v-col>
                                            <v-col class="col-lg-6 pl-2">
                                                <h3 class="text-subtitle-1">Nombre del utilizador</h3>
                                            </v-col>
                                            <v-col class="col-lg-4 text-right">
                                                <v-rating value="4.5" half-increments color="var(--gold)" background-color="var(--gold)" size="18" dense readonly></v-rating>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-container class="d-flex align-end justify-end" style="height: 20%;">
                                        <v-btn x-large outlined rounded color="var(--indigo)">
                                            Swap
                                        </v-btn>
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
    import {
    getCurrentUser,
    getUserProfilePictureAsync,
    } from "../backend/users";
    import NavBar from "../components/NavBar.vue";
    import FooterBar from "../components/FooterBar.vue";
    
    export default {
        data: () => ({
            isLoading: true,
            name: null,
            address: null,
            profilePictureUrl: null,

            valid: true,
            equipo: null,
            player: null,
            price: null,
            checkbox: false,
            disabled: 1,
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
            source: String,
        },
        mounted() {
            // Empiezo a buscar el dato a la API. Esta tarea queda corriendo en el fondo.
            this.loadData();
            this.loadProfilePicture();
        },
        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },

            async loadData() {
                try {
                    const user = getCurrentUser();
                    this.name = user.displayName;
                } finally {
                    // Haya pasado lo que haya pasado, pongo esto en false para indicar que ya no estoy cargando más.
                    this.isLoading = false;
                }
            },

            async loadProfilePicture() {
                this.isLoadingProfileUrl = true;
                try {
                    this.profilePictureUrl = await getUserProfilePictureAsync(getCurrentUser().uid);
                } finally {
                    this.isLoadingProfileUrl = false;
                }
            },
        },
        components: { NavBar, FooterBar },
        };
</script>