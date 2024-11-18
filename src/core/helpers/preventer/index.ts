export function preventContextMenu(event: React.MouseEvent<HTMLElement>): void {
  event.preventDefault()
}

export function preventKeyboardEvent(
  event: React.KeyboardEvent<HTMLElement>,
): void {
  console.log('event', event)
  // Block F12
  if (event.key === 'F12') event.preventDefault()

  // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key)) {
    event.preventDefault()
  }

  // Block Ctrl+U (View Source)
  if (event.ctrlKey && event.key === 'U') event.preventDefault()
}
