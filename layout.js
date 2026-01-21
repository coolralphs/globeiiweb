window.layoutReady = (async function loadLayout() {
  const headerRes = await fetch('header.html');
  document.getElementById('header-placeholder').innerHTML =
    await headerRes.text();

  if (typeof loadHeader === 'function') {
    await loadHeader();
  }

  const footerRes = await fetch('footer.html');
  document.getElementById('footer-placeholder').innerHTML =
    await footerRes.text();
})();
