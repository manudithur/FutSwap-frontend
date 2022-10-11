<template>
    <v-app-bar app height="85%">
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
            <v-btn flat @click="logout">
                <v-icon rightdark>
                    logout
                </v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { signOutAsync } from '../backend/users';
import router from '../router';
const auth = getAuth();

export default {
    name: 'NavBar',
    data: () => ({
        loading: false,
        progress: 25,
        form: {
            name: auth.currentUser.displayName,
            contactEmail: auth.currentUser.email,
            phone: auth.currentUser.phoneNumber,
        },
        step: 1,
        appTitle: 'FutSwap',
        menuItems: [
            { title: 'Explorar', path: '/explorar' },
            { title: 'Inventario', path: '/collection' },
            {title: 'Swaps', path:'/swaps'},
            { title: auth.currentUser.email, path: '/profile' },
        ],
        isSelecting: false,
        selectedFile: null
    }),
    methods: {
        logout: async function() {
            signOutAsync();
            router.push('/landing');
        }
    }
}
</script>