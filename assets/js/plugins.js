//Common plugins
if(document.querySelectorAll("[toast-list]") || document.querySelectorAll('[data-choices]') || document.querySelectorAll("[data-provider]")){ 
  document.writeln("<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/toastify-js'></script>");
  document.writeln("<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/choices.js@11.0.2/public/assets/styles/choices.min.css'></script>");
  document.writeln("<script type='text/javascript' src='assets/libs/flatpickr/flatpickr.min.js'></script>");    
}