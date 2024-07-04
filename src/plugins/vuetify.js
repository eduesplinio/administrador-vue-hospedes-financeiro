import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: '#0366d6', // Cinza escuro, quase preto, para textos e cabeçalhos
                secondary: '#586069', // Cinza médio, para textos secundários
                tertiary: '#f6f8fa', // Cinza muito claro, para fundos e áreas de destaque
                tertiary2: '#e1e4e8', // Cinza claro, para bordas e divisórias
                white: '#FFFFFF' // Branco, mantido para contrastes e fundos
            },
            dark: {
                primary: '#0366d6', // Azul do GitHub, substituindo o verde claro
                secondary: '#586069', // Cinza escuro, quase preto, para fundos
                tertiary: '#586069', // Cinza médio, para textos secundários e elementos
                tertiary2: '#e1e4e8', // Cinza claro, para bordas e divisórias em um fundo escuro
            }
        },
    },
});