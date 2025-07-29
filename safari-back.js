// Safari has strange behavior with leaving css class-animated dom elements rendered 'hanging'
// For those specific elements, this little function removes animated class to prevent hanging on browser navigation.

function resetPageUI() {
  document.body.classList.add("unloaded");
  document.querySelectorAll('.x-anchor-menu-item, .sub-menu.x-dropdown').forEach(el => {
    el.classList.remove('x-active', 'x-active-animate');
  });
}

["pagehide", "pageshow"].forEach(event => {
  window.addEventListener(event, resetPageUI);
});
