const deviceListData = require('./mockData/device.json')
const boatListData = require('./mockData/boat.json')
const dynamicData = require('./mockData/dynamic.json')
const searchData = require('./mockData/search.json')
const information = require('./mockData/information.json')
const personCertificate = require('./mockData/personCertificate.json')
const train = require('./mockData/train.json')
const trainNameList = require('./mockData/trainNameList.json')
const healthList =require('./mockData/health.json')
const restList =require('./mockData/rest.json')
const reportList =require('./mockData/report.json')
function fetchData(url, params) {
    return new Promise((resolve, reject) => {
       resolve(url) 
    })
}

export const getDeviceList = () => {
   return fetchData(deviceListData)
}

export const getBoatList = () => {
   return fetchData(boatListData)
}

export const getDynamicList = () => {
   return fetchData(dynamicData)
}

export const getSearchList = () => {
   return fetchData(searchData)
}

export const getInformationList = () => {
   return fetchData(information)
}

export const getPersonCertificateList = () => {
   return fetchData(personCertificate)
}

export const getTrainList = () => {
   return fetchData(train)
}

export const getTrainNameListList = () => {
   return fetchData(trainNameList)
}
export const getHealthList = () => {
   return fetchData(healthList)
}
export const getRestList = () => {
   return fetchData(restList)
}
export const getReportList = () => {
   return fetchData(reportList)
}
