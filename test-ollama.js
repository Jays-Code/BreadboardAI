async function test() {
  const url = 'http://host.docker.internal:11434/api/tags';
  console.log('Testing fetch to:', url);
  try {
    const resp = await fetch(url);
    console.log('Status:', resp.status);
    const data = await resp.json();
    console.log('Success! Models found:', data.models?.length || 0);
  } catch (err) {
    console.error('Fetch failed:', err.message);
    if (err.cause) console.error('Cause:', err.cause);
  }
}
test();
