<template>
    <v-app>
        <NavBar/>
        <v-main class="bg fill-height">
            <v-container class="mb-8">
                <h1 class="text-h3 text-uppercase white--text font-weight-black"
                style="text-shadow: 0px 1px 4px #3E4D7C">Mis Swaps</h1>
            </v-container>
            <v-container class="mb-8 elevation-8" style="background-color: white; border-radius: 4px;" v-if="!isLoading">
                <!-- <v-row>
                    <v-card width="100%">
                        <v-img class="align-center" style="border-radius: 4px 4px 0 0;" :aspect-ratio="5" src="../assets/banner4.jpg"
                            gradient="to top right, rgba(62,77,124,0.3), rgba(62,77,124,0.6)">
                            <v-card-title class="justify-center text-uppercase">
                                <h1 class="h1">Mis Swaps</h1>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-row> -->
                <v-row class="pa-4">
                    <v-data-table style="width: 100%;" :headers="headers" :items="swaps" sort-by="date" sort-desc @click:row="handleClick">
                        <template v-slot:top>
                          <v-dialog v-model="dialog" max-width="500px">
                              <v-card>
                                  <v-card-title>
                                      <span class="text-h6">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                      <v-container>
                                          <v-row>
                                              <v-col class="col-md-12">
                                                  <v-select
                                                  v-model="editedItem.status"
                                                  :items="statuses"
                                                  label="Estado"
                                                  ></v-select>
                                              </v-col>
                                          </v-row>
                                      </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="var(--darkblue)" rounded text @click="close">
                                          Cancelar
                                      </v-btn>
                                      <v-btn color="var(--gold)" rounded text @click="save">
                                          Aplicar
                                      </v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-dialog>
                        <v-dialog v-model="dialogReport" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h6 justify-center">Seguro que quieres denunciar a este usuario?</v-card-title>
                                <v-card-actions class="justify-center">
                                    <v-btn color="var(--darkblue)" rounded text @click="closeReport">Cancelar</v-btn>
                                    <v-btn color="var(--gold)" rounded text @click="ReportConfirm">Denunciar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </template>
                        <template v-slot:item.name="{ item }">
                            <v-row class="d-flex align-center">
                                <img class="mx-4 avtr" :src="item.img">
                                {{ item.name }}
                            </v-row>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip :color="getColor(item.status)" dark>
                                {{ item.status }}
                            </v-chip>
                            <v-icon v-if="item.isNew" class="blue--text">
                              mdi-bell-alert
                            </v-icon>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-row>
                                <v-col class="col-md-3">
                                    <v-icon small class="mx-1" v-if="item.status == 'En curso'" @click="editItem(item)">
                                        mdi-check-bold
                                    </v-icon>
                                </v-col>
                                <v-col class="col-md-3">
                                    <v-icon small class="mx-1" @click="reportItem(item)">
                                        mdi-alert
                                    </v-icon>
                                </v-col>
                            </v-row>
                        </template>
                    </v-data-table>
                </v-row>
            </v-container>
        </v-main>
        <FooterBar/>
    </v-app>
</template>

<style>
:root {
  --darkblue: #3E4D7C;
  --indigo: #5779B2;
  --lightblue: #B2D8FF;
  --gold: #E6BF3F;
}

.bg {
  background-image: url("../assets/fondo.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.avtr {
  max-height: 32px;
  max-width: 32px;
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
}
.fig {
  font-size: 1.6rem;
  color: #3e4d7c;
}
.profile-pic {
  height: 180px;
  border-radius: 4px 4px 0 0;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  object-fit: cover;
}

.h1 {
  color: white;
  text-shadow: 0px 2px 16px black;
}

.h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #3e4d7c;
}

.h3 {
  font-size: 0.95rem;
  font-weight: 300;
  color: #000;
}

.h4 {
  font-size: 1.6rem;
  font-weight: 300;
}

subtitle-1 {
  font-size: 0.7rem;
  font-weight: 300;
  color: #999;
}

.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.005);
}
</style>

<script>
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { getCurrentUser } from '@/backend/users';
import { getUserReceivedActiveSwapsAsync, getUserSentActiveSwapsAsync } from '@/backend/swaps';
import { getUserProfilePictureAsync, getUserPublicProfileAsync } from "../backend/users";
import router from "../router";
import Swal from "sweetalert2";

