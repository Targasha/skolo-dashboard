<template>
    <div>
        <section class="mb-6">
            <div class="text-h6">{{$t('links.edit-page.title')}}</div>
        </section>
        <v-progress-linear
        indeterminate
        color="primary"
        v-if="loading"
        ></v-progress-linear>
        <v-sheet>
            <v-tabs v-model="tab">
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-general">
                    {{$t('links.edit-page.tabs.general')}}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item :value="'tab-general'">
                   <link-general :lang="lang"></link-general>
                </v-tab-item>
            </v-tabs-items>

        </v-sheet>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        props: ['id', 'lang'],
        data () {
            return {
                tab: null,
                items: [

                ]
            }
        },
        computed: {
             ...mapState({
                loading: state => state.linkService.loading
            })
        },
        methods: {
            ...mapActions('linkService', ['obtainLink']),
        },
        created() {
            this.obtainLink(this.id);
        }
    }
</script>

