
document.addEventListener("DOMContentLoaded", function () {

  // Instantiate the nav menu component.
  // This gives us a clean way to add more components later if ever needed.
  new Resume.NavMenu();

});


// Resume acts as our module,
// using the Definitive Module Pattern,
// https://github.com/sheehamj13/definitive-module-pattern
var Resume = (function() {

  // private functions
  var _private = {
    addClass: function(el, classname) {
      if (!el.classList.contains(classname)) {
        el.classList.add(classname);
      }
    },
    removeClass: function(el, classname) {
      if (el.classList.contains(classname)) {
        el.classList.remove(classname);
      }
    },
    toggleClass: function(el, classname) {
      if (el.classList.contains(classname))
        el.classList.remove(classname);
      else
        el.classList.add(classname);
    }
  }

  // public functions
  var _public = {
    // Nav Menu Class
    NavMenu: function () {
      var floatingNav = document.getElementById("js-floating-nav");
      var floatingNavTrigger = document.getElementById("js-floating-nav-trigger");

      this.toggleFloatingMenu = function() {
        _private.toggleClass(floatingNav, "is-visible");
        _private.toggleClass(floatingNavTrigger, "is-open");
      }

      // toggle nav menu on click
      floatingNavTrigger.addEventListener("click", function (ev) {
        ev.preventDefault();
        this.toggleFloatingMenu();
      }.bind(this));


      // each nav list item should hide the floating nav menu
      var navListItems = document.getElementsByClassName("nav_list_item");

      for (var i = 0; i < navListItems.length; i++) {
        navListItems[i].addEventListener("click", this.toggleFloatingMenu);
      }
    }
  }

  // return public members
  return _public;

})();



// $(function () {
//   var toggleFloatingMenu = function() {
//     $( '#js-floating-nav' ).toggleClass( 'is-visible' );
//     $( '#js-floating-nav-trigger' ).toggleClass( 'is-open' );
//   };
//
//   // $( "#background-card" ).css( "min-height", window.screen.availHeight + "px" );
//   // $( "[rel=tooltip]" ).tooltip();
//   $( '#js-floating-nav-trigger' ).on( 'click', function(e) {
//     e.preventDefault();
//     toggleFloatingMenu();
//   });
//   $( '#js-floating-nav a' ).on( 'click', toggleFloatingMenu );
//
//   $("#remaining-profiles").on('show.bs.collapse', function() {
//     $( '.js-profiles-collapse > i' )
//       .removeClass( 'icon-chevron-down' )
//       .addClass( 'icon-chevron-up' );
//   });
//
//   $("#remaining-profiles").on('hidden.bs.collapse', function() {
//     $( '.js-profiles-collapse > i' )
//       .removeClass( 'icon-chevron-up' )
//       .addClass( 'icon-chevron-down' );
//   });
// });
