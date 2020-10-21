// 公共模板数据的所有接口集合
const ComRequest = require('../utils/util.js');

/**
 * 创建投票
 * @param {*} params data数据对象
 */
export const createVote = (params) => {
  return ComRequest.fetch(
    `/vote/createVote`,
    params,
    {}
  );
}
/*
* 查询投票列表
*/
export const queryVoteList =  (params) => {
  return ComRequest.fetch(
    `/vote/queryVoteList`,
    params,
    {}
  );
}
