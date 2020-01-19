import React, { Component } from 'react'
import style from './account.scss'
import Logo from 'Assets/icon.png'
import { Form, Input, Button } from 'antd'
import { email_reg, pwd_reg } from "../../utils/Regexp.js";
import Request from "../../utils/Request";
// import * as apis from '../../services/Services'

class Register extends Component {
    state = {
        email: '1234567@qq.com'
    }
    validatorEmail = (rule, value, callback) => {
        if (value && rule.pattern && !value.match(rule.pattern)) {
            callback(rule.message);
        } else {
            callback();
        }
    }
    // 自定义校验两次密码是否一致
    validatorPwd = (rule, value, callback) => {
        if (value !== this.props.form.getFieldValue('pwd')) {
            callback(rule.message);
            return;
        }
        callback();
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, pwd } = values
                this.props.history.push('/login')
                Request('/users.json', {
                    method: 'POST', data: { email, pwd },
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => {
                    console.log(res, 'res...')
                })
                // apis.Reg({email,pwd}).then(res => {
                //     console.log(res, 'res')
                // })    
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className={style.account}>
                <img src={Logo} alt="my logo" className={style.logo} />
                <Form className="account-form">
                    <Form.Item label="邮箱">
                        {
                            getFieldDecorator('email', {
                                // initialValue: this.state.email
                                rules: [
                                    { required: true, message: '邮箱不能为空，请输入邮箱' },
                                    // { type: 'email', message: '请输入正确邮箱格式，如:123456@qq.com' }
                                    { pattern: email_reg, validator: this.validatorEmail, message: '请输入正确邮箱格式，如:123456@qq.com' }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('pwd', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空，请输入密码！'
                                },
                                {
                                    pattern: pwd_reg,
                                    validator: this.validatorForm,
                                    message:
                                        '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                                }
                            ]
                        })(
                            <Input
                                maxLength={16}
                                type="password"
                                placeholder="请输入6-16位字母、数字或特殊字符的密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('aPwd', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空，请输入密码！'
                                },
                                {
                                    pattern: pwd_reg,
                                    validator: this.validatorForm,
                                    message:
                                        '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                                },
                                {
                                    validator: this.validatorPwd,
                                    message: '两次输入的密码不一致！'
                                }
                            ]
                        })(
                            <Input
                                maxLength={16}
                                type="password"
                                placeholder="请输入确认密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleSubmit} className="btn" type="primary">注册</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Register)
