import React from 'react';
import { Table } from 'antd';

export default function StopsTable (props) {

  const { onSelect, selectedId, ...rest } = props;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render:  (text, row) => {
        const {id} = row;
        return (
          <div
            style={{color: (selectedId === id ? 'red' : null), cursor: 'pointer'}}
            onClick={()=>onSelect(id)}>
            {text}
          </div>
        )
      }
    },
  ];

  return <Table columns={columns} pagination={false} {...rest} />;

}
