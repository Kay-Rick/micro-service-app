import Vue from 'vue'
import VueRouter from 'vue-router'

const ServiceMain = () => import('../components/content/ServiceMain')
const NodeMain = () => import('../components/content/NodeMain')
const NodeInstance = () => import('../components/content/NodeInstance')
const ServiceInstance = () => import('../components/content/ServiceInstance')
const ServiceInfo = () => import('../components/content/ServiceInfo')
const BoardInstance = () => import('../components/content/BoardInstance')
const MonitorInstance = () => import('../components/content/MonitorInstance')
const DSPInstance = () => import('../components/content/DSPInstance')
const FPGAInstance = () => import('../components/content/FPGAInstance')
const Virtualization = () => import('../components/content/Virtualization')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/service'
  },
  {
    path: '/service',
    component: ServiceMain,
    // children: [
    //   {
    //     path: 'instance',
    //     component: ServiceInstance
    //   },
    //   {
    //     path: 'info',
    //     component: ServiceInfo
    //   }
    // ]
  },
  {
    path: '/node',
    component: NodeMain,
    // children: [
    //   {
    //     path: '/instance',
    //     component: NodeInstance
    //   }
    // ]
  },
  {
    path: '/serviceInstance/:name/:id',
    component: ServiceInstance
  },
  {
    path: '/serviceInfo/:name',
    component: ServiceInfo
  },
  {
    path: '/nodeInstance/:id',
    component: NodeInstance
  },
  {
    path: '/board/:ip',
    component: BoardInstance
  },
  {
    path: '/dsp/:ip',
    component: DSPInstance
  },
  {
    path: '/fpga/:ip',
    component: FPGAInstance
  },
  {
    path: '/virtualization',
    component: Virtualization
  },
  {
    path: '/monitor',
    component: MonitorInstance
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: "active"
})

export default router