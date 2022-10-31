<template>
    <v-app-bar app height="72px" class="white" elevate-on-scroll v-if="!loading">
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
            <v-btn v-if="!loading" text to="/profile"><v-icon>mdi-account</v-icon></v-btn>
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

export default {
    name: 'NavBar',
    data: () => ({
      loading: false,
        menuItems: [
            { title: 'Explorar', path: '/explorar' },
            { title: 'Inventario', path: '/collection' },
            { title: 'Swaps', path: '/swaps' },
        ],
    }),
    methods:{
        logout: async function() {
            const auth = getAuth();
            signOut(auth);
            router.push('/landing');
        },
    }

}
</script>
