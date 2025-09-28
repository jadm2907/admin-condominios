import React from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const SectionTable = ({ title, dataSource, columns, rowKey, onAdd }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }} onClick={onAdd}>
        Nuevo
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No hay datos disponibles" }}
      />
    </div>
  );
};

export default SectionTable;