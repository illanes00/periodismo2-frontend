// Periodismo2 Service Worker — Push notifications only

self.addEventListener('push', (event) => {
  if (!event.data) return

  let data
  try {
    data = event.data.json()
  } catch {
    data = { title: 'Periodismo2', body: event.data.text() }
  }

  const options = {
    body: data.body || '',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: data.tag || 'p2-notification',
    data: { url: data.url || '/' },
  }

  event.waitUntil(self.registration.showNotification(data.title || 'Periodismo2', options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(clients.openWindow(url))
})
