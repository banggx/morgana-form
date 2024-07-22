import { Input, Space, Button, message, Popover, QRCode } from 'antd'
import { QrCodeIcon, Copy } from 'lucide-react'
import useGetProject from '@/hooks/useGetProject'
import copy from 'copy-to-clipboard'

export default function PreviewLink() {
  const { id } = useGetProject()
  const previewLink = `${location.origin}/pages/${id}`

  const copyLink = () => {
    const copySuccess =copy(previewLink)
    copySuccess && message.success('链接已复制')
  }

  return <Space.Compact className='w-96'>
    <Input value={previewLink} readOnly />
    <Popover content={<QRCode value={previewLink} />}>
      <Button icon={<QrCodeIcon size={16} />}></Button>
    </Popover>
    <Button type='primary' icon={<Copy size={16} />} onClick={copyLink}></Button>
  </Space.Compact>
}