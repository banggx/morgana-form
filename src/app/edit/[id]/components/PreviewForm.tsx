import useGetComponents from '@/hooks/useGetComponents';
import { Modal } from 'antd'

interface PrviewFormProps {
  visible: boolean;
  onClose: () => void;
}
export default function PrviewForm(props: PrviewFormProps) {
  const { id } = useGetComponents()
  const { visible, onClose } = props;
  return <Modal
    open={visible}
    width={375}
    title={null}
    footer={null}
    centered
    closable={false}
    wrapClassName="preview-form-modal"
    style={{padding: 0}}
    onCancel={onClose}
  >
    <div className='w-full h-[747px] relative'>
      <img className='absolute inset-0' src="http://sgjihpx4q.hn-bkt.clouddn.com/ios2.png" />
      <div className='absolute bg-white top-[58px] left-[26px] right-[26px] bottom-[24px] z-10 rounded-b-3xl overflow-hidden'>
        <iframe className='w-full h-full overflow-auto' src={`/pages/${id}?preview=true`}></iframe>
      </div>
    </div>
  </Modal>
}