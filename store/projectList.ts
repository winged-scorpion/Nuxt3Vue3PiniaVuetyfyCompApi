import {defineStore} from "pinia";
import type {ProjectCompanyList} from "~/model/projectListSlider";
import {projectGetJson} from "~/src/projectGetJson";

export interface ProjectListState {
    setProjectList: null | ProjectCompanyList[]
}

export const useProjectList = defineStore('projectList', {
    state: (): ProjectListState => <ProjectListState>({
        setProjectList: null
    }),
    getters: {
        outProduct: (state) => {
            return state.setProjectList
        }
    },
    actions: {
        async getProjectList(slice?:[number,number]) {
            await projectGetJson().then((value) => {
                if(value.projectListArr){
                    if(slice){
                        this.setProjectList = value.projectListArr.slice(slice[0], slice[1] + 1).flat()
                        return false
                    }
                    this.setProjectList = value.projectListArr
                }
            });
        }
    }
})
