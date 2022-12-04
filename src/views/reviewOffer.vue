<template>
  <v-app>
    <NavBar />
    <v-main class="content">
      <v-container class="align-center pt-10" v-if="(!isLoading && !error)">
        <v-card>
          <v-row class="justify-center">
            <v-card-title class="text-center">
              <h1
                class="display-2 font-weight-bold pt-5"
                style="color: rgb(62, 77, 124)"
              >
                REVISAR OFERTA
              </h1>
            </v-card-title>
          </v-row>
          <v-row class="justify-center pt-2">
            <v-col cols="5">
              <v-card class="pt-5" elevation="0">
                <v-card-title class="text-center justify-center">
                  <h4
                    class="display-1 font-weight-regular pt-5"
                    style="color: rgb(62, 77, 124)"
                  >
                    RECIBIR
                  </h4>
                </v-card-title>
                <v-list>
                  <v-list-item-group multiple class="pa-5">
                    <template v-for="(tradeitem, i) in tradeitems" class="pa-5">
                      <v-divider
                        v-if="!tradeitem.name"
                        :key="`divider-${i}`"
                      ></v-divider>

                      <v-list-item
                        v-else
                        :key="`tradeitem-${i}`"
                        :value="tradeitem.name"
                        active-class="deep-blue--text text--accent-4"
                      >
                        <template v-slot:default="{ active }" class="grey pa-2">
                          <v-avatar size="70">
                            <v-img :src="tradeitem.img"> </v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title
                              v-text="tradeitem.name"
                            ></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              :input-value="tradeitem.status"
                              disabled
                              color="deep-blue accent-4"
                            ></v-checkbox>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="1" class="text-center">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col cols="5">
              <v-card class="pt-5" elevation="0">
                <v-card-title class="text-center justify-center">
                  <h4
                    class="display-1 font-weight-regular pt-5"
                    style="color: rgb(62, 77, 124)"
                  >
                    ENTREGAR
                  </h4>
                </v-card-title>
                <v-list>
                  <v-list-item-group multiple class="pa-5">
                    <template v-for="(myinv, i) in yourinventory" class="pa-5">
                      <v-divider
                        v-if="!myinv.name"
                        :key="`divider-${i}`"
                      ></v-divider>

                      <v-list-item
                        v-else
                        :key="`myinv-${i}`"
                        :value="myinv.name"
                        active-class="deep-blue--text text--accent-4"
                      >
                        <template v-slot:default="{ active }">
                          <v-avatar size="70">
                            <v-img :src="myinv.img"> </v-img>
                          </v-avatar>

                          <v-list-item-content class="pa-8">
                            <v-list-item-title
                              v-text="myinv.name"
                            ></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              :input-value="myinv.status"
                              disabled
                              color="deep-blue accent-4"
                            ></v-checkbox>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-card-actions class="justify-center pa-8">
              <v-btn
                large
                color="red"
                style="font-weight: bold"
                @click="rechazar"
              >
                <v-icon left dark>mdi-cancel</v-icon>
                RECHAZAR
              </v-btn>
              <v-btn
                large
                color="yellow"
                style="font-weight: bold"
                @click="contraoferta"
              >
                CONTRAOFERTA
              </v-btn>
              <v-btn
                large
                color="green"
                style="font-weight: bold"
                @click="aceptar"
              >
                ACEPTAR
                <v-icon right dark>mdi-check-bold</v-icon>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>

  <style>
.activeList {
  background-color: black;
  color: white;
}
</style>
  
  <script>
import router from "../router/index";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { getUserAllActiveSwapsAsync } from '@/backend/swaps';
import { getCurrentUser } from '@/backend/users';

export default {
  data: () => ({
    tradeitems: [],
    yourinventory: [],
    isLoading: true,
    error: false,
  }),
  props: {
    source: String,
  },
  mounted(){
    this.loadData()
  },
  methods: {

    // name: "ARG 5",
    // img: require("../assets/figus/arg05.jpg"),
    // status: 1,
    async loadData(){
      var toRet = []
      try{
        const swapId = this.$route.params.id
        const user = await getCurrentUser()
        const swaps = await getUserAllActiveSwapsAsync('qatar2022', user.uid)
        var swap = null
        for(var i = 0 ; i < swaps.length ; i++){
          if( swaps[i].id == swapId )
            swap = swaps[i]
        }
        if(swap == null){
          this.error = true
        } else{
          for(var j = 0 ; j < swap.figuCodesReceiver.length ; j++){
            const recibir = swap.figuCodesReceiver[j]
            var url = url = require("../assets/figuritas/" + recibir + ".jpg")
            toRet.push({ name: recibir, img: url, status: 1})
          }

          this.tradeitems = toRet
          toRet = []
          for(var k = 0 ; k < swap.figuCodesSender.length ; k++){
            const entregar = swap.figuCodesSender[k]
            var url2 = require("../assets/figuritas/" + entregar + ".jpg")
            toRet.push({ name: entregar, img: url2, status: 1})
          }
          this.yourinventory = toRet
        }
      } finally{
        this.isLoading = false
      }

    },  

    aceptar: async function () {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "OFERTA ACEPTADA",
        showConfirmButton: false,
        timer: 2000,
      });
      await router.push("/explorar");
    },
    rechazar: async function () {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "OFERTA RECHAZADA",
        showConfirmButton: false,
        timer: 2000,
      });
      await router.push("/explorar");
    },
  },
  components: { NavBar, FooterBar },
};
</script>