export default {

  data: () => ({
    isLoading: true,
    dialog: false,
    dialogReport: false,
    headers: [
      { text: "Vendedor", align: "start", sortable: false, value: "name" },
      { text: "Fecha (AAAA/MM/DD) ", value: "date" },
      { text: "Estado", value: "status" },
      { text: "Recibo", value: "recibo", sortable: false },
      { text: "Doy", value: "doy", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    statuses: ["En curso", "Terminado"],
    swaps: null,
    editedIndex: -1,
    editedItem: {
      name: "",
      date: 0,
      status: 0,
      recibo: 0,
      doy: 0,
    },
    defaultItem: {
      name: "",
      date: 0,
      status: 0,
      recibo: 0,
      doy: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New Item"
        : "Quieres actualizar el estado de este swap?";
    },
  },

  props: {
    source: String,
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogReport(val) {
      val || this.closeReport();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    getColor(status) {
      if (status == "NUEVA OFERTA") return "blue";
      if (status == "ESPERANDO RESPUESTA") return "orange";
      else return "#9ea7ad";
    },

    handleClick(value) {
      if(value.status != "ESPERANDO RESPUESTA")
        router.push("/reviewOffer/" + value.id)
      else{
        Swal.fire({
        position: 'center',
        icon: 'warning',
        title: value.status,
        showConfirmButton: false,
        timer: 1000
      })
      }
    },

    test(){
      alert(this.swaps[0].status)
    },

    async initialize() {
        // {
        //   name: "Nestor",
        //   img: require("../assets/persona1.jpeg"),
        //   date: "2022/10/08",
        //   status: "En curso",
        //   recibo: 5,
        //   doy: 3,
        // },
        try{
          const user = await getCurrentUser();
          var userImg = null
          const receivedSwapsRet = await getUserReceivedActiveSwapsAsync('qatar2022', user.uid) 
          var toRet = []

          for(var i = 0 ; i < receivedSwapsRet.length ; i++ ){
            var uid = receivedSwapsRet[i].uidSender
            var publicData = await getUserPublicProfileAsync(uid)
            userImg = null
            userImg = await getUserProfilePictureAsync(uid)
            if(!userImg){
              userImg = require("../assets/empty-profile.jpg")
            }

            var isNew = false
            var status = receivedSwapsRet[i].status
            if(status == "PROPOSED"){
              status = "NUEVA OFERTA"
              isNew = true
            } else if(status == "ACCEPTED"){
              status = "ACEPTADO"
            }
              

            toRet.push({
              id: receivedSwapsRet[i].id,
              name: publicData.displayName,
              img: userImg,
              date: receivedSwapsRet[i].createDate.toLocaleDateString("es-AR"),
              status: status,
              isNew: isNew,
              recibo: receivedSwapsRet[i].figuCodesSender.length,
              doy: receivedSwapsRet[i].figuCodesReceiver.length
            })
          }

          const sentSwapsRet = await getUserSentActiveSwapsAsync('qatar2022', user.uid)

          for(var j = 0 ; j < sentSwapsRet.length ; j++ ){
            var sentuid = sentSwapsRet[j].uidReceiver
            var sentPublicData = await getUserPublicProfileAsync(sentuid)
            var sentUserImg = await getUserProfilePictureAsync(sentuid)
          
            if(!sentUserImg){
              sentUserImg = require("../assets/empty-profile.jpg")
            }

            var sentStatus = sentSwapsRet[j].status
            if(sentStatus == "PROPOSED")
              sentStatus = "ESPERANDO RESPUESTA"

            toRet.push({
              id: sentSwapsRet[j].id,
              name: sentPublicData.displayName,
              img: sentUserImg,
              date: sentSwapsRet[j].createDate.toLocaleDateString("es-AR"),
              status: sentStatus,
              recibo: sentSwapsRet[j].figuCodesReceiver.length,
              doy: sentSwapsRet[j].figuCodesSender.length
            })

          }

        } finally{
          this.swaps = toRet
          this.isLoading = false
        }
    },

    editItem(item) {
      this.editedIndex = this.swaps.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    reportItem(item) {
      this.editedIndex = this.swaps.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogReport = true;
    },

    ReportConfirm() {
      this.closeReport();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeReport() {
      this.dialogReport = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.swaps[this.editedIndex], this.editedItem);
      } else {
        this.swaps.push(this.editedItem);
      }
      this.close();
    },

  },
  components: { NavBar, FooterBar },
};
</script>
