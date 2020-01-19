import React from 'react'
import { Route, Redirect } from "dva/router";
import NoMatch from "../components/NoMatch";
import dynamic from 'dva/dynamic';
import { connect } from 'dva';

// export default function SubRoutes(route) {
//     console.log(route)
//     return (
//         <Route render={props => <route.component {...props} routes={route.routes} />} />
//     )
// }
// 动态加载路由组件
const dynamicCom = (app, models, component, routes, isAuthority, userInfo) => dynamic({
  app,
  models: () => models,
  component: () => component().then(res => {
        // console.log(res, 22222)
        // console.log(userInfo, 22222)
        if (isAuthority) {
            if (!localStorage.email) return () => <Redirect to='/login'/>
        }
        const Component = res.default || res
        return props => <Component {...props} app={app} routes={routes}/>
  }),
});
//封装路由组件
// export default function SubRoutes({routes, component: Component}) {
function SubRoutes({routes, component, app, model, isAuthority, userInfo}) {
    // console.log(isAuthority, 'isAuthorityisAuthority')
    return (
        // <Route render={props => <Component {...props} routes={routes} />} />
        <Route component={dynamicCom(app, model, component, routes, isAuthority, userInfo)}/>
    )
}
//重定向封装组件
export function RedirectRoute({routes, from, exact}) {
    const routeR = routes.filter(item => {
        return item.redirect
    })
    const to = routeR.length ? routeR[0].path : routes[0].path
    return <Redirect exact={routeR} from={from} to={to}/> 
}
//404
export function NoMatchRoute({status = 404}) {
    return <Route render={props => <NoMatch {...props} status={status} />} />
}

export default connect(({global}) => ({userInfo: global.userInfo}))(SubRoutes)