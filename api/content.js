// 公共模板数据的所有接口集合
const ComRequest = require('../utils/util.js');
/**
 * 获取个人中心的订单状态列表
 * @param {*} params data数据对象
 */
export const getContentById = (params) => {
  return ComRequest.fetch(
    `/api/middleGroup/contentInfo/getContentByUserId`,
    params,
    {
      method: 'get'
    }
  );
}

export const getContentByContentId = (params) => {
  return ComRequest.fetch(
    `/api/middleGroup/contentInfo/getContentById`,
    params,
    {
      method: 'get'
    }
  );
}


export const getAllContent = (params) => {
  return ComRequest.fetch(
    `/vnode/content/queryAll`,
    params,
    {
      method: 'get'
    }
  );
}
