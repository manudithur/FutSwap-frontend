<template>
  <v-app>
    <NavBar />
    <v-main class="content justify-center align-center">
      <v-container class="align-center justify-center pt-10" v-if="(!isLoading && !error)">
        <v-card class="pb-5">
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
                            <v-list-item-title size
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
          <v-row class="justify-center" v-if="(actions && !isAccepted)">
            <v-card-actions class="justify-center pa-8">
              <v-btn
                large
                color="red"
                style="font-weight: bold"
                @click="rechazarOferta"
              >
                <v-icon left dark>mdi-cancel</v-icon>
                RECHAZAR
              </v-btn>
              <!-- <v-btn
                large
                color="yellow"
                style="font-weight: bold"
                @click="contraoferta"
              >
                CONTRAOFERTA
              </v-btn> -->
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
        <v-row>
          <v-col cols="6">
          <v-container class="justify-center text-center">
            <v-card class="my-15 justify-center text-center align-center" v-if="(isAccepted)">
                <v-row class="justify-center pt-8">
                  <h1 style="color: rgb(62, 77, 124)">Información de contacto</h1>
                </v-row>
                <v-row class="align-center justify-center">
                    <v-col cols="2" class="align-center justify-center text-center">
                        <v-avatar circle size="80">
                            <v-img :src=url v-if="url"/>
                            <v-img src="../assets/empty-profile.jpg" v-if="!url" />
                        </v-avatar>
                    </v-col>
                    <v-col cols="3" class="align-center justify-center text-center">
                        <p style="font-size: 30px" class="align-center">{{ name }}</p>
                    </v-col>
                </v-row>
                <v-row class="justify-center pt-2 pb-8">
                  <p style="font-size: 25px"><v-icon class="px-3" size="30" color="var(--gold)">mdi-phone</v-icon> Telefono: {{phone}} </p>
                </v-row>
            </v-card>
          </v-container>
        </v-col>
        <v-col cols="6">
          <v-container class="justify-center text-center">
            <v-card class="my-15 justify-center text-center align-center" v-if="(isAccepted)">
                <v-row class="justify-center pt-8">
                  <h1 style="color: rgb(62, 77, 124)">Calificar</h1>
                </v-row>
                <v-row class="align-center justify-center pb-5">
                  <v-col cols="3">
                    <v-rating
                      background-color="grey lighten-1"
                      color="warning"
                      empty-icon="mdi-star-outline"
                      full-icon="mdi-star"
                      hover
                      length="5"
                      size="40"
                      v-model="rating"
                    ></v-rating>
                  </v-col>
                  <v-col cols="3" class="mx-9 my-9">
                    <v-btn color="rgb(62,77,124)" style="color: white" :loading="isSavingProfile" @click="submitReview">
                        <v-icon dark>mdi-send</v-icon>
                      </v-btn>
                  </v-col>
                </v-row>
            </v-card>
          </v-container>
        </v-col>
        </v-row>        
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
import { getUserAllActiveSwapsAsync, acceptSwapAsync, rejectSwapAsync} from '@/backend/swaps';
import { getCurrentUser } from '@/backend/users';
import { getUserProfilePictureAsync, getUserPublicProfileAsync } from "../backend/users";
import { rateUserOnSwapAsync } from '@/backend/swaps';

export default {
  data: () => ({
    tradeitems: [],
    yourinventory: [],
    isLoading: true,
    error: false,
    isAccepted: false,
    actions: false,
    name: null,
    url: null,
    phone: null,
    status: "",
    rating: 0,
    id: null,
  }),
  props: {
    source: String,
  },
  mounted(){
    this.loadData()
  },
  methods: {

    async submitReview(){
      var error = false
      try{
        await rateUserOnSwapAsync("qatar2022", this.id, this.rating)
        alert(this.rating)
      } catch(e){
        error = true
        await Swal.fire({
            position: 'center',
            icon: 'error',
            title: e.message,
            showConfirmButton: true,
        });
      } finally{ 
        if(!error){
          await Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Usuario Calificado",
              showConfirmButton: true,
          });
        }
      }

    },

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

          var status = swap.status
          if(status == "PROPOSED" && swap.uidSender != user.uid){
            status = "NUEVA OFERTA"
            this.actions = true
          } else if(status == "PROPOSED"){
            status = "ESPERANDO RESPUESTA"
          }
          else if(status == "ACCEPTED"){
            status = "ACEPTADO"
            // isAccepted: false,
            // name: null,
            // url: null,
            // phone: null
            this.isAccepted = true

            var uid = swap.uidSender
            if(user.uid == uid )
              uid = swap.uidReceiver

            var data = await getUserPublicProfileAsync(uid)
            this.name = data.displayName
            this.phone = data.phone
            var profileUrl = await getUserProfilePictureAsync(uid)
            this.url = profileUrl
          }

          this.status = status

          this.id = swap.id

          if(user.uid != swap.uidSender && swap.status != "ACCEPTED")
            this.actions = true

        }
      } finally{
        this.isLoading = false
      }

    },  

    getColor(status) {
      if (status == "NUEVA OFERTA") return "blue";
      if (status == "ESPERANDO RESPUESTA") return "orange";
      else return "#9ea7ad";
    },

    aceptar: async function () {
      var error = false
      try{
        await acceptSwapAsync('qatar2022', this.id)
      } catch (e){
        error = true
        await Swal.fire({
            position: "center",
            icon: "error",
            title: e.message,
            showConfirmButton: false,
            timer: 2000,
        });
      } finally{
        if(!error){
          await Swal.fire({
            position: "center",
            icon: "succes",
            title: "OFERTA ACEPTADA",
            showConfirmButton: false,
            timer: 2000,
          });
          await router.push("/swaps");
        }
      }

    },
    rechazarOferta: async function () {
      var error = false
      try{
        await rejectSwapAsync('qatar2022', this.id)
      } catch (e){
        error = true;
        await Swal.fire({
            position: "center",
            icon: "error",
            title: e.message,
            showConfirmButton: false,
            timer: 2000,
        });
      } finally{
        if(!error){
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "OFERTA RECHAZADA",
            showConfirmButton: false,
            timer: 2000,
          });
          await router.push("/swaps");
        }
      }
    },
  },
  components: { NavBar, FooterBar },
};
</script>