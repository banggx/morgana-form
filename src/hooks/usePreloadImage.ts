import { useState, useEffect } from 'react'

export default function usePreloadImage(imgUrls: string[]) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      if (!imgUrls.length) return

      setIsLoading(true)
      const promises = []
      let currentIndex = 0

      const loadNextImage = () => {
        if (currentIndex >= imgUrls.length) return;
        
        const img = new Image()
        img.src = imgUrls[currentIndex]
        return new Promise<void>((resolve) => {
          img.onload = () => {
            resolve()
            currentIndex++;
            loadNextImage();
          }
          img.onerror = () => {
            resolve()
            currentIndex++;
            loadNextImage();
          }
        })
      }

      const maxConcurrentRequests = 5;
      for (let idx = 0; idx < maxConcurrentRequests; idx++) {
        promises.push(loadNextImage())
      }

      await Promise.all(promises)
      setIsLoading(false)
    }

    preloadImages()
  }, [imgUrls])

  return isLoading
}