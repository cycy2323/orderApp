import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './pages/IndexPage';
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Menus from "./pages/Menus";
// import Admin from "./pages/Admin";
// import Login from "./pages/User/Login";
// import Register from "./pages/User/Register";
import SubRoutes from './utils/SubRoutes'

// 设置私有路由
const isAuthority = true

const RouteConfig = [
  {
    path: '/',
    component: () => import ('./pages/IndexPage'),
    model: [import('./models/home')],
    routes: [
      {
        path: '/home',
        component:  () => import ('./pages/Home'),
        model: [],
        redirect: true,
        isAuthority
      },
      {
        path: '/about',
        component:  () => import ('./pages/About'),
        model: [],
        isAuthority,
        routes: [
          {
            path: '/about/history',
            model: [],
            component: () => import ('./pages/About/History')
          },
          {
            path: '/about/contact',
            model: [],
            component: () => import ('./pages/About/Contact'),
            routes: [
              {
                path: '/about/contact/phone',
                model: [],
                component: () => import ('./pages/About/Phone')
              },
              {
                path: '/about/contact/address',
                model: [],
                component: () => import ('./pages/About/Address')
              }
            ]
          },
          {
            path: '/about/orderingguide',
            model: [],
            component: () => import ('./pages/About/OrderingGuide')
          },
          {
            path: '/about/delivery',
            model: [],
            component: () => import ('./pages/About/Delivery')
          }
        ]
      },
      {
        path: '/admin',
        component:  () => import ('./pages/Admin'),
        model: [],
        isAuthority
      },
      {
        path: '/menus',
        component:  () => import ('./pages/Menus'),
        model: [],
        isAuthority
      },
      {
        path: '/login',
        component:  () => import ('./pages/User/Login'),
        model: []
      },
      {
        path: '/register',
        component:  () => import ('./pages/User/Register'),
        model: []
      }
    ]
  }
]


function RouterConfig({ history, app }) {
  // console.log(app, '000')
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" component={IndexPage} /> */}
        {
          RouteConfig.map((route, i) => {
           return <SubRoutes key={i} {...route} app={app}></SubRoutes>
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
