import styles from './index.less';
import { Button } from 'antd';
import { useEffect } from 'react';
import { history, request } from 'umi';

export default function IndexPage(props: any) {
  // useEffect(() => {
  //   setTimeout(() => {

  //     // props.history.push('/login');
  //     history.push('/login');
  //     console.log('useEffect');
  //   }, 3000)
  // }, [])
  const getData = async() => {
    // const { data: res } = await request('/api/login');
    const res = await request('/api/users');
    console.log(res);
  }
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type='primary' onClick={getData}>获取数据</Button>
    </div>
  );
}
