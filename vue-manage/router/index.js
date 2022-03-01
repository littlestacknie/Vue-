import Vue from 'vue'
import Vuerouter from 'vue-router'
import Main from '../pages/Main'
import Home from '../pages/Home'
import Mall from '../pages/Mall'
import User from '../pages/User'
Vue.use(Vuerouter)


export default new Vuerouter({
    mode: 'history',
    routes: [{
            // path: '/home',
            // name: 'home',
            // component: Home
            path: '/',
            name: 'main',
            component: Main,
            redirect: '/home',
            children: [{
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/mall',
                    name: 'mall',
                    component: Mall
                }, {
                    path: '/user',
                    name: 'user',
                    component: User
                }, {
                    path: '/page1',
                    name: 'page1',
                    component: () =>
                        import ('../pages/PageOne')
                }, {
                    path: '/page2',
                    name: 'page2',
                    component: () =>
                        import ('../pages/PageTwo')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../pages/Login')
        }

    ],

})