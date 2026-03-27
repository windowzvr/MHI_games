/**
 * This script checks if games are being accessed from unauthorized sources
 * and blocks them from loading if they're not from the official launcher.
 */

function checkGameAccess() {
    // List of authorized domains that can load your games
    const authorizedDomains = [
        'backup-launcher-functions-18632018.codehs.me',
        'localhost',
        '127.0.0.1'
    ];
    
    const currentDomain = window.location.hostname;
    
    // Check if current domain is in the authorized list
    const isAuthorized = authorizedDomains.some(domain => 
        currentDomain === domain || currentDomain.endsWith('.' + domain)
    );
    
    if (!isAuthorized) {
        // Block the page and show warning
        blockUnauthorizedAccess();
        return false;
    }
    
    return true;
}

function blockUnauthorizedAccess() {
    // Clear the page
    document.body.innerHTML = '';
    document.body.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 20px;
    `;
    
    const warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 40px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    warningDiv.innerHTML = `
        <h1 style="color: #ff6b6b; margin-bottom: 20px; font-size: 2em;">⚠️ Unauthorized Access</h1>
        <p style="color: #333; font-size: 1.1em; line-height: 1.6; margin-bottom: 30px;">
            This game collection can only be accessed from the official launcher.
        </p>
        <p style="color: #666; font-size: 0.95em; margin-bottom: 20px;">
            If you believe this is a mistake or need access, please contact the site administrator.
        </p>
        <a href="https://backup-launcher-functions-18632018.codehs.me/" 
           style="
               display: inline-block;
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
               color: white;
               padding: 12px 30px;
               border-radius: 8px;
               text-decoration: none;
               font-weight: 600;
               transition: transform 0.3s ease;
           "
           onmouseover="this.style.transform='scale(1.05)'"
           onmouseout="this.style.transform='scale(1)'">
            Go to Official Launcher
        </a>
    `;
    
    document.body.appendChild(warningDiv);
    
    // Log the unauthorized access attempt
    console.warn(`Unauthorized access attempt from: ${window.location.href}`);
}

// Run the check immediately when script loads
checkGameAccess();
