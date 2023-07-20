var Overlay_Handler = (function()
{
  // Visible interface
  var visible = {};

  // Private variables
  var _open_overlay_buttons;

  //****************************************
  // Initialize
  //****************************************

  visible.Initialize = function(options)
  {
    _open_overlay_buttons = document.querySelectorAll("[data-overlay]") || false;

    Listen_For_Open_Overlay_Button();
  }

  //****************************************
  // Listen for click on open button
  //****************************************

  var Listen_For_Open_Overlay_Button = function()
  {
    _open_overlay_buttons.forEach(function(button)
    {
      button.addEventListener('click', function(e)
      {
        e.preventDefault();
        Open_Overlay(this.dataset.overlay);
      });
    })
  }

  //****************************************
  // Open overlay
  //****************************************

  var Open_Overlay = function(overlay_id)
  {
    var overlay = document.querySelector('.overlay#' + overlay_id);
    overlay.classList.remove('hidden');
    Listen_For_Close_Overlay(overlay);
  }

  //****************************************
  // Close overlay
  //****************************************

  var Close_Overlay = function(e)
  {
    var overlay = document.querySelector('.overlay:not(.hidden)');
    var close_overlay_button = overlay.querySelector('.close-overlay');
    if(e.target === overlay || e.target === close_overlay_button)
    {
      overlay.classList.add('hidden');
    }
  }

  //****************************************
  // Listen for click on outside of overlay
  //****************************************

  var Listen_For_Close_Overlay = function(button)
  {
    button.addEventListener('click', Close_Overlay);
  }

  // Return public interface
  return visible;

})