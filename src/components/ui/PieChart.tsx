'use client'
import React from 'react'
import { Pie, type PieConfig } from '@ant-design/charts'
import { assign } from 'radash'
import useGetGlobal from '@/hooks/useGetGlobal'

interface PieDataItem {
  type: string;
  value: number;
}
interface PieProps {
  dataSource: PieDataItem[];
  title?: string;
}

export default function PieChart(props: PieProps & Partial<Omit<PieConfig, keyof PieProps>>) {
  const { title, dataSource, ...pieConfig } = props
  const { theme } = useGetGlobal()
  const config = {
    theme: theme === 'dark' ? 'classicDark' : 'classic',
    autoFit: true,
    data: dataSource,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'type',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        position: 'bottom',
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    annotations: props.title ? [
      {
        type: 'text',
        style: {
          text: title,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ] : [],
  };

  return <Pie {...assign(config, pieConfig as any)} />
}