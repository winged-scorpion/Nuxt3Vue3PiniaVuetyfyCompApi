import {useUserStore} from "~/store/UserStore";
import {NAV_ITEMS} from "~/src/constant";

export function LogOut() {
    const userStore = useUserStore();
    userStore.user.authStatus = '';
    return navigateTo("/login");
}

export function h1Search(url: string) {
    for (let key of NAV_ITEMS) {
        if (key.page === url) {
            return key.h1
        }
    }
}
let test = 0
export function randomBackground() {
    // console.log('randomBackground------------------->',test++)
    function invertHex(hex: string) {
        return '#' + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    }
    let letters = '0123456789ABCDEF';
    let color = '#';
    let colorText = ''
    for (let i = 0; i < 6; i++) {
        colorText += letters[Math.floor(Math.random() * 16)];
    }
    let oppositeColor = invertHex(colorText);
    return [color + colorText, oppositeColor];
}

export function fieldId(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


