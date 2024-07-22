export enum Unit {
  PX = 'px',
  PERCENT = '%',
  EM = 'em',
  REM = 'rem',
  VH = 'vh',
  VW = 'vw'
}

export interface CircleStyle {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface WithUnitNumber {
  value: number;
  unit: Unit;
}

export interface BorderStyle {
  color: string;
  width: number | CircleStyle;
  style: 'solid' | 'dashed' | 'dotted' | 'none',
  radius: number | CircleStyle;
}

export interface TextStyle {
  color: string;
  size: WithUnitNumber;
  align: 'left' | 'center' | 'right';
  weight: string | number;
  style: 'normal' | 'italic' | 'oblique';
  decoration: 'none' | 'underline' | 'line-through' | 'overline';
}

export interface BackgroundStyle {
  type: 'color' | 'image' | 'gradient';
  color?: string;
  image?: string;
  size?: string;
  postion?: string;
  repeat?: string;
  gradientType?: 'linear' | 'radial';
  gradientColor?: {color: string; position: number}[];
  direction?: string;
  angle?: number;
}

export interface SizeStyle {
  width?: WithUnitNumber;
  height?: WithUnitNumber;
}

export type Display = 'block' | 'inline-block' | 'none';
export interface LayoutStyle {
  size: SizeStyle;
  display: Display;
  margin: {
    padding: CircleStyle;
    margin: Partial<Record<keyof CircleStyle, number | 'auto'>>;
  }
}

export interface CommonStyleProps {
  layout?: boolean | LayoutStyle;
  border?: boolean | BorderStyle;
  text?: boolean | TextStyle;
  background?: boolean | BackgroundStyle;
}