import { login, logout, GetUserInfo } from '../../api/login'
import { getToken, setToken, removeToken } from '../../utils/auth'
import request from '../../utils/requests'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    routers: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
      state.routers = roles;
    }
  },
  actions: {
    LoginByUsername({ commit, state }, userInfo) { // 登录、获取用户信息
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          setToken(response.access_token);
          commit('SET_TOKEN', response.access_token);
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        request({ url: '/v1/user/my', method: 'get', data: {} }).then(response => {
          debugger;
          commit('SET_ROLES', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve()
      })
    }
  }
}
export default user
