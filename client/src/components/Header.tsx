import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

interface IProps {
  title: string;
}
const MyHeader = (props: IProps) => ((
  <Header style={styles.header}>
    <h1 style={styles.h1}>
      { props.title }
    </h1>
  </Header>
));


const styles = {
  header: {
    background: '#fff',
    padding: 0
  },
  h1: {
    fontSize: 20,
    marginLeft: '40px',
    color: '#333'
  },
}

export default MyHeader;

