// Little function to append any additional utm_params to all hrefs on specific pages. 
// Meant for specific internal tracking

// Define which URLS should update the CTA's with utm_ params.
function appendParams(utms, utmsUrls = ['personal', 'business']) {
  const currentUrl = window.location.href;

  // Check if any item in the utmsUrls array is found in the current URL
  if (utmsUrls.some(utm => currentUrl.includes(utm))) {
    const links = document.querySelectorAll(".cta");

    links.forEach(link => {
      let href = link.getAttribute("href");

      if (href) {
        // check url for preexisting ?; append either ? and or & 
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute("href", href + separator + utms);
      }
    });
  }
}
appendParams();