<template>
    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="100%">
      <v-app-bar app>
        <v-toolbar-title>
            <router-link to="/landing">
          <v-img
            lazy-src=""
            max-height="100"
            max-width="130"
            src="../assets/FutSwap.png">
        </v-img></router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          {{ item.title }}
        </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    <v-app id="inspire" class="transparent">
    <div>
        <div class="feature1-component mini-spacer">
        <v-container>
            <!-- -----------------------------------------------
                Start Feature 1 Text
            ----------------------------------------------- -->
            <v-row justify="center">
            <v-col cols="12" md="10" lg="7">
                <div class="text-center">
                <v-chip small color="error" text-color="white">
                    Feature 1
                </v-chip>
                <h2 class="section-title font-weight-medium">
                    Awesome with Extra Ordinary Flexibility
                </h2>
                <p>
                    You can relay on our amazing features list and also our customer
                    services will be great experience for you without doubt and in
                    no-time
                </p>
                </div>
            </v-col>
            </v-row>

            <!-- -----------------------------------------------
                End Feature 1 Text
            ----------------------------------------------- -->
            <!-- -----------------------------------------------
                Start Feature 1
            ----------------------------------------------- -->
            <v-row justify="center" class="mt-13">
            <v-col cols="12" md="6">
                <v-card elevation="0">
                <v-card-text>
                    <div class="icon-round bg-light-info">
                    <i class="mdi mdi-star"></i>
                    </div>
                    <h5 class="font-weight-medium font-18">Instant Solutions</h5>
                    <p class="mt-10 mb-8">
                    You can relay on our amazing features list and also our
                    customer services will be great experience. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Praesent tristique
                    pellentesque ipsum.
                    </p>
                    <a
                    href="#"
                    class="
                        text-themecolor
                        linking
                        text-decoration-none
                        d-flex
                        align-center
                    "
                    >
                    Explore More <i class="mdi mdi-arrow-right"></i>
                    </a>
                </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card elevation="0">
                <v-card-text>
                    <div class="icon-round bg-light-info">
                    <i class="mdi mdi-check-circle"></i>
                    </div>
                    <h5 class="font-weight-medium font-18">Powerful Techniques</h5>
                    <p class="mt-10 mb-8">
                    You can relay on our amazing features list and also our
                    customer services will be great experience. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Praesent tristique
                    pellentesque ipsum.
                    </p>
                    <a
                    href="#"
                    class="
                        text-themecolor
                        linking
                        text-decoration-none
                        d-flex
                        align-center
                    "
                    >
                    Explore More <i class="mdi mdi-arrow-right"></i>
                    </a>
                </v-card-text>
                </v-card>
            </v-col>
            </v-row>

            <!-- -----------------------------------------------
                End Feature 1
            ----------------------------------------------- -->
        </v-container>
        </div>
    </div>
    </v-app>
    </v-parallax>
  </template>
  
  <script>
  export default {
    data: () => ({
      step: 1,
      appTitle: 'FutSwap',
        sidebar: false,
        menuItems: [
            {title: '¿Que es FutSwap?', path: '/about'},
            { title: 'Ingresar / Registrame', path: '/'},   
       ]
    }),
    props: {
      source: String
    },
  };
  
  </script>