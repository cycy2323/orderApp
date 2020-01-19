import React, {Component} from 'react'
import { Switch,Link } from "dva/router";
import SubRoutes, {RedirectRoute} from "../../utils/SubRoutes";
import styles from "./TabPane.scss";

export default class Contact extends Component {
    render() {
        const {routes,app} = this.props
         return (
            <div className={styles.tabpane}>
                <p className={styles.title}>联系我们</p>
                <div className={styles.content}>
                    <Link to="/about/contact/phone">电话</Link>
                    <Link to="/about/contact/address">地址</Link>
                </div>
                <div className={styles.info}>
                    {/* 三级路由 */}
                    <Switch>
                        {
                            routes.map((route, i) => {
                            return <SubRoutes key={i} {...route} app={app}></SubRoutes>
                            })
                        }
                            <RedirectRoute exact={true} from={'/about/contact'} routes={routes} />
                    </Switch>
                    </div>
            </div>
        )
    }
}
