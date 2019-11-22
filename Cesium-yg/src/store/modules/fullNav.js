import * as types from "../mutation-types";

const state = {
    modeCurrentIndex: 0,  //大的模块Index
    navList: [],   //下拉二级导航
    navListCurrentIndex: -1,  //下拉二级导航当前Index
    thirdCurrentIndex: -1,    //下拉三级导航当前Index
    tabList: [],   //标题导航
    tabListCurrentIndex: 0, //标题级导航当前Index
    manageRoutes: []
}

const getters = {
    modeCurrentIndex: () => state.modeCurrentIndex,
    navList: () => state.navList,
    navListCurrentIndex: () => state.navListCurrentIndex,
    tabList: () => state.tabList,
    tabListCurrentIndex: () => state.tabListCurrentIndex,
    thirdCurrentIndex: () => state.thirdCurrentIndex,
    manageRoutes: () => state.manageRoutes,
}


const mutations =  {
    [types.MODE_CURRENT_INDEX](state, index) {
        state.modeCurrentIndex = index
    },
    [types.NAV_LIST](state, list){
        state.navList = list
    },
    [types.NAV_LIST_CURRENT_INDEX](state, index){
        state.navListCurrentIndex = index
    },
    [types.TAB_LIST](state, list){
        state.tabList = list
    },
    [types.TAB_LIST_CURRENT_INDEX](state, index){
        state.tabListCurrentIndex = index
    },
    [types.THIRD_CURRENT_INDEX](state, index){
        state.thirdCurrentIndex = index
    },
    [types.MANAGE_ROUTES](state, routes){
        state.manageRoutes = routes
    }
}

const actions = {
    initNavData({ commit,  dispatch}, {router, currentRoute}) {
        let manageRoutes = router.options.routes.filter(item => item.meta && item.meta.isManage)

        commit(types.MANAGE_ROUTES, manageRoutes)

        let currentPath = currentRoute.fullPath
        //console.log(currentRoute)
        dispatch('setIndexsByFullpath', {fullPath: currentPath})

        let tabItem = [{
            title: currentRoute.meta.title,
            path: currentPath
        }]

        commit(types.TAB_LIST, tabItem)
    },
    setIndexsByFullpath({ commit, state}, { fullPath}) {
        let _navList = [
            {
                children: [],
            }
        ]
        let _modeIndex = 0
        let _navListCurrentIndex = -1
        let _thirdCurrentIndex = -1
        state.manageRoutes.map((item,index) => {
            let _navItem = {};

            if(fullPath.indexOf(item.path) > -1) {
                _modeIndex = index + 1
            }

            if(!item.children) {
                _navItem = {
                    children: [],
                }
            }else{
                _navItem.children = item.children.map((secondItem, secondIndex) => {
                    let secondItemPath = `${item.path}/${secondItem.path}`
                    if(secondItem.path == 'sensitive') {
                        secondItemPath = '/map/gis?activeIndex=1'
                    }else if(secondItem.path == 'berth') {
                        secondItemPath = '/map/gis?activeIndex=2'
                    }

                    let secondObj = {
                        title: secondItem.meta ? secondItem.meta.title : "",
                        nor: secondItem.meta ? secondItem.meta.nor : "",
                        pre: secondItem.meta ? secondItem.meta.pre : "",
                        path: secondItemPath,
                    }

                    if(fullPath.indexOf(secondItemPath) > -1) {
                        _navListCurrentIndex = secondIndex
                    }
                    if(secondItem.children && secondItem.children.length > 0) {
                        secondObj.children = secondItem.children.map((thirdItem, thirdIndex) => {
                            let thirdItemPath = `${secondItemPath}/${thirdItem.path}`
                            let thirdObj = {
                                title: thirdItem.meta ? thirdItem.meta.title : "",
                                path: thirdItemPath,
                            }
                            if(fullPath == thirdItemPath) {
                                _thirdCurrentIndex = thirdIndex
                            }
                            return thirdObj
                        })
                    }
                    return secondObj
                })
            }

            _navList.push(_navItem)
        })

        if(state.navList.length == 0) {
            commit(types.NAV_LIST, _navList)
        }
        commit(types.MODE_CURRENT_INDEX, _modeIndex)
        commit(types.NAV_LIST_CURRENT_INDEX, _navListCurrentIndex)
        commit(types.THIRD_CURRENT_INDEX, _thirdCurrentIndex)
    },
    changeTabCurrent({ commit, state, dispatch}, { index }) {
        let fullPath = state.tabList[index].path
        dispatch('setIndexsByFullpath', {fullPath})
        commit(types.TAB_LIST_CURRENT_INDEX, index)
    },
    setTabList({ commit, state}, {tabItem}) {
        let oldItems = state.tabList
        //let isExisted = oldItems.filter(item => item.path).join(',').indexOf()
        let existedIndex = -1
        oldItems.map((item,index) => {
            if(item.path == tabItem.path) {
                existedIndex = index
            }
        })
        if(existedIndex === -1) {
            let newItems = oldItems.concat([{
                title: tabItem.title,
                path: tabItem.path
            }])
            commit(types.TAB_LIST, newItems)
            commit(types.TAB_LIST_CURRENT_INDEX, newItems.length-1)
        }else{
            commit(types.TAB_LIST_CURRENT_INDEX, existedIndex)
        }
    },
    deleteTabListFromIndex({ commit, state}, {index}) {
        let newItems = state.tabList.filter((item,i) => i !== index)
        let nowIndex = state.tabListCurrentIndex
        let newIndex = ""


        if(index <= nowIndex) {               //与当前index比较，，删除一个tab之后重置tabListCurrentIndex
            newIndex = nowIndex - 1
            console.log(newIndex)
        }else {
            newIndex = nowIndex
        }
        commit(types.TAB_LIST, newItems)

        if(newIndex != nowIndex) {
            commit(types.TAB_LIST_CURRENT_INDEX, newIndex)
        }
    }
}

export default {state,getters,mutations,actions}
