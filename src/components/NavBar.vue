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
            <v-btn v-if="!loading" flat to="/profile"><v-icon>mdi-account</v-icon></v-btn>
            <v-btn flat @click="logout">
                <v-icon rightdark>
                    logout
                </v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>


export default {
    name: 'NavBar',
    data: () => ({
        menuItems: [
            { title: 'Explorar', path: '/explorar' },
            { title: 'Inventario', path: '/collection' },
            { title: 'Swaps', path: '/swaps' },
        ],
    }),

}
</script>