const urls = [
  'https://jattiphrswan.github.io/fintech-/why%20choose%20us.png',
  'https://jattiphrswan.github.io/fintech-/why choose us.png',
  'https://jattiphrswan.github.io/fintech-/card1.png',
  'https://jattiphrswan.github.io/fintech-/favicon.svg',
  'https://jattiphrswan.github.io/fintech-/travels%20cards.png',
  'https://jattiphrswan.github.io/fintech-/payments.png'
];

for (const u of urls) {
  try {
    const res = await fetch(u);
    console.log(`${res.status} ${res.headers.get('content-type')} -> ${u}`);
  } catch (e) {
    console.log(`ERROR ${u}: ${e.message}`);
  }
}
