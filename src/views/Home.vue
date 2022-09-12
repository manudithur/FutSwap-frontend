<template>
  <v-img src="../assets/fondo.png">
    <v-app-bar app height="85%">
      <v-toolbar-title>
        <router-link to="/landing">
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
        <v-container class="fill-height" fluid style="max-width:1500px;">
          <v-row class="center" justify="center" >
            <v-col cols="14" sm="8" md="8">
              <v-card>
                <v-window v-model="step" vertical>
                  <v-window-item :value="1" >
                    <v-row>
                      <v-col cols="14" md="7">
                        <v-card-text class="mt-auto pa-5">
                          <h1 class="text-center display-2 font-weight-bold blue--text text--darken-4 pa-5">Ingresa a tu cuenta</h1>
                          <v-form>
                            <v-text-field
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="blue darken-4"
                            />
                            <v-text-field
                              id="password"
                              label="Contraseña"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="blue darken-4"
                            />
                          </v-form>
                          <a href="#" class="text-decoration-underline text-center">Olvidaste tu contraseña?</a>
                          <router-link to="/explorar">
                            <div class="text-center mt-10">
                              <v-btn rounded color="blue darken-4" dark>INGRESAR</v-btn>
                            </div>
                         </router-link>

                        </v-card-text>
                      </v-col>
                      <v-col cols="14" md="5" class="blue darken-4">
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
                      <v-col cols="14" md="7" >
                        <v-card-text class="mt-auto">
                          <h1 class="text-center display-2 blue--text text--darken-4 font-weight-bold pa-5">¡Bienvenido!</h1>
                          <v-form>
                            <v-text-field
                              label="Nombre"
                              name="Name"
                              prepend-icon="person"
                              type="text"
                              color="blue darken-4"
                            />
                            <v-text-field
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="blue darken-4"
                            />

                            <v-text-field
                              id="password"
                              label="Contraseña"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="blue darken-4"
                            />
                          </v-form>
                        </v-card-text>
                        <div class="text-center mt-n5 pa-5">
                          <v-btn rounded color="blue darken-4" dark>Crear Cuenta</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="14" md="5" class="blue darken-4">
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
<style>
  html {
    overflow: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  html::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  </style>

<script>
export default {
  data: () => ({
    step: 1,
    appTitle: 'FutSwap',
  }),
  props: {
    source: String
  },
};

</script>