async function loadLayout() {
  // Load header
  const headerRes = await fetch('header.html');
  const headerHtml = await headerRes.text();
  document.getElementById('header-placeholder').innerHTML = headerHtml;

  // Header auth logic
  if (typeof loadHeader === 'function') {
    await loadHeader();
  }

  // Load footer
  const footerRes = await fetch('footer.html');
  const footerHtml = await footerRes.text();
  document.getElementById('footer-placeholder').innerHTML = footerHtml;
}

// Auto-run
loadLayout();
