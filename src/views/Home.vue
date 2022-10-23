<template>
  <v-app id="inspire" class="transparent mt-n11">
    <v-app-bar app height="85%">
      <v-toolbar-title>
        <router-link to="/landing" style="text-decoration: none">
          <v-img
            lazy-src=""
            max-height="100"
            max-width="130"
            src="../assets/FutSwap.png"
          >
          </v-img>
        </router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main class="content align-center">
      <v-container class="fill-height mt-n11" fluid style="max-width: 1500px">
        <v-row class="center" justify="center">
          <v-col cols="14" sm="8" md="8">
            <v-card>
              <v-window v-model="step" vertical>
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="14" md="7">
                      <v-card-text class="mt-auto pa-5">
                        <h1
                          class="text-center display-2 font-weight-bold pa-5"
                          style="color: rgb(62, 77, 124)"
                        >
                          Ingresa a tu cuenta
                        </h1>
                        <v-form>
                          <v-text-field
                            label="Email"
                            outlined
                            v-model="LEmail"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="rgb(230,191,63)"
                          />
                          <v-text-field
                            id="password"
                            label="Contraseña"
                            outlined
                            v-model="LPassword"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="rgb(230,191,63)"
                          />
                        </v-form>
                        <a
                          @click="resetPass"
                          class="text-decoration-underline text-center"
                          >Olvidaste tu contraseña?</a
                        >
                        <div class="text-center mt-10">
                          <v-btn
                            color="rgb(62,77,124)"
                            dark
                            @click="submitLogin"
                            >INGRESAR</v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-col>
                    <v-col
                      cols="14"
                      md="5"
                      style="background-color: rgb(62, 77, 124)"
                    >
                      <v-card-text class="white--text mt-auto">
                        <h1 class="text-center display-1 font-weight-mid">
                          ¿Sos nuevo?
                        </h1>
                        <h5 class="text-center">
                          Registrate ya y empeza a swapear!
                        </h5>
                        <div class="text-center pa-5">
                          <v-btn outlined dark @click="step++" class=""
                            >REGISTRAR</v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="14" md="7">
                      <v-card-text class="mt-auto">
                        <h1
                          class="text-center display-2 font-weight-bold pa-5"
                          style="color: rgb(62, 77, 124)"
                        >
                          ¡Bienvenido!
                        </h1>
                        <v-form>
                          <v-text-field
                            label="Nombre Completo"
                            outlined
                            v-model="RName"
                            :rules="[rules.required]"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="rgb(230,191,63)"
                            required
                          />
                          <v-text-field
                            label="Email"
                            outlined
                            v-model="REmail"
                            :rules="[rules.required, rules.email]"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="rgb(230,191,63)"
                            required
                          />
                          <v-text-field
                            id="password"
                            outlined
                            v-model="RPhone"
                            :rules="[rules.required, rules.cellphone]"
                            label="Telefono Celular"
                            name="password"
                            prepend-icon="phone"
                            type="text"
                            color="rgb(230,191,63)"
                            required
                          />
                          <v-text-field
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.counter, rules.passwordregex]"
                            id="password"
                            outlined
                            v-model="RPass"
                            label="Contraseña"
                            name="password"
                            prepend-icon="lock"
                            :type="show1 ? 'text' : 'password'"
                            hint="Minimum 8 characters and Maximum of 32, at least one uppercase letter, one lowercase letter, one number and one special character"
                            color="rgb(230,191,63)"
                            required
                          />
                          <v-file-input
                            v-model="RImg"
                            outlined
                            label="Foto de perfil"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 pa-5">
                        <v-btn
                          color="rgb(62,77,124)"
                          dark
                          v-bind:disable='!isDisabled'
                          @click="submitNewUser"
                          >Crear Cuenta</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col
                      cols="14"
                      md="5"
                      style="background-color: rgb(62, 77, 124)"
                    >
                      <v-card-text class="white--text mt-auto">
                        <h1 class="text-center display-1">
                          ¿Ya sos parte de FutSwap?
                        </h1>
                        <div class="text-center pa-5">
                          <v-btn outlined dark @click="step--" class="mb-5"
                            >Ingresar Nuevamente</v-btn
                          >
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
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import router from "../router/index";
import Swal from "sweetalert2";
import {
  deleteUserAsync,
  registerWithEmailAsync,
  signOutAsync,
  updateUserProfileAsync,
  signInWithEmailAsync,
  getCurrentUser,
} from "../backend/users";
import FooterBar from "../components/FooterBar.vue";

export default {
  data: () => ({
    step: 1,
    show1: false,
    appTitle: "FutSwap",
    rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 32 || 'Max 32 characters',
          passwordregex: value => {
            const patternpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ //Patern Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
            return patternpass.test(value) || 'Invalid password.'
          },
          cellphone: value => {
            const patterncell = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d| 2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/
            return patterncell.test(value) || 'Invalid Cellphone Number.'
          } ,
          cellphone2: value => {
            const patterncell2 = /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/
            return patterncell2.test(value) || 'Invalid Cellphone Number.'
          },
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        }
  }),
 computed: {
        isDisabled() {
        return this.password.length > 0;
    }
  },
  props: {
    source: String,
  },
  methods: {
    submitLogin: async function () {
      const lemail = this.LEmail;
      const lpassword = this.LPassword;
      try {
        const currentUser = await signInWithEmailAsync(lemail, lpassword);
        if (!currentUser.user.emailVerified) {
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Email no fue verificado",
            text: "Por favor revisar casilla de correo y volver a ingresar",
            showConfirmButton: true,
          });
          await signOutAsync();
        } else {
          await router.push("/explorar");
        }
      } catch (error) {
        if (error.code !== "") {
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Contrasena/email incorrectos",
            text: "Verifica que los datos ingresados son correctos",
            showConfirmButton: true,
          });
        }
      }
    },
    submitNewUser: async function () {
      const email = this.REmail;
      const password = this.RPass;
      await registerWithEmailAsync(email, password);
      try {
        const curruser = getCurrentUser();
        updateUserProfileAsync(this.RName, "");
        const string =
          "Se envio a: " +
          curruser.email +
          "\n un email para verificar tu cuenta";
        Swal.fire({
          position: "center",
          icon: "info",
          title: string,
          text: "Aguarde y sera redirigido",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        setTimeout(function () {
          location.reload();
        }, 4000);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Password is too weak",
            showConfirmButton: false,
            confirmButtonColor: "#3e4d7c",
          });
        } else if (errorCode === "auth/email-already-in-use") {
          await Swal.fire({
            position: "center",
            icon: "info",
            title: "Email is already taken",
            showConfirmButton: false,
          });
        } else {
          await deleteUserAsync();
          await Swal.fire({
            position: "center",
            icon: "info",
            title: errorMessage,
            showConfirmButton: false,
          });
        }
      }
    },
    resetPass: function () {
      router.push("./resetPass");
    },
  },
  components: { FooterBar },
};
</script>