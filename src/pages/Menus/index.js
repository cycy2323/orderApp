import React, { Component } from 'react'
import { Table, Button, Icon, Row, Col } from "antd";
import style from "./index.scss";

export default class index extends Component {
    state = {
        cart: []
    }
    renderMenusTable() {
        const columns = [
            {
                key: 'size',
                title: '尺寸',
                dataIndex: 'size',
                render: (text, record) => {
                    // console.log(text, record)
                    if (record.price) {
                        return <span>{text}</span>
                    }
                    return {
                        children: <strong>{text}</strong>,
                        props: {
                            colSpan: 2
                        }
                    }
                }
            },
            {
                key: 'price',
                title: '价格',
                dataIndex: 'price',
                render: (text, record) => {
                    return <span>{text}</span>
                }
            },
            {
                key: 'action',
                title: '加入',
                render: (text, record) => {
                    let obj = {
                        children: (
                            <Button className={style['add-btn']} onClick={() => handleAddMenus(record)}>
                                <Icon type="plus" />
                            </Button>
                        ),
                        props: []
                    }
                    if (!record.price) obj.props.colSpan = 0
                    return obj
                }
            }
        ]
        const handleAddMenus = record => {
            // const { name, price, size } = record
            let { cart } = this.state
            const index = cart.findIndex(item => item.key === record.key)
            index >= 0 ? cart.splice(index, 1,
                { ...cart[index], count: cart[index].count + 1 })
                : (cart = [...cart, {...record, count: 1}])
            this.setState({
                cart
            })
        }
        let data = {
            1: {
                name: '水果pizza',
                description: '最好吃的pizza',
                options: [
                    {
                        size: 9,
                        price: 42
                    },
                    {
                        size: 12,
                        price: 59
                    }
                ]
            },
            2: {
                name: '意大利pizza',
                description: '最好吃的pizza',
                options: [
                    {
                        size: 9,
                        price: 42
                    },
                    {
                        size: 12,
                        price: 59
                    }
                ]
            },
            3: {
                name: '榴莲pizza',
                description: '最好吃的pizza',
                options: [
                    {
                        size: 9,
                        price: 42
                    },
                    {
                        size: 12,
                        price: 59
                    }
                ]
            }
        }
        // 处理数据格式
        let dataSource = [];
        for (const key in data) {
            let item = data[key];
            dataSource.push({
                key: item.name,
                size: item.name
            });
            item.options.forEach((ele, index) => {
                dataSource.push({ ...ele, name: item.name, key: key + '-' + index });
            });
        }
        // console.log(dataSource);
        return (
            <Table pagination={false} className="menus-table"
                dataSource={dataSource} columns={columns}
            />
        )
    }
    renderCartTable() {
        const columns = [
            {
                key: 'count',
                title: '数量',
                dataIndex: 'count',
                render: (text, record) => {
                    return <div>
                        <Button className={style['cart-btn']} onClick={() => handleDecrese(record)}>-</Button>
                        <span>{record.count}</span>
                        <Button className={style['cart-btn']} onClick={() => handleIncrease(record)}>+</Button>
                    </div>
                }
            },
            {
                key: 'name',
                title: '菜单',
                dataIndex: 'name',
            },
            {
                key: 'price',
                title: '价格',
                dataIndex: 'price',
            }
        ]
        // console.log(this.state.cart)
        //减
        const handleDecrese = record => {
            let { cart } = this.state
            //获取当前点击的数据下标
            const index = cart.findIndex(item => item.key === record.key)
            // 当前点击数据对象
            const current = cart[index]
            // 当前数量<=1时，购物车商品移除，否则商品数量-1
            if (current.count <= 1) {
                cart.splice(index, 1)
            } else {
                cart.splice(index, 1, { ...current, count: current.count - 1 })
            }
            //更新状态
            this.setState({ cart })
        }
        // 加
        const handleIncrease = record => {
            let { cart } = this.state
            //获取当前点击的数据下标
            const index = cart.findIndex(item => item.key === record.key)
            // 当前点击数据对象
            const current = cart[index]
            // 当前数量+1
            cart.splice(index, 1, { ...current, count: current.count + 1 })
            //更新状态
            this.setState({ cart })
        }
        return (
            <Table pagination={false} className="menus-table"
                dataSource={this.state.cart} columns={columns}
                locale={{ emptyText: '购物车暂无商品' }}
            />
        )
    }
    render() {
        const totalPrice = this.state.cart.reduce(
            (total, item) => (total += item.price * item.count), 0)
        return (
            <Row>
                <Col sm={24} md={16}>{this.renderMenusTable()}</Col>
                <Col sm={24} md={8}>
                    {this.renderCartTable()}
                    <p className={style['total-price']}>总价：{totalPrice}</p>
                    <Button type="primary" className={style['submit-btn']}>提交</Button>
                </Col>
            </Row>
        )
    }
}