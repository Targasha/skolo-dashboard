<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" v-for="(item, i) in links" :key="i">
        <v-card :color="item.colour.hex" dark @click="item.url ? navigate(item) : editItem(item)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-actions>

              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      links: (state) => state.linkService.items
    }),
  },
  methods: {
    ...mapActions('linkService', ['obtainLinks']),

    navigate(item) {
      window.open(item.url, '_blank');
    },

    editItem (item) {
        this.$router.push({name: 'EditLink', params: { id: item.id }})
    },

  },
  created() {
    this.obtainLinks();
  },
};
</script>
