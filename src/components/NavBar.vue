<template>
    <v-app-bar app height="72px" class="white" elevate-on-scroll>
        <v-toolbar-title>
            <router-link to="/explorar" style="text-decoration: none;">
                <v-img lazy-src="" max-height="56" max-width="108" src="../assets/FutSwap.png"></v-img>
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-for="item in menuItems" :key="item.title" :to="item.path" text>
                {{ item.title }}
            </v-btn>
            <v-btn text to="/profile"><v-icon>mdi-account</v-icon></v-btn>
            <v-btn v-if="!loading" text :href="generateUrl()" target="_blank">
                <v-row class="pr-2 d-flex align-center" style="border-radius: 40px; border: solid 1px #EEE; height: 40px; background-color: #F8F8F8;">
                    <v-container class="d-flex align-center" style="border-radius: 38px; border: solid 1px #EEE; width:38px; height: 38px; background-color: white;">
                        <v-icon class="pl-1">mdi-wallet</v-icon>
                    </v-container>
                    <h2 class="d-flex align-center justify-center font-weight-light" style="color:#333; font-size: 14px"><v-icon style="color:var(--gold);" size="20">mdi-currency-usd</v-icon>{{this.coins}} FTC</h2>
                </v-row>
            </v-btn>
            <v-btn v-if="loading" text>
                <v-row class="pr-2 d-flex align-center" style="border-radius: 40px; border: solid 1px #EEE; height: 40px; background-color: #F8F8F8;">
                    <v-container class="d-flex align-center" style="border-radius: 38px; border: solid 1px #EEE; width:38px; height: 38px; background-color: white;">
                        <v-icon class="pl-1">mdi-wallet</v-icon>
                    </v-container>
                    <h2 class="d-flex align-center justify-center font-weight-light" style="color:#333; font-size: 14px"><v-icon style="color:var(--gold);" size="20">mdi-currency-usd</v-icon></h2>
                </v-row>
            </v-btn>
            <v-btn text @click="logout">
                <v-icon rightdark>
                    logout
                </v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import router from '../router/index'
import {getAuth, signOut } from 'firebase/auth'
import { getCurrentUser } from '@/backend/users';
import { getUserCoinsAsync } from '@/backend/coins'

export default {
    name: 'NavBar',
    data: () => ({
      loading: true,
        menuItems: [
            { title: 'Explorar', path: '/explorar' },
            { title: 'Market', path: '/market' },
            { title: 'Inventario', path: '/collection' },
            { title: 'Swaps', path: '/swaps' },
        ],
        coins: 0, 
        uid: null
    }),
    mounted(){
        this.loadData()
    },  
    methods:{
        logout: async function() {
            const auth = getAuth();
            signOut(auth);
            router.push('/landing');
        },
        async loadData(){
            try{
                this.loading = true;
                var user = await getCurrentUser()
                this.uid = user.uid
                var coins = await getUserCoinsAsync(user.uid)
                this.coins = coins
            } finally{
                this.loading = false
            }
        },
        generateUrl(){
            return "https://futswap-3e255.web.app/?uid=" + this.uid
        },
        async test(){
            alert(this.uid)
        }
    }

}
</script>
