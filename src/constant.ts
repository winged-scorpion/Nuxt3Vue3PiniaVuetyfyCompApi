import type {InputTyp} from "~/model/input";

export const NAV_ITEMS = [
    {
        page: '/',
        name: 'Главная',
        h1: 'Учебный проект',
        visibility: true
    },
    {
        page: '/js_ts_task',
        name: 'Решебник',
        h1: 'js ts задачи из лайвкодинга',
        visibility: true
    },
    {
        page: '/preparation',
        name: 'Подготовка',
        h1: 'Подготовка к собеседованию',
        visibility: true
    },
    {
        page: '/training',
        name: 'Базовые задачи',
        h1: 'Базовые задачи по разному функционалу',
        visibility: true
    },
    {
        page: '/itKitchen',
        name: 'IT кухня',
        h1: 'Видео сборник разных рецептов',
        visibility: true
    },
    {
        page: '/test_cases',
        name: 'Тестовые задачи',
        h1: 'Задачи По Vue3 из различных собеседований',
        visibility: false
    },
    {
        page: '/wiki',
        name: 'Wiki',
        h1: 'Моя Wiki по js',
        visibility: true
    }
]
export const nameLocalStoreSetUser = 'user';
export const BACKGROUND_LIST: Object = [
    'Olive',
    'DarkSeaGreen',
    'SteelBlue',
    'Navy',
    'MistyRose'
]
export const BUTTON_STATUS_BASE: string = 'base'
export const BUTTON_STATUS_ERROR: string = 'error'
export const BUTTON_STATUS_SUCCESS: string = 'success'
export const INPUT_TYPE: InputTyp = {
    text: 'text',
    number: 'number'
}
export const IMG_LIST = ['.png','.jpg','.jpeg']
export const BASE_COLOR = '#5f9ea0';

