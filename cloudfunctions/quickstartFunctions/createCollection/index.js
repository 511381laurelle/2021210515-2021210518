const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const month= new Date().getMonth() +1;

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
    await db.createCollection('xiaozhii');
    await db.collection('xiaozhii').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        fileID:''
      }
    });
    await db.createCollection('xiaozhi');
    await db.collection('xiaozhi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        temperature: 20,
        air: '较差',
        city: '西宁',
        xiaozhi: month +'.'+ new Date().getDate()
      }
    });
    await db.collection('xiaozhi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        temperature: 24,
        air: '良好',
        city: '上海',
        xiaozhi: month +'.'+ new Date().getDate()
      }
    });
    await db.collection('xiaozhi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        temperature: 27,
        air: '一般',
        city: '河池',
        xiaozhi: month +'.'+ new Date().getDate()
      }
    });
    await db.collection('xiaozhi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        temperature: 26,
        air: '良好',
        city: '深圳',
        xiaozhi: month +'.'+ new Date().getDate()
      }
    });
    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'create collection success'
    };
  }
};
