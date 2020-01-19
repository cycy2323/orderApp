import React, { Component } from 'react'
import { Tabs } from "antd";
import style from "./index.scss";
import SubRoutes, {RedirectRoute} from "../../utils/SubRoutes";
import { Switch } from "dva/router";

const {TabPane} = Tabs

export default class index extends Component {
    handleChangeTab = (key) => {
        // console.log(key, this)
        if (this.props.location.pathname !== key) {
            this.props.history.push(key)
        }
    }
    render() {
        const {routes, app} = this.props
        return (
            <div className={style.about}>
                <Tabs className={style.tabs} tabPosition={'left'}
                 onChange={this.handleChangeTab} activeKey={this.props.location.pathname}
                 >
                    <TabPane tab="历史订餐" key="/about/history">
                    </TabPane>
                    <TabPane tab="联系我们" key="/about/contact">
                    </TabPane>
                    <TabPane tab="点餐文档" key="/about/orderingguide">
                    </TabPane>
                    <TabPane tab="快递信息" key="/about/delivery">
                    </TabPane>
                </Tabs>
                <div className={style.routes}>
                    {/* 二级路由 */}
                    <Switch>
                    {
                        routes.map((route, i) => {
                        return <SubRoutes key={i} {...route} app={app}></SubRoutes>
                        })
                    }
                        <RedirectRoute exact={true} from={'/about'} routes={routes} />
                    </Switch>
                </div>
            </div>
        )
    }
}

