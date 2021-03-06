// 公共模板数据的所有接口集合
const ComRequest = require('../utils/util.js');

/**
 * 用户登录
 * @param {*} params data数据对象
 */
export const toLogin = (params) => {
  return ComRequest.fetch(
    `/users/userLogin`,
    params,
    {}
  );
}