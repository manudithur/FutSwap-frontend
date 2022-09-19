<template>
    <v-img src="../assets/fondo.png">
      <v-app-bar app height="85%">
        <v-toolbar-title>
          <router-link to="/landing" style="text-decoration: none;">
            <v-img
              lazy-src=""
              max-height="100"
              max-width="130"
              src="../assets/FutSwap.png">
          </v-img>
          </router-link>
        </v-toolbar-title>
      </v-app-bar>
      <v-app id="inspire" class="transparent mt-n11">
        <v-content>
          <v-container class="fill-height mt-n7" fluid style="max-width:1500px;">
            <v-row class="justify-center mt-n7" justify="center" >
              <v-col class="justify-center mt-n7" cols="10" sm="6" md="6">
                <v-card class="justify-center">
                    <v-card-text class="pa-5 justify-center" >
                        <h1 class="text-center display-2 font-weight-bold blue--text text--darken-4 pa-5">Reestablecer Contraseña</h1>
                        <v-form>
                          <v-text-field
                            label="Email"
                            v-model="REmail"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="blue darken-4"
                          />
                        </v-form>
                        <div class="text-center mt-10">
                           <v-btn rounded color="blue darken-4" dark @click="resetPass">REESTABLECER</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
      </v-content>
    </v-app>
    </v-img>
  </template>

  <style>
    html {
      overflow: hidden;
      scrollbar-width: none !important;
      -ms-overflow-style: none;
    }
    
    html::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  </style>
  
  <script>
 import { getAuth, sendPasswordResetEmail } from "firebase/auth";
    import router from '../router/index';
    import Swal from 'sweetalert2'
export default {
  data: () => ({
    step: 1,
    appTitle: 'FutSwap',
  }),

  props: {
    source: String
  },

  methods: {
    resetPass: async function () {
      const email = this.REmail;
      const auth = getAuth();
      try {
        await sendPasswordResetEmail(auth, email);
        await Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Revisar correo electronico',
          showConfirmButton: true,
        });
        await router.push('/')
      } catch {
        await Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email invalido',
          text: 'No se encontro una cuenta asociada al email',
          showConfirmButton: true,
        });
      }
    }
  },
};
  </script>