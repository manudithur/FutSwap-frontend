<template>
    <v-app-bar app height="85%" v-if="!loading">
        <v-toolbar-title>
            <router-link to="/explorar" style="text-decoration: none;">
                <v-img lazy-src="" max-height="100" max-width="130" src="../assets/FutSwap.png">
                </v-img>
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                {{ item.title }}
            </v-btn>
            <v-btn flat to="/profile">{{email}}</v-btn>
            <v-btn flat @click="logout">
                <v-icon rightdark>
                    logout
                </v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { getCurrentUser, signOutAsync } from '../backend/users';

export default {
    name: 'NavBar',
    data: () => ({
        loading: true,
        email: null,
        menuItems: [
            { title: 'Explorar', path: '/explorar' },
            { title: 'Inventario', path: '/collection' },
            { title: 'Swaps', path: '/swaps' },
        ],
    }),
    methods: {
        logout: async function() {
            signOutAsync();
        },
        load: async function(){
            this.loading = true
            try {
                const user = await getCurrentUser();
                this.email = user.email;
            } finally {
                // Haya pasado lo que haya pasado, pongo esto en false para indicar que ya no estoy cargando más.
                this.loading = false;
            }
        },
        getEmail: async function(){
            return await getCurrentUser().email
        }
    },
    mounted() {
        this.load();
    },
}
</script>