export default (content, inject) => {
  const toast = (type, message, duration = 5000) => {
    return content.$toast[type](message, {
      position: 'bottom-right',
      duration
    })
  }

  inject('Toast', toast)
};
