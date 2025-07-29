<?
// Wordpress function: check what country the user is coming from, and redirect accordingly. Effective geo fence.
// To be used in tandem with WPEngine's GeoTarget plugin. Place snippet in functions.php
function country_geo_redirect() {
  $geo = WPEngine\GeoIp::instance();
  $actual_link = "$_SERVER[REQUEST_URI]";
  
    // Check if country traffic origin is China, //Hong Kong//, or Russia
    if ( 'CN' === $geo->country() || 'RU' === $geo->country() ) {
        if ( $actual_link == '/countries/?' . $geo->country() ) {
            return;
        } else {
            wp_redirect('https://mylio.com/countries?' . $geo->country() , 301);
            return;
        }
    }
    // Check if country is Germany, then redirect... unless it's to contact support or download
    if ( 'DE' === $geo->country() || 'CH' === $geo->country() || 'AT' === $geo->country() ) { 
        if ( strpos($actual_link,'contact-support') || strpos($actual_link,'download') || strpos($actual_link,'concierge') ) {
            return;
        } else {
            wp_redirect('https://myliophotos.de' , 301);
            return;
        }
    }
  }
add_action('init', 'country_geo_redirect');

?>