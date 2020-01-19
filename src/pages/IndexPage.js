import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import styles from './IndexPage.scss';
import NavBar from './NavBar'
// import Home from './Home'
// import About from './About'
// import Admin from './Admin'
// import Menus from './Menus'
// import Login from './User/Login'
// import Register from './User/Register'

//引入路由组件
import {Switch} from 'dva/router'
import SubRoutes, {RedirectRoute, NoMatchRoute} from '../utils/SubRoutes'
const { Header, Content } = Layout;

function IndexPage(props) {
  // console.log(props, '999666')
  const {routes, app} = props
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar {...props}></NavBar>
      </Header>
      <Content className={styles.content}>
        {/* 一级路由 */}
        <Switch>
          {/* <Route path="/home" component={Home}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/menus" component={Menus}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route> */}
          {
            routes.map((route, i) => {
              return <SubRoutes key={i} {...route} app={app}></SubRoutes>
             })
          }
           {/* 重定向方式：
            如果路由配置中没有redirect: true (通过循环渲染重定向)
            则默认第一个路由为重定向路由
            <Redirect exact from={'/'} to={routes[0].path} />
           */}
            {/* <Redirect to="/home"></Redirect> */}
            <RedirectRoute exact={true} from={'/'} routes={routes} />

            {/* 404 NoMatch*/}
            <NoMatchRoute />
        </Switch>
      
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
