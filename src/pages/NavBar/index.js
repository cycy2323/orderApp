import React, { Component } from 'react'
import style from './index.scss'
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from "dva/router";

const menus = [
    {
      key: 'home',
      path: '/home',
      name: '主页'
    },
    {
      key: 'menus',
      path: '/menus',
      name: '菜单'
    },
    {
      key: 'admin',
      path: '/admin',
      name: '管理'
    },
    {
      key: 'about',
      path: '/about',
      name: '关于我们'
    },
    {
      key: 'login',
      path: '/login',
      name: '登录',
      className: style.login,
      isAuthority: true
    },
    {
      key: 'register',
      path: '/register',
      name: '注册',
      className: style.register,
      isAuthority: true
    }
  ];

export default class index extends Component {
    constructor(props) {
        // console.log(props)
        super(props)
        this.state = {
            selectedKeys: []
        }
    }
   
    componentDidMount() {
        this.handelSelectedkeys(this.props.location.pathname)
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        const {pathname} = this.props.location
        if (nextProps.location.pathname !== pathname) this.handelSelectedkeys(nextProps.location.pathname)
    }
    handelSelectedkeys (pathname) {
        const temp = pathname.split('/')
        const key = temp && temp.length < 2 ? 'home' : temp[1]
        this.setState({selectedKeys: [key]})
    }
    handleLogout = ({key}) => {
        if (key === 'logout') {
            window.localStorage.clear()
            this.props.history.push('/login')
        }
    }
   menu = (
        <Menu onClick={this.handleLogout}>
          <Menu.Item key="logout">
            <span>退出</span>
          </Menu.Item>
        </Menu>
    );

    render() {
        return (
            <nav className={style.header}>
              <a className={style.logo}>
                 <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="d-block mx-auto"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                <line x1="9.69" y1="8" x2="21.17" y2="8" />
                <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                <line x1="14.31" y1="16" x2="2.83" y2="16" />
                <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
              </svg>
              </a> 
              <Menu className={style['menu-left']} mode="horizontal"
               defaultSelectedKeys={['home']} selectedKeys={this.state.selectedKeys}
               >
                {
                    menus.filter(({isAuthority}) => !(isAuthority && localStorage.email)).map(({key,path,name,className}) => (
                    <Menu.Item key={key} className={className}><Link to={path}>{name}</Link></Menu.Item>
                    ))
                }
                    {/* <Menu.Item key={'home'}><Link to='/home'>主页</Link></Menu.Item>
                    <Menu.Item key={'menus'}><Link to='menus'>菜单</Link></Menu.Item>
                    <Menu.Item key={'admin'}><Link to='/admin'>管理</Link></Menu.Item>
                    <Menu.Item key={'about'}><Link to='/about'>关于我们</Link></Menu.Item>
                    <Menu.Item className={style.login} key={'login'}><Link to='/login'>登录</Link></Menu.Item>
                    <Menu.Item className={style.register} key={'register'}><Link to='/register'>注册</Link></Menu.Item> */}
                </Menu>
                {
                    localStorage.email && (
                        <Dropdown overlay={this.menu} className={style['dropdown-menu']}>
                            <a className="ant-dropdown-link">
                                <span className={style.email}>{localStorage.email}</span>
                                <Icon type="down" className={style.icon}/>
                            </a>
                        </Dropdown>
                    )
                }
            </nav>
        )
    }
}
