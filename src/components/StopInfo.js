import React from 'react';
import { Card, Table } from "antd";
import Title from "antd/es/typography/Title";
import moment from 'moment';

export default function StopInfo(props){

  const { dataSource, loading } = props;
  const { stop, departures, dateTime} = dataSource || {};

  const columns = [
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Until',
      dataIndex: 'min_until',
      key: 'min_until',
      render:(text)=>{
        return `${text}.min`
      }
    },
    {
      title: 'Scheduled',
      dataIndex: 'scheduled',
      key: 'scheduled',
      render: (text)=>{
        if (text)
          return moment(text).format('LT');
        return '-';
      }
    },{
      title: 'Estimated',
      dataIndex: 'estimated',
      key: 'estimated',
      render: (text)=>{
        if (text)
          return moment(text).format('LT');
        return '-';
      }
    },
  ];

  return(
    <div>
      <div style={{textAlign: "left"}}>
        <Card loading={loading} >
          <b>Name:</b> {stop ? stop.name : ''}
          <br/>
          <b>Date:</b> {moment(dateTime).format('LL')}
        </Card>
      </div>
      <Title level={3}>Departures</Title>
      <Table dataSource={departures || []} columns={columns} pagination={false} loading={loading} />
    </div>);
}
