const TIME_THRESHOLD = 3000
const COPY_A = 'web copy'
const COPY_B = 'npm copy'

const functionStates = {
  copyNickname: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyEmail: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyPhone: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyCompany: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyAvatar: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyData: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copySegment: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyEvent: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyTrigger: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copySendMessage: {
    lastClickTime: null,
    useAlternateCopy: false
  },
  copyShowMessage: {
    lastClickTime: null,
    useAlternateCopy: false
  }
}

function getCopyType(funcName) {
  const currentTime = performance.now()
  const functionState = functionStates[funcName]

  if (functionState.lastClickTime !== null) {
    if (currentTime - functionState.lastClickTime < TIME_THRESHOLD) {
      functionState.useAlternateCopy = !functionState.useAlternateCopy
    } else {
      functionState.useAlternateCopy = false
    }
  }

  functionState.lastClickTime = currentTime
  return functionState.useAlternateCopy ? COPY_B : COPY_A
}

function copyNickname(value = '') {
  value = value || 'Keyser Söze'
  const copyType = getCopyType('copyNickname')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "user:nickname", ["${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setNickname("${value}")` }
  }
}

function copyEmail(value = '') {
  value = value || 'marty.mcfly@gmail.com'
  const copyType = getCopyType('copyEmail')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "user:email", ["${value}"]]);` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setEmail("${value}")` }
  }
}

function copyPhone(value = '') {
  value = value || '+33652435325'
  const copyType = getCopyType('copyPhone')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "user:phone", ["${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setPhone("${value}")` }
  }
}

function copyCompany(value = '') {
  value = value || 'Capsule Corp'
  const copyType = getCopyType('copyCompany')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "user:company", ["${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setCompany("${value}")` }
  }
}

function copyAvatar(value = '') {
  value = value || 'https://chrisp-sandbox.herokuapp.com/mcfly_pup.png'
  const copyType = getCopyType('copyAvatar')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "user:avatar", ["${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setAvatar("${value}")` }
  }
}

function copyData({ dataKey = '', dataValue = '' } = {}) {
  dataKey = dataKey || 'instrument'
  dataValue = dataValue || 'ocarina'
  const copyType = getCopyType('copyData')

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "session:data", ["${dataKey}", "${dataValue}"]])`
      }
    case COPY_B:
      return { copyType, copyValue: `Crisp.session.setData({${dataKey}: "${dataValue}"})` }
  }
}

function copySegment(value = '') {
  value = value || 'appaloosa'
  const copyType = getCopyType('copySegment')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "session:segments", ["${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.session.setSegments(["${value}"])` }
  }
}

function copyEvent(value = '') {
  value = value || 'event:mushroom'
  const copyType = getCopyType('copyEvent')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["set", "session:event", ["${value}"]]);` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.session.pushEvent("${value}")` }
  }
}

function copyTrigger(value = '') {
  value = value || 'welcome-donkey'
  const copyType = getCopyType('copyTrigger')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["do", "trigger:run", ["${value}"]]);` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.trigger.run("${value}")` }
  }
}

function copySendMessage(value = '') {
  value = (value || 'Hello world').replace(/\r?\n|\r/g, ' ')
  const copyType = getCopyType('copySendMessage')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["do", "message:send", ["text", "${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.message.sendText("${value}")` }
  }
}

function copyShowMessage(value = '') {
  value = (value || 'Show me the money').replace(/\r?\n|\r/g, ' ')
  const copyType = getCopyType('copyShowMessage')

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["do", "message:show", ["text", "${value}"]])` }
    case COPY_B:
      return { copyType, copyValue: `Crisp.message.show("text", "${value}")` }
  }
}

export default function useMethodCopier(id, value) {
  const copiers = {
    'session-nickname': () => copyNickname(value),
    'session-email': () => copyEmail(value),
    'session-phone': () => copyPhone(value),
    'session-company': () => copyCompany(value),
    'session-avatar': () => copyAvatar(value),
    'session-data': () => copyData(value),
    'session-segment': () => copySegment(value),
    event: () => copyEvent(value),
    trigger: () => copyTrigger(value),
    'send-message': () => copySendMessage(value),
    'show-message': () => copyShowMessage(value)
  }

  return copiers[id] ? copiers[id]() : null
}
