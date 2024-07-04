import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: 'f17ea1', // Laranja médio
                secondary: '#ffc4d8', // Laranja mais escuro
                tertiary: '#F0EAD6', // Bege claro
                tertiary2: '#E5E5E5', // Cinza claro
                white: '#FFFFFF'
            },
            dark: {
                primary: '#f17ea1', // Laranja médio
                secondary: '#ffc4d8', // Laranja mais escuro
                tertiary: '#F0EAD6', // Bege claro
                tertiary2: '#E5E5E5', // Cinza claro
            }
        },
    },
});