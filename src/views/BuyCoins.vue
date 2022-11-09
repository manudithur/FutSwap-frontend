<template>
    <v-app id="PostTradingSpace" class="transparent">
    <NavBar />
        <v-container class="align-center pt-10">
            <v-card>
                <v-row class="justify-center">
                    <v-card-title class="text-center">
                        <h1
                        class="display-2 font-weight-bold pt-5"
                        style="color: rgb(62, 77, 124)">
                            Tienda de Futcoins
                        </h1>
                        <h2
                        class="display-2 font-weight-bold pt-5"
                        style="color: rgb(62, 77, 124)"
                        >
                        Debajo se encuentran las distintas opciones de compra
                        </h2>
                    </v-card-title>
                </v-row>
                <v-row class="justify-left">
                    <v-col cols="5">
                    <v-list>
                        <v-list-item-group multiple class="pa-5">
                        <template v-for="(buyoption, i) in Paymentplans" class="pa-5">
                            <v-divider
                            v-if="!Paymentplans.name"
                            :key="`divider-${i}`"
                            ></v-divider>

                            <v-list-item
                            v-else
                            :key="`Paymentplans-${i}`"
                            :value="Paymentplans.name"
                            active-class="deep-blue--text text--accent-4"
                            >
                            <template v-slot:default="{ active }">
                                <v-list-item-content class="pa-8">
                                    <v-list-item-title
                                        v-text="Paymentplans.name"
                                    ></v-list-item-title>
                                    <v-btn
                                        elevation="2"
                                        rounded
                                        color="rgb(62,77,124)"
                                        style="color: blue"
                                        @click="payment"
                                        text
                                    >
                                        v-text = "Paymentplans.price"
                                    </v-btn>
                                </v-list-item-content>
                            </template>
                            </v-list-item>
                        </template>
                        </v-list-item-group>
                    </v-list>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    <FooterBar />
    </v-app>
</template>

<script>
import router from "../router/index";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";

export default {
  data: () => ({
    Paymentplans: [
      {
        name: "50 Futcoins",
        price: "U$D 5",
      },
      {
        name: "100 Futcoins",
        price: "U$D 10",
      },
      {
        name: "250 Futcoins",
        price: "U$D 25",
      },
      {
        name: "500 Futcoins + 50 bonus",
        price: "U$D 50",
      },
      {
        name: "1000 Futcoins + 150 bonus",
        price: "U$D 100",
      },
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    logout: async function () {
      signOutAsync();
      await router.push("/landing");
    },
  },
  components: { NavBar, FooterBar },
};
</script>