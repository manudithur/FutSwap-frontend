<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
  .content{
  background: url("./assets/fondo.png") no-repeat center;
  background-size: cover;
  height: 100%;
  }
</style>

<script>

export default {
  name: 'App',
  components: {
    
  },

  data: () => ({
    //
  }),
};

import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT_zOxZNj2YOmXCBPZn78wgFa6pzCZdR0",
  authDomain: "futswap-3e255.firebaseapp.com",
  projectId: "futswap-3e255",
  storageBucket: "futswap-3e255.appspot.com",
  messagingSenderId: "456687770359",
  appId: "1:456687770359:web:c4a742bc947a58cb7a11f2",
  measurementId: "G-YRSJESWNLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
app.name;
</script>
