import ImgBox from "./imgBox.vue";
import BaseTable from 'base/baseTable/baseTable'          //表格组件
import Search from 'base/search/search'                     //搜索组件
import Pagination from 'base/pagination/pagination'
import ImgIcon from './imgIcon'
import Text from './text'
import Container from './container'

const baseComponents = {
  install: function(Vue) {
    
    Vue.component("ImgBox", ImgBox);
    Vue.component("BaseTable", BaseTable);
    Vue.component("Pagination", Pagination);
    Vue.component("Search", Search);
    Vue.component("ImgIcon", ImgIcon);
    Vue.component("Txt", Text);
    Vue.component("Con", Container);
  }
};
export default baseComponents;
