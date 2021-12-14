onmessage = (message) => {
  switch (message.data.action) {
    case 'make':
      postMessage({
        action: message.data.action,
        // extra
      })
      break
  }
}
