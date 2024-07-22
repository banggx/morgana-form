import { type ThemeConfig } from 'antd'

export const AntdThemeConfig: ThemeConfig = {
  hashed: false,
  token: {
    colorPrimary: 'rgb(8 145 178)'
  },
  components: {
    Tabs: {
      verticalItemPadding: '8px 12px',
      horizontalItemPadding: '6px 0',
      horizontalItemGutter: 16,
      paddingLG: 12,
      colorBorder: 'rgb(241 245 249)',
    },
    Modal: {
      marginXS: 24
    },
    Card: {
      paddingLG: 16
    }
  }
}

export const DarkAntdThemeConfig: ThemeConfig = {
  token: {
    colorBorder: 'rgb(156, 163, 175, 0.8)',
    colorBgContainer: 'rgba(17, 24, 39, 0.8)',
    colorBorderSecondary: 'rgb(107, 114, 128)',
    colorText: 'rgba(249, 250, 251, 0.8)',
    colorTextDisabled: 'rgba(243, 244, 246, 0.5)',
    colorTextDescription: 'rgba(209, 213, 219, 0.6)',
    colorFillTertiary: 'rgb(30, 41, 59)',
    colorTextPlaceholder: 'rgb(148, 163, 184)',
    colorBgElevated: 'rgb(30, 41, 59)',
    colorTextQuaternary: 'rgb(71, 85, 105)',
    colorTextTertiary: 'rgb(100, 116, 139)'
  },
  components: {
    Button: {
      primaryShadow: 'rgb(17, 24, 39)',
      dangerShadow: 'rgb(127, 29, 29)',
    },
    Tabs: {
      itemColor: 'rgb(243, 244, 246)',
      itemActiveColor: 'rgb(8, 145, 178)',
      verticalItemPadding: '8px 12px',
      horizontalItemPadding: '6px 0',
      horizontalItemGutter: 16,
      paddingLG: 12,
    },
    Pagination: {
      colorTextDisabled: 'rgb(243, 244, 246)'
    },
    Table: {
      rowHoverBg: 'rgba(30, 41, 59, 0.8)',
      rowSelectedBg: 'rgba(22, 78, 99, 0.8)',
      rowSelectedHoverBg: 'rgba(21, 94, 117, 0.8)'
    },
    Modal: {
      contentBg: 'rgb(15, 23, 42)',
      headerBg: 'rgb(15, 23, 42)',
    },
    Select: {
      optionSelectedBg: 'rgb(71, 85, 105)'
    },
    Rate: {
      colorText: 'rgb(71, 85, 105)'
    }
  }
}