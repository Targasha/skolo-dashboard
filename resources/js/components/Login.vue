<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">


            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                        dark
                        flat
                    >

                        <v-toolbar-title>Sign in</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-progress-circular
                            :indeterminate="true"
                            :size="36"
                            :width="4"
                            v-if="status.loading"
                        ></v-progress-circular>
                    </v-toolbar>

                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-text-field
                                label="Email"
                                name="email"
                                v-model="email"
                                :rules="emailRules"
                                prepend-icon="mdi-account"
                                type="text"
                                required
                            ></v-text-field>

                            <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                :rules="passwordRules"
                                v-model="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>

                        <v-spacer></v-spacer>
                        <v-btn @click="validate"
                            :disabled="status.loading"
                        >Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                valid: true,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
                submitted: false,
                authError: null,
                message: ''
            }
        },
        computed: {
            ...mapState('auth', ['status'])
        },
        methods: {
            ...mapActions('auth', ['login', 'logout']),

            validate () {
                if(this.$refs.form.validate()){
                    this.login({
                        email: this.email,
                        password: this.password
                    });
                }
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
        },
        created () {
            // reset login status
            localStorage.clear();
        },
    };
</script>
