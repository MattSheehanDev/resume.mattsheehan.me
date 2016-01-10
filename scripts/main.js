
$(function () {
  var toggleFloatingMenu = function() {
    $( '#js-floating-nav' ).toggleClass( 'is-visible' );
    $( '#js-floating-nav-trigger' ).toggleClass( 'is-open' );
  };

  // $( "#background-card" ).css( "min-height", window.screen.availHeight + "px" );
  // $( "[rel=tooltip]" ).tooltip();
  $( '#js-floating-nav-trigger' ).on( 'click', function(e) {
    e.preventDefault();
    toggleFloatingMenu();
  });
  $( '#js-floating-nav a' ).on( 'click', toggleFloatingMenu );

  $("#remaining-profiles").on('show.bs.collapse', function() {
    $( '.js-profiles-collapse > i' )
      .removeClass( 'icon-chevron-down' )
      .addClass( 'icon-chevron-up' );
  });

  $("#remaining-profiles").on('hidden.bs.collapse', function() {
    $( '.js-profiles-collapse > i' )
      .removeClass( 'icon-chevron-up' )
      .addClass( 'icon-chevron-down' );
  });
});
