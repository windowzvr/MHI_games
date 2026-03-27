function injectGameProtection(htmlContent) {
  const protectionScript = `<script>
(function() {
  var ALLOWED_DOMAIN = 'backup-launcher-functions-18632018.codehs.me';
  var ALLOWED_ORIGIN = 'https://backup-launcher-functions-18632018.codehs.me';
  var currentOrigin = window.location.origin;
  var currentHostname = window.location.hostname;
  var protocol = window.location.protocol;
  
  function blockAccess() {
    document.documentElement.innerHTML = '';
    document.body.innerHTML = '';
    document.documentElement.style.cssText = 'width:100%;height:100%;margin:0;padding:0;overflow:hidden;';
    document.body.style.cssText = 'width:100%;height:100%;margin:0;padding:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);font-family:Arial,sans-serif;overflow:hidden;';
    var overlay = document.createElement('div');
    overlay.style.cssText = 'background:white;padding:40px;border-radius:15px;text-align:center;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.3);';
    overlay.innerHTML = '<div style="font-size:48px;margin-bottom:20px;">🔒</div><h2 style="color:#ff6b6b;margin:0 0 15px 0;font-size:24px;">Access Denied</h2><p style="color:#666;margin:0 0 20px 0;line-height:1.6;">This game can only be accessed through the official launcher.</p><p style="color:#999;font-size:13px;margin:0;">Detected: ' + currentHostname + '</p>';
    document.body.appendChild(overlay);
  }
  
  var isValid = protocol === 'https:' && currentOrigin === ALLOWED_ORIGIN && currentHostname === ALLOWED_DOMAIN;
  
  if (!isValid) {
    blockAccess();
  }
})();
</script>`;

  // Find best insertion point (before any game code executes)
  var lowerHtml = htmlContent.toLowerCase();
  var doctypeIndex = lowerHtml.indexOf('<!doctype');
  var htmlIndex = lowerHtml.indexOf('<html');
  var headIndex = lowerHtml.indexOf('<head');

  // Insert after opening HTML tag if found
  if (doctypeIndex !== -1) {
    var endDoctype = htmlContent.indexOf('>', doctypeIndex);
    return htmlContent.substring(0, endDoctype + 1) + protectionScript + htmlContent.substring(endDoctype + 1);
  } else if (htmlIndex !== -1) {
    var endHtmlTag = htmlContent.indexOf('>', htmlIndex);
    return htmlContent.substring(0, endHtmlTag + 1) + protectionScript + htmlContent.substring(endHtmlTag + 1);
  } else if (headIndex !== -1) {
    var endHeadTag = htmlContent.indexOf('>', headIndex);
    return htmlContent.substring(0, endHeadTag + 1) + protectionScript + htmlContent.substring(endHeadTag + 1);
  }

  // Fallback: prepend to entire content
  return protectionScript + htmlContent;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { injectGameProtection };
}

Usage in your launcher:

// When opening a game:
const protectedHTML = injectGameProtection(htmlContent);
const newWindow = window.open('', '_blank');
newWindow.document.write(protectedHTML);
