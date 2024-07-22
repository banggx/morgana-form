
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export function userAgent () {
  let browserReg: Record<string, RegExp> = {
    Chrome: /Chrome/,
    IE: /MSIE/,
    Firefox: /Firefox/,
    Opera: /Presto/,
    Safari: /Version\/([\d.]+).*Safari/,
    '360': /360SE/,
    QQBrowswe: /QQ/,
    Edge: /Edg/
  };
  let deviceReg: Record<string, RegExp> = {
    iPhone: /iPhone/,
    iPad: /iPad/,
    Android: /Android/,
    Windows: /Windows/,
    Mac: /Macintosh/,
  };
  let userAgentStr = navigator.userAgent
  const userAgentObj = {
    browserName: '', // 浏览器名称
    browserVersion: '', // 浏览器版本
    osName: '', // 操作系统名称
    osVersion: '', // 操作系统版本
    deviceName: '', // 设备名称
  }
  for (let key in browserReg) {
    if (browserReg[key].test(userAgentStr)) {
      userAgentObj.browserName = key
      if (key === 'Chrome') {
        userAgentObj.browserVersion = userAgentStr.split('Chrome/')[1].split(' ')[0]
      } else if (key === 'IE') {
        userAgentObj.browserVersion = userAgentStr.split('MSIE ')[1].split(' ')[1]
      } else if (key === 'Firefox') {
        userAgentObj.browserVersion = userAgentStr.split('Firefox/')[1]
      } else if (key === 'Opera') {
        userAgentObj.browserVersion = userAgentStr.split('Version/')[1]
      } else if (key === 'Safari') {
        userAgentObj.browserVersion = userAgentStr.split('Version/')[1].split(' ')[0]
      } else if (key === '360') {
        userAgentObj.browserVersion = ''
      } else if (key === 'QQBrowswe') {
        userAgentObj.browserVersion = userAgentStr.split('Version/')[1].split(' ')[0]
      } else if (key === 'Edge') {
        userAgentObj.browserVersion = userAgentStr.split('Edg/')[1].split(' ')[0]
      }
    }
  }

  for (let key in deviceReg) {
    if (deviceReg[key].test(userAgentStr)) {
      userAgentObj.osName = key
      if (key === 'Windows') {
        userAgentObj.osVersion = userAgentStr.split('Windows NT ')[1].split(';')[0]
      } else if (key === 'Mac') {
        userAgentObj.osVersion = userAgentStr.split('Mac OS X ')[1].split(')')[0]
      } else if (key === 'iPhone') {
        userAgentObj.osVersion = userAgentStr.split('iPhone OS ')[1].split(' ')[0]
      } else if (key === 'iPad') {
        userAgentObj.osVersion = userAgentStr.split('iPad; CPU OS ')[1].split(' ')[0]
      } else if (key === 'Android') {
        userAgentObj.osVersion = userAgentStr.split('Android ')[1].split(';')[0]
        userAgentObj.deviceName = userAgentStr.split('(Linux; Android ')[1].split('; ')[1].split(' Build')[0]
      }
    }
  }
  return userAgentObj
}

export const getIPs = () => {
  return new Promise<string>((resolve) => {
    const ip_dups: any = {};
    const RTCPeerConnection: any = (window as any).RTCPeerConnection
      || (window as any).mozRTCPeerConnection
      || (window as any).webkitRTCPeerConnection;
    const mediaConstraints = {
      optional: [{ RtpDataChannels: true }]
    };
    const servers = {
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
      ]
    };
    const pc = new RTCPeerConnection(servers, mediaConstraints);
    function handleCandidate (candidate: any) {
      const ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
      const hasIp = ip_regex.exec(candidate)
      if (hasIp) {
        const ip_addr = (ip_regex.exec(candidate) as any)[1];
        if (ip_dups[ip_addr] === undefined)
          resolve(ip_addr);
        ip_dups[ip_addr] = true;
      }
    }
    pc.onicecandidate = function (ice: any) {
      if (ice.candidate) {
        handleCandidate(ice.candidate.candidate);
      }
    };
    pc.createDataChannel("");
    pc.createOffer(function (result: any) {
      pc.setLocalDescription(result, function () { }, function () {});
    }, function () {});
    setTimeout(function () {
      var lines = pc.localDescription?.sdp.split('\n');
      lines?.forEach(function (line: any) {
        if (line.indexOf('a=candidate:') === 0)
          handleCandidate(line);
      });
    }, 1000);
  })
}

export const getFingerPrintID = async () => {
  const fpPromise = await FingerprintJS.load();
  const result = await fpPromise.get();
  return result.visitorId;
}