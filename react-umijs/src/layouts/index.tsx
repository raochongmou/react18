import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.less';

const layouts = (props: any) => {
  return <div>
    layout组件<br />
    {/* <Link to={'/login/list'}>list界面</Link>
    <Link to={'/login/profile'}>profile界面</Link> */}
    <NavLink to={'/login/list'}>list界面</NavLink>&nbsp;&nbsp;
    <NavLink to={'/login/profile'}>profile界面</NavLink>
    {props.children}
  </div>;
};

export default layouts
