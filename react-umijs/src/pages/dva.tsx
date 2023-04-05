import { getMenuData } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { connect, request } from 'umi';
import { Button } from 'antd';


const dva:any = (props: any) => {
  useEffect(() => {
    // getData();
    // props.dispatch({type:'dva/getData', payload: "我是ui组件传过来的payload"});
  }, []);
  // const getData = async() => {
  //   const { data: res } = await request('api/login');
  //   props.dispatch({type: 'dva/setDvaData', payload: res});
  // }
  const getData = () => {
    props.dispatch({type:'dva/getData', payload: "我是ui组件传过来的payload"});
  }
  let {state: { dva } } = props;
  dva = Array.from(dva) || [];

  return (
    <div>
      <Button onClick={getData}>获取数据</Button>
      <ul>
        {
          dva.map(item => {
            return <li key={item.id}>姓名:{item.name}, 年龄:{item.age}</li>
          })
        }
      </ul>
    </div>
  )
};

const mapStateToProps = (state: any) => ({state});

export default connect(mapStateToProps)(dva);
