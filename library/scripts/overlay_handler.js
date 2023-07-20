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
    var overlay = document.querySelector('.overlay#' + overlay_id) || false;
    var wrapper = overlay.querySelector('.overlay-wrapper') || false;
    
    // Prevent document from scrolling
    document.body.classList.add('no-scrolling');
    overlay.classList.remove('hidden');

    // Embed document
    if(overlay.dataset.embed !== '')
    {
      Create_Document_Preview(wrapper);
    }

    Listen_For_Close_Overlay(overlay);
  }

  //****************************************
  // Close overlay
  //****************************************

  var Close_Overlay = function(e)
  {
    var overlay = document.querySelector('.overlay:not(.hidden)') || false;
    var iframe = overlay.querySelector('.overlay-wrapper iframe') || false;
    var close_overlay_button = overlay.querySelector('.close-overlay') || false;
    if(e.target === overlay || e.target === close_overlay_button)
    {
      // Unload iframe
      if(iframe)
      {
        iframe.parentNode.removeChild(iframe);
      }

      document.body.classList.remove('no-scrolling');
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

  //****************************************
  // Create Document Preview
  //****************************************
  //<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=https://www.franssantoso.com/library/static/franssantoso_resume.docx' width='' height='90%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
  var Create_Document_Preview = function(wrapper)
  {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://view.officeapps.live.com/op/embed.aspx?src=https://www.franssantoso.com/library/static/' + wrapper.parentNode.dataset.embed;
    iframe.width = wrapper.offsetWidth - 75 + 'px';
    iframe.height = '95%';

    wrapper.appendChild(iframe);
  }

  // Return public interface
  return visible;
})