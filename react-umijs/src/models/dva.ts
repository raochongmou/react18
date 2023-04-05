// import { request } from 'umi'
import { getData } from "@/network/login";
export default {
  namespace: 'dva',//命名空间

  state: {
    num: [
      {id: '006',name: 'curry', age: 35}
    ]
  },//状态,相当于redux中的state

  effects: {
    *getData({payload}: any, {put,call}: any) {
      const { data: res } = yield call(getData);
      // const { data: res } = yield call(request, 'api/login');
      // yield res
      // 同一个模块内不需要加namespace
      yield put({type: 'setDvaData', payload: res || []});
    }
  },//调用服务端的接口获取数据

  reducers: {
    setDvaData(state: any, action: any) {
      const { payload } = action;
      return [...state.num, ...payload];
    }
  },//纯函数,更新状态
}
