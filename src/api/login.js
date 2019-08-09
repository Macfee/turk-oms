import request from '../utils/requests'

export function login(data) {

  return request({
    url: '/v1/user/login',
    method: 'post',
    data
  });
}

export function GetUserInfo() {
  return request({
    url: '/v1/user/my',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/v1/logout',
    method: 'post'
  })
}
