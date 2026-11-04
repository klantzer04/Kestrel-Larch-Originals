// Desktop navigation remains visible; mobile uses the native details disclosure.
const navigation = document.querySelector('.navigation');
if (navigation) {
  const desktop = window.matchMedia('(min-width: 900px)');
  const syncNavigation = () => { navigation.open = desktop.matches; };
  syncNavigation();
  desktop.addEventListener('change', syncNavigation);
  navigation.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !desktop.matches) {
      navigation.open = false;
      navigation.querySelector('summary').focus();
    }
  });
}
