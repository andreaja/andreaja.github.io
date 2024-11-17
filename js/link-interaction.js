'use strict';
/* https://spencermortensen.com/articles/email-obfuscation/files/link-interaction.js
   Source is public domain as per
   https://spencermortensen.com/articles/email-obfuscation/#link-interaction
   as of 2024 */ 

document.addEventListener('DOMContentLoaded', function ()
                          {
	                    const listener = new Listener();

	                    listener.decode = function ()
	                    {
		              const a = document.getElementById('link-interaction');

		              a.setAttribute('href', a.getAttribute('href')
			                     .replace('o', 's')
			                     .replace('-', '@')
			                     .replaceAll('-', '.')
			                     .replace('/', 'jacobsen.com')
			                     .replace('t', 'mailto:andrea')
		                            );
	                    }

	                    listener.on();
                          });


// Listener

function Listener ()
{
}

Listener.prototype.decode = null;

Listener.prototype.on = function ()
{
  this.listener = this.__onInteraction.bind(this);

  document.addEventListener('mouseenter', this.listener, true);
  document.addEventListener('focus', this.listener, true);
}

Listener.prototype.off = function ()
{
  document.removeEventListener('mouseenter', this.listener, true);
  document.removeEventListener('focus', this.listener, true);

  delete this.listener;
}

Listener.prototype.__onInteraction = function ()
{
  this.off();
  this.decode();
}
