import { Badge, Tag } from 'antd';
import { cn } from '@/lib/utils';

interface FormStatusBadgeProps {
  status: string;
}

const statusMap = {
  draft: { text: '草稿', color: 'default' },
  published: { text: '已发布', color: 'success' },
  archived: { text: '已归档', color: 'warning' },
  deleted: { text: '已删除', color: 'error' },
};

export function FormStatusBadge({ status }: FormStatusBadgeProps) {
  const badge = statusMap[status as keyof typeof statusMap] || statusMap.draft;
  return <Tag color={badge.color}>{badge.text}</Tag>;
}

export default FormStatusBadge;
