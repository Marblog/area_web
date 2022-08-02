import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'


const app = createApp(App)
for (let iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
}
app.use(ElementPlus, {
    locale: zhCn,
})
    .use(VueAxios, axios)
    .use(router)
    .mount('#app');


