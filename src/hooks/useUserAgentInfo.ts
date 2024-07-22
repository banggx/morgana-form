import { useEffect, useState } from 'react'
import { userAgent, getIPs } from '@/utils/tools'
// @ts-ignore
import Fingerprint2 from 'fingerprintjs2sync';

export function useUserAgentInfo() {
  const ua = userAgent()
  const [ip, setIp] = useState<string>()

  useEffect(() => {
    getIPs().then(userIP => {
      setIp(userIP)
    })
  }, [])

  return {
    ua,
    ip,
  }
} 