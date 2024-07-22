import { ImageProps } from './interface'

export default function Image(props: ImageProps) {
  return <img {...props} className='w-full' />
}