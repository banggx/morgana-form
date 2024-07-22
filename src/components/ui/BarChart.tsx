'use client'
import React from 'react'
import { Column, type ColumnConfig } from '@ant-design/charts'
import { assign } from 'radash'
import useGetGlobal from '@/hooks/useGetGlobal'

interface PieDataItem {
  type: string;
  value: number;
}
interface PieProps {
  dataSource: PieDataItem[];
}

export default function PieChart(props: PieProps & Partial<Omit<ColumnConfig, keyof PieProps>>) {
  const { title, dataSource, ...pieConfig } = props
  const { theme } = useGetGlobal()
  const config = {
    theme: theme === 'dark' ? 'classicDark' : 'classic',
    data: dataSource,
    xField: 'type',
    yField: 'value',
    legend: false,
  };

  return <Column {...assign(config, pieConfig as any)} />
}