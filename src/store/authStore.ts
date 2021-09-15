import { action, computed, runInAction, makeAutoObservable } from 'mobx'
import AuthApi from '../apis/auth'
import { ILoginResult } from '../apis/types/auth'

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
        .then((res: ILoginResult) => {
          runInAction(() => {
            this.userInfo = res
            localStorage.setItem('userInfo', JSON.stringify(res))
            resolve('success')
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
