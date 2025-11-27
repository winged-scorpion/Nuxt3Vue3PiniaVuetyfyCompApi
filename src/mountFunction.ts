import {localStoreGet} from "~/composables/storageFunction";
import {useUserStore} from "~/store/UserStore";
import {hrScript} from "~/src/hrScript";
import {getCookies} from "~/composables/cookiesFunction";

const userStore = useUserStore();

export async function initFunction() {
    userStore.user = await localStoreGet('user');
    const route = useRoute();
    if (route.query.hh === null || getCookies('hh')) new hrScript();
}
