import { ref } from 'vue'

const defaultBannerOptions = {
  visibility: false,
  message: '',
  action: '',
  type: '',
  animate: false
}

const bannerOptions = ref({ ...defaultBannerOptions })
let timerID = null // Declare variable to store timer ID

function displayBanner(options) {
  // Clear previous timer before displaying new banner
  if (timerID) {
    clearTimeout(timerID)
    timerID = null
  }

  // If a banner is already visible and the type is the same, update the message and action without closing
  if (bannerOptions.value.visibility && bannerOptions.value.type === options.type) {
    bannerOptions.value = {
      ...bannerOptions.value,
      ...options
    }
  }
  // If a banner is visible but the type is different, close then open with new options
  else if (bannerOptions.value.visibility) {
    closeBanner()
    setTimeout(() => {
      bannerOptions.value = {
        ...bannerOptions.value,
        ...options,
        visibility: true
      }
    }, 300)
  }
  // If no banner is visible, just open the new banner
  else {
    bannerOptions.value = {
      ...bannerOptions.value,
      ...options,
      visibility: true
    }
  }

  if (options.animate) {
    timerID = setTimeout(() => {
      closeBanner()
    }, 5000)
  }
}

function closeBanner() {
  // Clear timer when closing banner
  if (timerID) {
    clearTimeout(timerID)
    timerID = null
  }

  bannerOptions.value = { ...defaultBannerOptions }
}

export function useBanner() {
  return {
    bannerOptions,
    displayBanner,
    closeBanner
  }
}
