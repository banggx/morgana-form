import { ComponentGroup } from "../constants";

export interface CommonProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  onChange?: (value: any) => void;
}

export interface ComponentItem {
  component: React.ComponentType<any>;
  meta: {
    name: string;
    type: string;
    group: ComponentGroup;
    dataForm?: Record<string, any>;
    styleForm?: Record<string, any>;
    commonStyle?: Record<string, any>;
    tableRender?: (text: any) => JSX.Element;
    chart?: {
      chart: string;
    }
  }
}