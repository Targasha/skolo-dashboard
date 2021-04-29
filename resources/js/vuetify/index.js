import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
// import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    // theme: {
    //     themes: {
    //         light: {
    //             primary: '#FFD700',
    //             gray1: '#EDEDED',
    //             gray2: '#CCC',
    //             gray3: '#767676',
    //             gray4: '#58585A',
    //             black: '#000',
    //             blue: '#0066CC'
    //         },
    //         dark: {
    //             primary: colors.blue.lighten3
    //         }
    //     }
    // },
    // icons: {
    //     iconfont: 'mdi' // default - only for display purposes
    // }
});

export default vuetify;
