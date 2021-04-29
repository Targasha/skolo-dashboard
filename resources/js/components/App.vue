<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="false"
      :floating="false"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
      v-if="auth.status.loggedIn"
    >
        <v-list
          dense
          nav
          class="py-0"
        >
            <v-list-item two-line :class="primaryDrawer.mini && 'px-0'">
                <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ auth.user ? auth.user.name : 'Application' }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item-group v-model="model">
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="item.link"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      v-if="auth.status.loggedIn"
    >
        <v-app-bar-nav-icon
            v-if="primaryDrawer.type !== 'permanent'"
            @click.stop="primaryDrawer.mini = !primaryDrawer.mini"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Vuetify</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                :icon="true"
                >
                {{ $i18n.locale }}
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="(locale) in locales"
                :key="locale.code"
                @click="setLocale(locale.code)"
                >
                <v-list-item-title>{{ locale.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu transition="slide-x-reverse-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                dark
                :icon="true"
                v-bind="attrs"
                v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="() => {}">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logOut()">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6"
      :class="auth.status.loggedIn ? '' : 'fill-height'">
        <snackbar v-if="alert.type" v-bind:alert="alert"></snackbar>
        <router-view :lang="$i18n.locale"></router-view>
      </v-container>
    </v-main>

    <v-footer
      :inset="footer.inset"
      app
      v-if="auth.status.loggedIn"
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import getSupportedLocales from '../_helpers/supported-locales';

    export default {
        data: () => ({
            locales: getSupportedLocales(),
            absolute: true,
            overlay: false,
            model: 0,
            drawers: ['Default (no property)', 'Permanent', 'Temporary'],
            primaryDrawer: {
                model: 'null',
                type: 'default (no property)',
                clipped: false,
                floating: false,
                mini: false,
            },
            footer: {
                inset: true,
            },
            items: [
                { title: 'nav.dashboard', icon: 'mdi-view-dashboard', link: '/'},
                { title: 'nav.links', icon: 'mdi-link-variant', link: '/links'},
            ],
            snackbar: {
                snackbar: false,
                color: '',
                text: ''
            }
        }),
        computed: {
            ...mapState({
                alert: state => state.alert,
                auth: state => state.auth
            })
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear'
            }),
            ...mapActions('auth', ['logout']),
            logOut () {
                this.logout().then(() => {
                    this.$router.push('/login');
                });
            },
            setLocale(locale) {
                this.$i18n.locale = locale;
                localStorage.setItem('lang', locale);
            }
        },
        watch: {
            $route (to, from){
                // clear alert on location change
                this.clearAlert();
            }
        },
        created () {
            // console.log(this.app);
            this.$vuetify.theme.dark = true
            this.clearAlert();
        }
    }
</script>

<style>
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        border: none;
        -webkit-text-fill-color: #fff;
        -webkit-box-shadow: 0 0 0px 1000px #1f1f1f inset;
        transition: background-color 5000s ease-in-out 0s;
    }
    label{
        margin-bottom: 0;
    }
</style>
