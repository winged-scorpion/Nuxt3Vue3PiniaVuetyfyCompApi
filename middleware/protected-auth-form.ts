import {localStoreGet} from "~/composables/storageFunction";
export default defineNuxtRouteMiddleware((to, from) => {
    (async function () {
        const status = await localStoreGet('user');
        if (status.authStatus === 'successfully') return navigateTo("/admin");
    })();
})
