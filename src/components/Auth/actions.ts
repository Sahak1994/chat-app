export const sendRequestToAuth = (
  url: string,
  body: string,
) => {
  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
    })
}
