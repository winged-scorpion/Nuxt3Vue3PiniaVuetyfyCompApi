import {VVideo} from 'vuetify/labs/VVideo'
import {createVuetify} from "vuetify/framework";
const video = createVuetify({
    components: {
        VVideo,
    },
})
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(video);
});
