<template>
  <div>
    <section class="mb-6">
      <div class="text-h6">{{ $t("links.create-page.title") }}</div>
    </section>

    <v-sheet>
      <v-progress-linear
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-linear>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="link.title"
                :rules="rules.title"
                :counter="30"
                :label="$t('links.fields.title')"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="link.url"
                :rules="rules.url"
                :label="$t('links.fields.url')"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="link.colour_id"
                :items="colours"
                item-text="name"
                item-value="id"
                :rules="rules.colour"
                :label="$t('links.fields.colour_id')"
                required
                chips
                clearable
                >
                  <template v-slot:selection="data">
                      <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :color="data.item.hex"
                      @click="data.select"
                      >
                      {{ data.item.name }}
                      </v-chip>
                  </template>
                  <template v-slot:item="data">

                      <template>
                         <v-list-item-content>
                              <v-list-item-title v-html="data.item.name"></v-list-item-title>
                          </v-list-item-content>

                         <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          :color="data.item.hex"
                          >
                          </v-chip>


                      </template>
                  </template>
                </v-autocomplete>
            </v-col>
          </v-row>

          <v-btn color="warning" @click="submit">{{ $t("btn.update") }}</v-btn>
          <v-btn to="/links">{{ $t("btn.cancel") }}</v-btn>
        </v-container>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  props: ["lang"],
  data() {
    return {
      loading: false,
      valid: false,
      colours: [],
      // link: {
      //   title: null,
      //   url: null,
      //   colour_id: null,
      // },
      rules: {
        title: [
          v => !!v || this.$t("rules.required"),
          v => (!!v && v.length <= 30) || this.$t("rules.max", { max: 30 }),
        ],
        url: [
          v => !v || /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(v) || this.$t("rules.url"),
        ],
        colour: [
          v => !!v || this.$t("rules.required")
        ],
      },
    };
  },

  computed: {
    ...mapState({
      link: state => state.linkService.item
    })
  },

  watch: {
    lang(a, b) {
      this.resetValidation();
    },
  },

  created() {
    this.obtainColours()
  },

  methods: {
    ...mapActions("alert", ["success", "error", "clear"]),
    ...mapActions("linkService", ["updateLink"]),

    obtainColours(){
      axios.get('/colours')
      .then(({ data }) => {
        this.colours = data
      })
    },

    submit() {
      if (this.validate()) {
        this.updateLink(this.link);
      } else {
        this.error("Form is not valid!");
      }
    },

    validate() {
      return this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

