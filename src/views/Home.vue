<template>
  <v-img src="../assets/fondo.png">
    <v-app-bar app height="85%">
      <v-toolbar-title>
        <router-link to="/landing" style="text-decoration: none;">
          <v-img lazy-src="" max-height="100" max-width="130" src="../assets/FutSwap.png">
          </v-img>
        </router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-app id="inspire" class="transparent mt-n11">
      <v-content>
        <v-container class="fill-height mt-n11" fluid style="max-width:1500px;">
          <v-row class="center" justify="center">
            <v-col cols="14" sm="8" md="8">
              <v-card>
                <v-window v-model="step" vertical>
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="14" md="7">
                        <v-card-text class="mt-auto pa-5">
                          <h1 class="text-center display-2 font-weight-bold pa-5" style="color: rgb(62,77,124)">Ingresa a tu
                            cuenta</h1>
                          <v-form>
                            <v-text-field label="Email" outlined v-model="LEmail" name="Email" prepend-icon="email" type="text"
                              color="rgb(230,191,63)" />
                            <v-text-field id="password" label="Contraseña" outlined v-model="LPassword" name="password"
                              prepend-icon="lock" type="password" color="rgb(230,191,63)" />
                          </v-form>
                          <a @click="resetPass" class="text-decoration-underline text-center">Olvidaste tu
                            contraseña?</a>
                          <div class="text-center mt-10">
                            <v-btn rounded color="rgb(62,77,124)" dark @click="submitLogin">INGRESAR</v-btn>
                          </div>
                        </v-card-text>
                      </v-col>
                      <v-col cols="14" md="5" style="background-color: rgb(62,77,124)">
                        <v-card-text class="white--text mt-auto">
                          <h1 class="text-center display-1 font-weight-mid">¿Sos nuevo?</h1>
                          <h5 class="text-center">Registrate ya y empeza a swapear!</h5>
                          <div class="text-center pa-5">
                            <v-btn rounded outlined dark @click="step++" class="">REGISTRAR</v-btn>
                          </div>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-window-item>
                  <v-window-item :value="2">
                    <v-row class="fill-height">
                      <v-col cols="14" md="7">
                        <v-card-text class="mt-auto">
                          <h1 class="text-center display-2 font-weight-bold pa-5" style="color: rgb(62,77,124)">¡Bienvenido!
                          </h1>
                          <v-form>
                            <v-text-field label="Nombre Completo" outlined v-model="RName" name="Name" prepend-icon="person" type="text"
                              color="rgb(230,191,63)"/>
                            <v-text-field label="Email" outlined v-model="REmail" name="Email" prepend-icon="email" type="text"
                              color="rgb(230,191,63)" />
                            <v-text-field id="password" outlined v-model="RPhone" label="Telefono Celular" name="password"
                              prepend-icon="phone" type="text" color="rgb(230,191,63)" />
                            <v-text-field id="password" outlined v-model="RPass" label="Contraseña" name="password"
                              prepend-icon="lock" type="password" color="rgb(230,191,63)" />
                          </v-form>
                        </v-card-text>
                        <div class="text-center mt-n5 pa-5">
                          <v-btn rounded color="rgb(62,77,124)" dark @click="submitNewUser">Crear Cuenta</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="14" md="5" style="background-color: rgb(62,77,124)">
                        <v-card-text class="white--text mt-auto">
                          <h1 class="text-center display-1">¿Ya sos parte de FutSwap?</h1>
                          <div class="text-center pa-5">
                            <v-btn rounded outlined dark @click="step--" class="mb-5">Ingresar Nuevamente</v-btn>
                          </div>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </v-img>
</template>

<script>
import router from '../router/index';
import Swal from 'sweetalert2';
import { deleteUserAsync, registerWithEmailAsync, signOutAsync, updateUserProfileAsync, signInWithEmailAsync, getCurrentUser } from "../backend/users";

export default {
  data: () => ({
    step: 1,
    appTitle: 'FutSwap',
  }),

  props: {
    source: String
  },

  methods: {
    submitLogin: async function () {
      const lemail = this.LEmail;
      const lpassword = this.LPassword;

      try {
        const currentUser = await signInWithEmailAsync(lemail, lpassword);
        if (!currentUser.user.emailVerified) {
          await Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Email no fue verificado',
            text: 'Por favor revisar casilla de correo y volver a ingresar',
            showConfirmButton: true,
          });
          await signOutAsync();
        } else {
          await router.push('/explorar');
        }
      } catch (error) {
        if (error.code !== '') {
          await Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Contrasena/email incorrectos',
            text: 'Verifica que los datos ingresados son correctos',
            showConfirmButton: true,
          })
        }
      }
    },

    submitNewUser: async function () {
      const email = this.REmail;
      const password = this.RPass;
      await  registerWithEmailAsync(email, password);
      try {
        const curruser = getCurrentUser();
        updateUserProfileAsync(this.RName, '')
        const string = "Se envio a: " + curruser.email + "\n un email para verificar tu cuenta";
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: string,
          text:"Aguarde y sera redirigido",
          allowOutsideClick: false, 
          showConfirmButton: false,
        });
        setTimeout(function () {
          location.reload();
        }, 4000);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          await Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Password is too weak',
            showConfirmButton: false,
            confirmButtonColor: '#3e4d7c',
          });
        } else if (errorCode === 'auth/email-already-in-use') {
          await Swal.fire({
            position: 'center',
            icon: 'info',
            title: "Email is already taken",
            showConfirmButton: false,
          });
        } else {
          await deleteUserAsync();
          await Swal.fire({
            position: 'center',
            icon: 'info',
            title: errorMessage,
            showConfirmButton: false,
          });
        }
      }
    },

    resetPass: function () {
      router.push('./resetPass');
    }

  }
};
</script>