import { useEffect, useState } from 'react'
import { debounce } from 'radash'

export function useScrollEffect(offset = 0) {
  const [opacity, setOpacity] = useState(0)

  const _handleScroll = () => {
    const screenHeight = window.screen.height
    const scrollPosition = window.scrollY
    setOpacity(Math.min(1, (scrollPosition + offset) / screenHeight))
  }
  const handleScroll = debounce({ delay: 20 }, _handleScroll)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return opacity
}