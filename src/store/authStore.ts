import { action, runInAction, makeAutoObservable } from 'mobx'
import AuthApi from '../apis/auth'
import { ILoginResult } from '../apis/types/auth'
import { message } from 'antd';

class AuthStore {
  //es7的装饰器语法
  userInfo: ILoginResult | null

  //mobx版本6之后的更新需要显式加入makeAutoObservable
  constructor() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    console.log(this.userInfo)
    makeAutoObservable(this)
  }

  //用于绑定this 去除bound this指向的就不是容器的实例对象
  @action.bound
  login(phone: string, password: string) {
    return new Promise((resolve, reject) => {
      AuthApi.login({
        phone,
        password,
      })
        .then((res: any) => {
          runInAction(() => {
            console.log(res)
            if (res.code === 400) {
              message.warning('账号或者密码不正确',3);
            } else {
              this.userInfo = res
              localStorage.setItem('userInfo', JSON.stringify(res))
              resolve('success')
            }
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  @action.bound
  logout() {
    return new Promise((resolve, reject) => {
      this.userInfo = null
      localStorage.removeItem('userInfo')
    })
  }
}

export default AuthStore
