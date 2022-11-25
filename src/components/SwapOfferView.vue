<template>
  <v-col class="col-lg-3 col-md-3 col-sm-6">
    <v-card class="grow" elevation="8">
      <div class="profile-pic-container">
        <p v-if="loadingProfilePic">carganduu...</p>
        <v-img v-else-if="imageSrc" class="profile-pic" :src="imageSrc"/>
        <p v-else>Fuck</p>
      </div>
      <figcaption class="text-center pa-4">
        <div style="height: 40px">
          <v-progress-circular v-if="loadingName" :indeterminate="true"/>
          <h1 v-else-if="name" class="text-h5 pb-1">{{ name }}</h1>
          <h1 v-else class="text-h5 pb-1">Pelotudo sin nombre</h1>
        </div>
        <span class="text-caption faded pb-1">
          <v-icon class="faded" size="20">mdi-map-marker-outline</v-icon>
          <template v-if="swap.distance">a {{ Math.floor(swap.distance * 100) / 100 }} km de distancia</template>
          <template v-else>No localizado</template>
        </span>
        <v-divider class="ma-2"/>
        <div style="height: 50px">
          <v-progress-circular v-if="loadingRating" :indeterminate="true"/>
          <template v-else-if="rating">
            <v-rating :value="rating.average ? rating.average : 0" half-increments color="var(--gold)"
                      background-color="var(--gold)" size="20" dense readonly/>
            <span v-if="rating.total > 0" class="text-caption faded">{{ rating.total }} Calificaciones</span>
            <span v-else class="text-caption faded">Este usuario aún no ha sido calificado</span>
          </template>
          <span v-else class="text-caption faded">No se pudieron traer las calificaciones de este usuario</span>
        </div>
        <v-divider class="ma-2 pb-1"/>
        <v-row class="px-4 pb-1">
          <v-col class="col-md-6">
            <h1 class="text-h5 font-weight-black" style="color: var(--darkblue);">{{ swap.forYouCount }}
              <v-icon class="pb-1" style="color: var(--darkblue);">mdi-cards</v-icon>
            </h1>
            <h1 class="text-subtitle-2 font-weight-bold" style="color: var(--indigo);">Para ti</h1>
          </v-col>
          <v-col class="col-md-6">
            <h1 class="text-h5 font-weight-black" style="color: var(--darkblue);">{{ swap.searchingCount }}
              <v-icon class="pb-1" style="color: var(--darkblue);">mdi-cards</v-icon>
            </h1>
            <h1 class="text-subtitle-2 font-weight-bold" style="color: var(--indigo);">Buscando</h1>
          </v-col>
        </v-row>
      </figcaption>
      <div class="justify-center text-center pb-6">
          <v-btn rounded color="#3E4D7C" class="mr-0 btn-custom-md white--text" @click="$emit('swap-clicked', swap)">
            Swap
          </v-btn>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import {getUserProfilePictureAsync, getUserPublicProfileAsync, getUserRatingAsync,} from "@/backend/users";

export default {
  name: "SwapOfferView",
  props: ['swap'],

  data: () => ({
    loadingProfilePic: true,
    imageSrc: null,
    loadingName: true,
    name: null,
    loadingRating: true,
    rating: null
  }),

  mounted() {
    this.loadName();
    this.loadProfilePic();
    this.loadRating();
  },

  methods: {
    async loadName() {
      this.loadingName = true;
      try {
        const pubProf = await getUserPublicProfileAsync(this.swap.uidReceiver);
        this.name = pubProf.displayName;
      } finally {
        this.loadingName = false;
      }
    },

    async loadProfilePic() {
      this.loadingProfilePic = true;
      try {
        this.imageSrc = await getUserProfilePictureAsync(this.swap.uidReceiver);
      } finally {
        this.loadingProfilePic = false;
      }
    },

    async loadRating() {
      this.loadingRating = true;
      try {
        this.rating = await getUserRatingAsync(this.swap.uidReceiver);
      } finally {
        this.loadingRating = false;
      }
    },
  },
}
</script>


<style scoped>
:root {
  --darkblue: #3E4D7C;
  --indigo: #5779B2;
  --lightblue: #B2D8FF;
  --gold: #E6BF3F;
}

.profile-pic-container {
  height: 180px;
}

.profile-pic {
  border-radius: 4px 4px 0 0;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  object-fit: cover;
}

.faded {
  color: #999;
}

.grow {
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.05);
}

</style>