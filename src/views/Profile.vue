<template>
    <v-img src="../assets/fondo.png">
        <v-app-bar app height="85%">
            <v-toolbar-title>
                <router-link to="/landing" style="text-decoration: none;">
                    <v-img lazy-src="" max-height="100" max-width="130" src="../assets/FutSwap.png">
                    </v-img>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                    {{ item.title }}
                    <v-icon dark>
                        {{item.logo}}
                    </v-icon>
                </v-btn>
                <v-btn flat @click="logout">
                    Cerrar Sesion
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-app id="inspire" class="transparent" style="overflow-y: scroll;">
            <div class="container">
                <div class="row pa-5">
                    <v-container fluid>
                        <v-card>
                            <v-card-text>
                                <v-flex class="mb-4">
                                    <v-avatar size="96" class="mr-4">
                                        <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'"
                                            alt="Avatar">
                                    </v-avatar>
                                    <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                                </v-flex>
                                <v-text-field v-model="form.firstName" label="FirstName"></v-text-field>
                                <v-text-field v-model="form.lastName" label="Last Name"></v-text-field>
                                <v-text-field v-model="form.contactEmail" label="Email Address"></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" @click.native="update">
                                    <v-icon left dark>check</v-icon>
                                    Save Changes
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <avatar-picker v-model="showAvatarPicker" :current-avatar="form.avatar"
                            @selected="selectAvatar"></avatar-picker>
                    </v-container>
                </div>
            </div>
        </v-app>
    </v-img>
</template>

<style scoped>
.card-product {
    border-radius: 10px;
    border-color: #333;
}

.card-product .img-wrap {
    border-radius: 3px 3px 0 0;
    border-color: black;
    position: relative;
    overflow: hidden;
    height: 220px;
    text-align: center;
}

.card-product .img-wrap img {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    object-fit: cover;
}

.card-product .info-wrap {
    overflow: hidden;
    padding: 15px;
    border-top: 1px solid #eee;
}

.card-product .bottom-wrap {
    padding: 15px;
    border-top: 1px solid #eee;
}

.label-rating {
    margin-right: 10px;
    color: #333;
    display: inline-block;
    vertical-align: middle;
}

.card-product .price-old {
    color: #999;
}

html {
    overflow: visible;
    -ms-overflow-style: none;
}
</style>

<script> 
import { getAuth } from 'firebase/auth'
import router from '../router/index';
import { signOut } from "firebase/auth";
const auth = getAuth();

export default {
  data: () => ({
    loading: false,
    form: {
      firstName: 'John',
      lastName: 'Doe',
      contactEmail: 'john@doe.com',
      avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
    },
    showAvatarPicker: false,
    step: 1,
    appTitle: 'FutSwap',
    menuItems: [
      {title: 'Explorar', path: '/explorar'},
      {title: auth.currentUser.email, path: ''},
    ],
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,

  }),

  props: {
    source: String
  },

  methods: {
    logout: async function () {
      const auth = getAuth();
      await signOut(auth);
      await router.push('/landing');
    },
  }
};
</script>