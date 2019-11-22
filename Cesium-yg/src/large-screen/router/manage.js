
const baseWrapper = () => import( `@/large-screen/manage/parent.vue` )
const emptyComponet = () => import(`@/large-screen/manage/emptyComponent`)

const shipReport = () => import(`@/large-screen/manage/ship/report`)
const shipDynamic = () => import(`@/large-screen/manage/ship/dynamic`)
const shipBoatStore = () => import( `@/large-screen/manage/ship/boat/store` )             //原建库管理 现渔船信息
const shipBoatDevice = () => import( `@/large-screen/manage/ship/boat/device` )
const shipBoatSearch = () => import( `@/large-screen/manage/ship/boat/search` )
const shipBoatAnalyse = () => import( `@/large-screen/manage/ship/boat/analyse` )  
const shipEvents = () => import( `@/large-screen/manage/ship/events` )
const shipCertificate = () => import( `@/large-screen/manage/ship/certificate` )

const personInformation = () => import( `@/large-screen/manage/person/information` )
const personCertificate = () => import( `@/large-screen/manage/person/certificate` )
const personTrain = () => import( `@/large-screen/manage/person/train` )
const personExam = () => import( `@/large-screen/manage/person/exam` )

const safePrevention = () => import( `@/large-screen/manage/safe/prevention` )
const safeAlarm = () => import( `@/large-screen/manage/safe/alarm` )
const safePublish = () => import( `@/large-screen/manage/safe/publish` )
const safeRest = () => import( `@/large-screen/manage/safe/rest` )
const safeSensitive = () => import( `@/large-screen/manage/safe/sensitive` )

const portCar = () => import( `@/large-screen/manage/port/car` )
const portFishCar = () => import( `@/large-screen/manage/port/fishCar` )
const portHealth = () => import( `@/large-screen/manage/port/health` )
const portBerth = () => import( `@/large-screen/manage/port/berth` )
const portCulture = () => import( `@/large-screen/manage/port/culture` )

export default [
    {
        name: 'ship',
        path: '/ship',
        component: baseWrapper,
        meta: {
            isManage: true
        },
        children: [ 
            {
                path: 'report',
                name: 'report',
                fullPath: '/ship/report',
                component: shipReport,
                meta: {
                    title: '进出港报告',
                    nor: 'n_report',
                }
            },
            {
                path: 'events',
                name: 'events',
                fullPath: '/ship/events',
                component: shipEvents, 
                meta: {
                    title: '进出港事件',
                    nor: 'n_event',
                }
            },
            {
                path: 'dynamic',
                name: 'dynamic',
                fullPath: '/ship/dynamic',
                component: shipDynamic,
                meta: {
                    title: '渔船监管',
                    nor: 'n_regulatory',
                }
            },
            {
                path: 'boat',
                name: 'boat',
                fullPath: '/ship/boat',
                component: emptyComponet,
                meta: {
                    title: '渔船数据',
                    nor: 'n_data',
                },
                children: [
                    // {
                    //     path: 'store',
                    //     name: 'events',
                    //     fullPath: '/ship/boat/store',
                    //     component: shipBoatStore,
                    //     meta: {
                    //         title: '渔船建库管理',
                    //     }
                    // },
                    {
                        path: 'position',
                        name: 'events',
                        fullPath: '/ship/boat/position',
                        component: shipBoatDevice,
                        meta: {
                            title: '定位设备',
                        }
                    },
                    {
                        path: 'search',
                        name: 'search',
                        fullPath: '/ship/boat/search',
                        component: shipBoatStore,
                        meta: {
                            title: '渔船信息',
                        }
                    },
                    {
                        path: 'analyse',
                        name: 'analyse',
                        fullPath: '/ship/boat/analyse',
                        component: shipBoatAnalyse,
                        meta: {
                            title: '渔船统计',
                        }
                    },
                ]
            },
            {
                path: 'certificate',
                name: 'certificate',
                fullPath: '/ship/certificate',
                component: shipCertificate,
                meta: {
                    title: '渔船证书',
                    nor: 'n_certificate',
                }
            }
        ]
    },
    {
        name: 'person',
        path: '/person',
        component: baseWrapper,
        meta: {
            isManage: true
        },
        children: [
            {
                path: 'information',
                name: 'information',
                fullPath: '/ship/information',
                component: personInformation,
                meta: {
                    title: '船员信息',
                    nor: 'n_information',
                }
            },
            //personCertificate, personTrain, personExam
            {
                path: 'certificate',
                name: 'certificate',
                fullPath: '/ship/certificate',
                component: personCertificate,
                meta: {
                    title: '船员证书',
                    nor: 'n_sailors_c',
                }
            },
            {
                path: 'train',
                name: 'train',
                fullPath: '/ship/train',
                component: personTrain,
                meta: {
                    title: '培训信息',
                    nor: 'n_training',
                }
            },
            {
                path: 'exam',
                name: 'exam',
                fullPath: '/ship/exam',
                component: personExam,
                meta: {
                    title: '考试信息',
                    nor: 'n_exam',
                }
            },
        ]
    },
    {
        name: 'safe',
        path: '/safe',
        component: baseWrapper,
        meta: {
            isManage: true
        },
        children: [
            {
                path: 'prevention',
                name: 'prevention',
                fullPath: '/safe/prevention',
                component: safePrevention,
                meta: {
                    title: '防台管理',
                    nor: 'n_typhoon',
                }
            },
            {
                path: 'rest',
                name: 'rest',
                fullPath: '/safe/rest',
                component: safeRest,
                meta: {
                    title: '伏休管理',
                    nor: 'n_rest',
                }
            },
            {
                path: 'sensitive',
                name: 'sensitive',
                fullPath: '/safe/sensitive',
                component: emptyComponet,
                meta: {
                    title: '敏感水域',
                    nor: 'n_sensitive',
                }
            },
            {
                path: 'alarm',
                name: 'alarm',
                fullPath: '/safe/alarm',
                component: safeAlarm,
                meta: {
                    title: '安全告警',
                    nor: 'n_alarm',
                }
            },
            {
                path: 'publish',
                name: 'publish',
                fullPath: '/safe/publish',
                component: safePublish,
                meta: {
                    title: '消息发布',
                    nor: 'n_release',
                }
           },
       ]
    },
    {
        name: 'port',
        path: '/port',
        component: baseWrapper,
        meta: {
            isManage: true
        },
        children: [
            {
                path: 'car',
                name: 'car',
                fullPath: '/port/car',
                component: portCar,
                meta: {
                    title: '陆域管理',
                    nor: 'n_land',
                }
            },
            {
                path: 'berth',
                name: 'berth',
                fullPath: '/port/berth',
                component: portBerth,
                meta: {
                    title: '泊位管理',
                    nor: 'n_berth',
                }
            },
            {
                path: 'health',
                name: 'health',
                fullPath: '/port/health',
                component: portHealth,
                meta: {
                    title: '卫生管理',
                    nor: 'n_health',
                }
            },
            {
                path: 'culture',
                name: 'culture',
                fullPath: '/port/culture',
                component: portCulture,
                meta: {
                    title: '文化渔港',
                    nor: 'n_culture',
                }
            },
            // {
            //     path: 'fishCar',
            //     name: 'fishCar',
            //     fullPath: '/port/fishCar',
            //     component: portFishCar,
            //     meta: {
            //         title: '涉鱼车辆管理',
            //         nor: 'n_regulatory',
            //     }
            // }
            
        ]
    }
]
