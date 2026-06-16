import { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, message, Checkbox } from 'antd';
import { trpcClientReact } from '@/utils/apis';
import { useGetProject } from '@/hooks/useGetProject';
import { cn } from '@/lib/utils';
import { FormStatusBadge } from '@morgana/components';
import { useQueryClient } from '@tanstack/react-query';

interface FormListTableProps {
  forms: any[];
}

export default function FormListTable({ forms }: FormListTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const queryClient = useQueryClient();
  const { id } = useGetProject();

  const { mutateAsync: archiveForms } = trpcClientReact.form.archiveForms.useMutation();
  const { mutateAsync: restoreForms } = trpcClientReact.form.restoreForms.useMutation();
  const { mutateAsync: deleteFormsPermanently } = trpcClientReact.form.deleteFormsPermanently.useMutation();

  const handleArchive = async () => {
    try {
      const result = await archiveForms({ formIds: selectedRowKeys.map(Number) });
      message.success(`成功归档 ${result.successCount} 个表单`);
      if (result.failedCount > 0) {
        message.warning(`归档失败 ${result.failedCount} 个：${result.failedIds.join(', ')}`);
      }
      setSelectedRowKeys([]);
      queryClient.invalidateQueries({ queryKey: ['listVersionForms'] });
    } catch (e) {
      message.error('归档失败，请重试');
    }
  };

  const handleRestore = async () => {
    try {
      const result = await restoreForms({ formIds: selectedRowKeys.map(Number) });
      message.success(`成功还原 ${result.successCount} 个表单`);
      if (result.failedCount > 0) {
        message.warning(`还原失败 ${result.failedCount} 个：${result.failedIds.join(', ')}`);
      }
      setSelectedRowKeys([]);
      queryClient.invalidateQueries({ queryKey: ['listVersionForms'] });
    } catch (e) {
      message.error('还原失败，请重试');
    }
  };

  const handleDeletePermanently = async () => {
    if (!window.confirm('确定要永久删除所选表单？此操作不可恢复')) return;
    try {
      const result = await deleteFormsPermanently({ formIds: selectedRowKeys.map(Number) });
      message.success(`成功永久删除 ${result.successCount} 个表单`);
      if (result.failedCount > 0) {
        message.warning(`删除失败 ${result.failedCount} 个：${result.failedIds.join(', ')}`);
      }
      setSelectedRowKeys([]);
      queryClient.invalidateQueries({ queryKey: ['listVersionForms'] });
    } catch (e) {
      message.error('永久删除失败，请重试');
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = [
    {
      title: '选择',
      key: 'selection',
      render: (_: any, record: any) => (
        <Checkbox value={record.id} />
      ),
      width: 50,
    },
    {
      title: '表单名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <FormStatusBadge status={status} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small" disabled={record.status !== 'archived'} onClick={() => restoreForms({ formIds: [record.id] })}>还原</Button>
          <Button type="link" size="small" danger disabled={record.status !== 'archived'} onClick={() => deleteFormsPermanently({ formIds: [record.id] })}>彻底删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button type="primary" onClick={handleArchive} disabled={selectedRowKeys.length === 0 || selectedRowKeys.some(id => forms.find(f => f.id === Number(id))?.status !== 'published')}>
            归档
          </Button>
          <Button type="default" onClick={handleRestore} disabled={selectedRowKeys.length === 0 || selectedRowKeys.some(id => forms.find(f => f.id === Number(id))?.status !== 'archived')} className="ml-2">
            还原
          </Button>
          <Button type="dashed" danger onClick={handleDeletePermanently} disabled={selectedRowKeys.length === 0 || selectedRowKeys.some(id => forms.find(f => f.id === Number(id))?.status !== 'archived')} className="ml-2">
            彻底删除
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={forms}
        pagination={false}
      />
    </div>
  );
}
