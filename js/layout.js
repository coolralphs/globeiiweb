// js/layout.js
window.layoutReady = new Promise(async (resolve, reject) => {
  try {
    // Load header
    const headerRes = await fetch('components/header.html');
    document.getElementById('header-placeholder').innerHTML = await headerRes.text();

    // Load header.js AFTER header HTML is injected
    await new Promise((res) => {
      const script = document.createElement('script');
      script.src = 'js/header.js'; // ✅ corrected path
      script.onload = res;
      document.body.appendChild(script);
    });

    // Load footer
    const footerRes = await fetch('components/footer.html');
    document.getElementById('footer-placeholder').innerHTML = await footerRes.text();

    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Layout is ready
    resolve();
  } catch (err) {
    reject(err);
  }
});