import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { authorizeToken } from './guards.js'

Vue.use(Router)

// 詳細はroutes.jsを参照
const router = new Router({routes})
router.beforeEach(authorizeToken)

export default router
