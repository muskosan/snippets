document.addEventListener('DOMContentLoaded', function () {

  // Download URLs
  const downloadUrls = {
    windows: 'https://myliodownloads.com/Mylio_x64.msix',
    arm: 'https://myliodownloads.com/Mylio_arm64.msix',
    mac: 'https://myliodownloads.com/Mylio.dmg',
    ios: 'https://itunes.apple.com/us/app/mylio/id908787435?mt=8',
    android: 'https://play.google.com/store/apps/details?id=com.myliollc.mylio&hl=en'
  };

  // Detect platform and assign download metadata
  function getDownloadMeta() {
    const ua = window.navigator.userAgent;
    const isTouchMac = navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1;

    if (/iPhone|iPad|iPod/.test(ua) || isTouchMac) {
      return {
        text: 'Download for iPhone/iPad',
        details: 'iOS 16 and later',
        url: downloadUrls.ios
      };
    } else if (/Mac OS X/.test(ua)) {
      return {
        text: 'Download for Mac',
        details: 'macOS 11 and later',
        url: downloadUrls.mac
      };
    } else if (/Windows/.test(ua)) {
      const surfacePro = document.querySelector('.surface-pro');
      if (surfacePro) surfacePro.classList.remove('hidden');

      return {
        text: 'Download for Windows',
        details: 'Windows 10 version 21H2 and later; 64-bit only',
        url: `${downloadUrls.windows}?${utms || ''}`
      };
    } else if (/Linux|CrOS/.test(ua)) {
      return {
        text: 'Download for Android',
        details: 'Android 11 and later',
        url: downloadUrls.android
      };
    }
    return null;
  }

  // Update UI with platform-specific info
  function applyDownloadMeta(meta) {
    if (!meta) return;

    document.querySelectorAll('.download, .download-button').forEach(el => {
      el.setAttribute('href', meta.url);
    });

    const anchorText = document.querySelector('.download-button .x-anchor-text-primary');
    if (anchorText) anchorText.textContent = meta.text;

    const osDetails = document.querySelector('.os-details');
    if (osDetails) osDetails.textContent = meta.details;

    const armDownload = document.querySelector('.arm-download');
    if (armDownload) armDownload.setAttribute('href', downloadUrls.arm);
  }

  // Trigger Arrow animation on click
  function bindArrowEffect() {
    const downloadButtons = document.querySelectorAll('.download');
    downloadButtons.forEach(button => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          if (typeof Arrow !== 'undefined' && Arrow.show) {
            Arrow.show(3000);
          }
        }, 1000);
      });
    });
  }

  // Load script dynamically (replacement for $.getScript)
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Init
  function initDownloadFlow() {
    const meta = getDownloadMeta();
    applyDownloadMeta(meta);

    loadScript("/js/arrow.js", bindArrowEffect);
  }

  // Give just a tiny timeout for some dome hiccups
  setTimeout(initDownloadFlow, 250);

});
