const beforeMountHandler = (el, binding) => {
  console.log(el)
  el.clickOutsideEvent = (event) => {
    if (!(el == event.target || el.contains(event.target))) {
      binding.value()
    }
  }
  document.addEventListener('click', el.clickOutsideEvent)
}

const unmountedHandler = (el) => {
  document.removeEventListener('click', el.clickOutsideEvent)
}

export const ClickOutside = {
  beforeMount: beforeMountHandler,
  unmounted: unmountedHandler
}
