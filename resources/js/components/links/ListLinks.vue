<template>
    <div>
        <section class="mb-6">
            <div class="text-h6">{{ $t('links.list-page.title') }}</div>
            <span class="subtitle-1">{{ $t('links.list-page.sub-title') }}</span>
        </section>

        <section class="text-right">
            <v-btn
            color="success"
            dark
            class="mb-2"
            to="/links/create"
            >{{ $t('btn.add-new') }}</v-btn>
        </section>

        <v-card>
            <v-card-title>
                {{ $t('links.list-page.data-table-title') }}
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="items"
                :options.sync="options"
                :server-items-length="totalItems"
                :loading="loading"
                class="elevation-1"
            >
                <template v-slot:item.colour="{ item }">
                   <v-chip
                        :color="item.colour.hex"
                        dark
                    >

                    </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="confirm(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
        >
            <v-card>
                <v-card-title class="headline">{{ $t('delete-dialog.title') }}</v-card-title>

                <v-card-text>
                {{ $t('delete-dialog.body') }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text
                        @click="close()"
                    >
                        {{ $t('btn.cancel') }}
                    </v-btn>

                    <v-btn
                        text
                        @click="deleteRecord(deleteItem)"
                    >
                        {{ $t('btn.delete') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import filterItems from '../../_helpers/filter'
    import sortItems from '../../_helpers/sort'

    export default {
        props: ['lang'],
        data () {
            return {
                loading: null,
                dialog: false,
                search: '',
                totalItems: 0,
                items: [],
                options: {},
                deleteItem: {},
                editedIndex: -1,
                editedItem: {},
                defaultItem: {},
            }
        },

        computed: {
            ...mapState({
                links: state=> state.linkService.items
            }),

            headers () {
                return this.$t('links.list-page.data-table-headers');
            }
        },

        watch: {
            options: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.items = data.items
                            this.totalItems = data.total
                        })
                },
                deep: true,
            },
            search () {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                    this.getDataFromApi()
                    .then(data => {
                        this.items = data.items
                        this.totalItems = data.total
                    })
                }, 300);
            }
        },

        methods: {
            ...mapActions('linkService', ['obtainLinks', 'deleteLink']),

            getDataFromApi () {

                return new Promise((resolve, reject) => {

                    this.loading = true

                    const { sortBy, sortDesc, page, itemsPerPage } = this.options

                    let search = this.search.trim().toLowerCase();

                    axios.all([
                        this.obtainLinks(),
                    ])
                    .then( () => {

                        let items = this.links


                        // items.map(item => {

                        // })

                        items = filterItems(items, search)
                        items = sortItems(items, sortBy, sortDesc)

                        const total = items.length

                        if (itemsPerPage > 0) {
                            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        }

                        this.loading = false

                        resolve({
                            items,
                            total,
                        })

                    });
                })
            },

            editItem (item) {
                this.$router.push({name: 'EditLink', params: { id: item.id }})
            },

            deleteRecord (item) {
                this.dialog = false;

                this.deleteLink(item.id)
                .then( res => {
                    this.getDataFromApi()
                    .then(data => {
                        this.items = data.items
                        this.totalItems = data.total
                    })
                })
                .catch( error => {
                    console.error(error);
                })
            },

            confirm (item) {
                this.dialog = true;
                this.deleteItem = item;
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                    this.deleteItem = {}
                })
            }
        }
    }
</script>
