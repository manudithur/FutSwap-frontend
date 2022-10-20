<!-- COLORS
Light Blue: #B2D8FF
Indigo Blue: #5779B2
Dark Blue: #3E4D7C
Gold: #E6BF3F
Silver: #666666 -->

<template>
  <v-app id="inspire" class="transparent">
    <NavBar />
    <v-main class="content align-center py-4">
      <v-container
        class="elevation-1 pt-0 align-center"
        style="background-color: white; border-radius: 4px"
      >
        <v-row>
          <v-card width="100%">
            <v-img
              class="align-center"
              style="border-radius: 4px 4px 0 0"
              :aspect-ratio="5"
              src="../assets/banner4.jpg"
              gradient="to top right, rgba(62,77,124,0.3), rgba(62,77,124,0.6)"
            >
              <v-card-title class="justify-center text-uppercase">
                <h1 class="h1">Mis Swaps</h1>
              </v-card-title>
            </v-img>
          </v-card>
        </v-row>
        <v-row class="pa-4 pt-8">
          <v-data-table
            style="width: 100%"
            :headers="headers"
            :items="swaps"
            sort-by="date"
            sort-desc
          >
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
                    <v-btn color="#3E4D7C" text @click="close"> Cancel </v-btn>
                    <v-btn color="#3E4D7C" text @click="save"> Save </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogReport" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6 justify-center"
                    >Seguro que quieres denunciar a este usuario?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#3E4D7C" text @click="closeReport"
                      >Cancelar</v-btn
                    >
                    <v-btn color="#3E4D7C" text @click="ReportConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.name="{ item }">
              <v-row class="d-flex align-center">
                <img class="mx-4 avtr" :src="item.img" />
                {{ item.name }}
              </v-row>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-row>
                <v-col class="col-md-3">
                  <v-icon
                    small
                    class="mx-1"
                    v-if="item.status == 'En curso'"
                    @click="editItem(item)"
                  >
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
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<style scoped>
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

export default {
  data: () => ({
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
    swaps: [],
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
  created() {
    this.initialize();
  },
  methods: {
    getColor(status) {
      if (status == "Cancelado") return "error";
      else if (status == "Pendiente") return "warning";
      else if (status == "En curso") return "info";
      else if (status == "Terminado") return "success";
      else return "#9ea7ad";
    },
    initialize() {
      this.swaps = [
        {
          name: "Nestor",
          img: require("../assets/persona1.jpeg"),
          date: "2022/10/08",
          status: "En curso",
          recibo: 5,
          doy: 3,
        },
        {
          name: "Cristian",
          img: require("../assets/persona2.jpg"),
          date: "2022/10/07",
          status: "Cancelado",
          recibo: 1,
          doy: 2,
        },
        {
          name: "Miguel",
          img: require("../assets/persona3.jpg"),
          date: "2022/10/06",
          status: "En curso",
          recibo: 13,
          doy: 6,
        },
        {
          name: "Jony",
          img: require("../assets/persona4.jpg"),
          date: "2022/10/05",
          status: "Terminado",
          recibo: 29,
          doy: 11,
        },
        {
          name: "Esequiel",
          img: require("../assets/persona5.webp"),
          date: "2022/10/04",
          status: "Pendiente",
          recibo: 100,
          doy: 39,
        },
        {
          name: "Ricardo",
          img: require("../assets/persona6.webp"),
          date: "2022/10/03",
          status: "Pendiente",
          recibo: 94,
          doy: 25,
        },
        {
          name: "Nestor",
          img: require("../assets/persona1.jpeg"),
          date: "2022/10/02",
          status: "En curso",
          recibo: 5,
          doy: 3,
        },
        {
          name: "Cristian",
          img: require("../assets/persona2.jpg"),
          date: "2022/10/01",
          status: "Cancelado",
          recibo: 1,
          doy: 2,
        },
        {
          name: "Miguel",
          img: require("../assets/persona3.jpg"),
          date: "2022/09/30",
          status: "En curso",
          recibo: 13,
          doy: 6,
        },
        {
          name: "Jony",
          img: require("../assets/persona4.jpg"),
          date: "2022/09/29",
          status: "Terminado",
          recibo: 29,
          doy: 11,
        },
        {
          name: "Esequiel",
          img: require("../assets/persona5.webp"),
          date: "2022/09/28",
          status: "Pendiente",
          recibo: 100,
          doy: 39,
        },
        {
          name: "Ricardo",
          img: require("../assets/persona6.webp"),
          date: "2022/09/27",
          status: "Pendiente",
          recibo: 94,
          doy: 25,
        },
      ];
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