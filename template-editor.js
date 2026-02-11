// Generate the HTML template
// Base-64 encoded for security
(function(){
    // Self-executing function for encapsulation
window.generateHTML = function(data) {
    // Function to convert hex to rgb
    function hexToRgb(hex) {
        if (!hex) return null;
        
        // Remove the hash if it exists
        hex = hex.replace('#', '');
        
        // Parse the hex values
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        
        // Return as comma-separated string for CSS variables
        return `${r}, ${g}, ${b}`;
    }

    // Generate services HTML
    let servicesHTML = '';
    data.services.forEach(service => {
        servicesHTML += `
        <div class="feature">
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>`;
    });
    
    // Logo source - use a transparent pixel as the default if no logo provided
    const logoSrc = data.logoData || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    
    // Logo scale (default to 70% if not provided)
    const logoScale = data.logoScale || '70';
    
    // Page background color (default to white if not provided)
    const pageBgColor = data.pageBgColor || '#ffffff';
    
    // Section gradient settings (with defaults)
    const sectionGradientStart = data.sectionGradientStart || '#0a0a19';
    const sectionGradientEnd = data.sectionGradientEnd || '#1a1a2e';
    const gradientAngle = data.gradientAngle || '135';
    
    // Escape any special characters in text fields
    const escapedLawFirmName = data.lawFirmName.replace(/'/g, "\\'");
    const escapedTagline = data.tagline.replace(/'/g, "\\'");
    const escapedContactName = data.contactName.replace(/'/g, "\\'");
    const escapedContactAddress = data.contactAddress.replace(/'/g, "\\'");
        
        // WhatsApp integration (replace with actual phone number)
        const whatsappNumber = "212660245937"; // Your WhatsApp number without the + sign
        const whatsappMessage = encodeURIComponent(`Hi! I'm interested in your services.`);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Anti-copy script
        const antiCopyScript = `
        // Protect content
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.onkeydown = function(e) {
            if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) || (e.ctrlKey && e.keyCode === 85)) {
                return false;
            }
        };
        // Add footer credit with encryption
        (function(){document.getElementById('credit-footer').innerHTML = atob('UG93ZXJlZCBieSBUYXBOZ2Vu');})();
        `;
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapedLawFirmName}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <style>
        :root {
            --primary: ${data.primaryColor};
            --secondary: ${data.secondaryColor};
            --accent: ${data.accentColor};
            --dark: ${data.backgroundColor};
            --light: ${data.textColor};
            --page-bg: ${pageBgColor};
            --glass: rgba(255, 255, 255, 0.1);
            --page-bg-rgb: ${hexToRgb(pageBgColor) || '255, 255, 255'};
            /* Extract RGB components from hex color for use in rgba() */
            --primary-rgb: ${hexToRgb(data.primaryColor) || '139, 0, 0'};
            --secondary-rgb: ${hexToRgb(data.secondaryColor) || '75, 54, 33'};
            --accent-rgb: ${hexToRgb(data.accentColor) || '212, 175, 55'};
            /* Section gradient */
            --section-gradient: linear-gradient(${gradientAngle}deg, ${sectionGradientStart}, ${sectionGradientEnd});
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            transition: all 0.3s ease;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--dark);
            color: var(--light);
            overflow-x: hidden;
            background: linear-gradient(to bottom right, #0f0c29, #302b63, #24243e);
            background-attachment: fixed;
            position: relative; /* Ensure positioning context for particles */
        }

        /* Particles container - ensure it shows in all sections */
        #particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0; /* Below content */
        }

        /* Section-specific particle containers */
        #hero-particles, #features-particles, #contact-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        .particle {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle at center, var(--primary), transparent);
            z-index: 0;
            opacity: 0.5;
            box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.8);
        }

        /* Content containers with page background color */
        .page-bg-container {
            background-color: var(--page-bg);
            margin: 20px;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
            z-index: 1; /* Place above particles */
        }

        /* Hero specific styling for page-bg-container */
        #hero .page-bg-container {
            max-width: 1200px;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        /* Add a subtle pattern overlay */
        .page-bg-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(var(--primary) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.05;
            pointer-events: none;
        }

        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10, 10, 25, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 15px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navbar .logo {
            font-size: 1.5rem;
            font-weight: bold;
            letter-spacing: 2px;
            color: var(--primary);
            text-transform: uppercase;
        }

        .navbar .nav-links {
            display: flex;
            gap: 30px;
        }

        .navbar .nav-links a {
            color: var(--light);
            text-decoration: none;
            position: relative;
            padding: 5px 0;
        }

        .navbar .nav-links a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--primary);
            transition: width 0.3s;
        }

        .navbar .nav-links a:hover::after {
            width: 100%;
        }

        #hero {
            min-height: 100vh;
            padding: 150px 5% 100px;
            position: relative;
            overflow: hidden;
            z-index: 1; /* Ensure this is above particles */
        }

        .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--section-gradient);
            z-index: -1;
            overflow: hidden;
        }
        
        /* Add a subtle radial gradient overlay */
        .hero-background::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                circle at center,
                transparent 30%,
                rgba(var(--primary-rgb), 0.05) 70%,
                rgba(var(--secondary-rgb), 0.1) 100%
            );
            z-index: -1;
        }
        
        /* Add subtle dot pattern */
        .hero-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(var(--primary) 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.05;
            pointer-events: none;
            z-index: -1;
        }

        .hero-content {
            max-width: 600px;
            padding-right: 20px;
            animation: fadeInLeft 1s ease-out;
        }

        .hero-content h2 {
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(to right, var(--primary), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hero-content p {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 30px;
            color: var(--dark);
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .hero-image-container {
            position: relative;
            width: 300px;
            height: 300px;
            margin-left: 50px;
            z-index: 2;
            animation: float-subtle 6s ease-in-out infinite, fadeIn 1.5s;
        }

        @keyframes float-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .circle-container {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--page-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            box-shadow: 0 0 15px rgba(0, 188, 212, 0.5);
            transform: translateZ(0);
            padding: 0;
        }

        .circle-image {
            width: ${logoScale}% !important;
            height: auto;
            object-fit: contain;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: none !important;
            max-height: none !important;
        }

        .circle-overlay {
            position: absolute;
            width: 110%;
            height: 110%;
            border-radius: 50%;
            background: linear-gradient(45deg, transparent, rgba(0, 188, 212, 0.2), transparent);
            animation: rotate 8s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .circle-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: transparent;
            border: 1px solid var(--primary);
            animation: pulse 2s ease-out infinite;
        }

        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 1; }
            70% { transform: scale(1.1); opacity: 0; }
            100% { transform: scale(0.95); opacity: 0; }
        }

        .futuristic-button {
            background: linear-gradient(45deg, var(--primary), var(--accent));
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            margin-top: 30px;
            display: inline-block;
            text-decoration: none;
            position: relative;
            overflow: hidden;
            z-index: 1;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            animation: pulse-button 2s infinite;
        }
        
        .futuristic-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
            filter: brightness(1.1);
        }
        
        .futuristic-button:active {
            transform: translateY(3px);
            box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.5);
        }
        
        .futuristic-button i {
            margin-right: 10px;
            font-size: 1.2em;
        }

        .futuristic-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s ease;
        }

        .futuristic-button:hover::before {
            left: 100%;
        }
        
        @keyframes pulse-button {
            0% {
                box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(var(--primary-rgb), 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0);
            }
        }
        
        /* Mobile improvements for vCard button */
        @media (max-width: 768px) {
            .futuristic-button {
                padding: 18px 35px;
                font-size: 1.2em;
                margin-top: 25px;
                display: block;
            width: 100%;
                max-width: 300px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .hero .page-bg-container {
                flex-direction: column;
                text-align: center;
            }
            
            .hero-content {
                order: 2;
            }
            
            .hero-image-container {
                order: 1;
                margin-bottom: 30px;
            }
        }

        #features {
            padding: 100px 5%;
            text-align: center;
            position: relative;
            background: var(--section-gradient);
            position: relative; /* Ensure positioning context */
            z-index: 1; /* Ensure this is above particles */
        }

        /* Add a specific semi-transparent background for features to show particles */
        #features::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--section-gradient);
            opacity: 0.95; /* Make more opaque to hide background bleed */
            z-index: -1; /* Below content but above particles */
        }

        .section-title {
            font-size: 2.5em;
            margin-bottom: 50px;
            color: var(--light);
            position: relative;
            display: inline-block;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .section-title::after {
            content: '';
            position: absolute;
            width: 80px;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
        }

        .features-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
        }

        .feature {
            position: relative;
            width: 300px;
            padding: 30px;
            border-radius: 15px;
            background: rgba(10, 10, 25, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            color: var(--light);
        }

        .feature::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(0, 188, 212, 0.1), transparent);
            transform: translateY(100%);
            transition: transform 0.6s;
        }

        .feature:hover::before {
            transform: translateY(-100%);
        }

        .feature:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 188, 212, 0.2);
        }

        .feature i {
            font-size: 3em;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }

        .feature h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: var(--light);
        }

        .feature p {
            color: var(--light);
            line-height: 1.6;
        }

        #contact {
            padding: 100px 5%;
            text-align: center;
            position: relative;
            background: var(--section-gradient);
            background-attachment: fixed;
            z-index: 1; /* Ensure this is above particles */
        }

        .contact-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            background: transparent;
        }

        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            margin-top: 30px;
        }

        .contact-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            width: 200px;
            border-radius: 10px;
            background: rgba(10, 10, 25, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: transform 0.3s, box-shadow 0.3s;
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            color: var(--light);
        }

        .contact-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .contact-item i {
            font-size: 2em;
            color: var(--primary);
            margin-bottom: 15px;
            transition: transform 0.3s;
        }

        .contact-item:hover i {
            transform: scale(1.2);
        }

        .contact-item a {
            color: var(--light);
            text-decoration: none;
            font-size: 1.1em;
            transition: color 0.3s;
            word-break: break-word;
        }

        .contact-item a:hover {
            color: var(--primary);
        }

        footer {
            background-color: rgba(10, 10, 25, 0.9);
            color: var(--light);
            text-align: center;
            padding: 30px 0;
            position: relative;
            overflow: hidden;
        }

        footer p {
            position: relative;
            z-index: 1;
        }

        footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, transparent, var(--primary), transparent);
        }

        /* Make sure images are visible on all browsers/devices */
        @media (max-width: 768px) {
            html, body {
                width: 100vw;
                overflow-x: hidden !important;
            }
            .editor-container,
            .sidebar,
            .preview-container,
            .preview-frame,
            .page-bg-container,
            #hero,
            #features,
            #contact {
                max-width: 100vw !important;
                overflow-x: hidden !important;
            }
            .navbar {
                padding: 10px 15px;
            }

            .navbar .logo {
                font-size: 1rem;
                letter-spacing: 1px;
                max-width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .navbar .nav-links {
                display: none;
            }

            #hero {
                padding: 170px 10px 50px;
            }

            #hero .page-bg-container {
                flex-direction: column;
                margin: 10px;
                padding: 20px;
            }

            .page-bg-container {
                margin: 10px;
                padding: 20px;
            }

            .hero-content {
                max-width: 100%;
                margin-right: 0;
                margin-bottom: 50px;
                padding-right: 0;
            }

            .hero-content h2 {
                font-size: 2.3em;
            }

            .hero-image-container {
                width: 280px;
                height: 280px;
                margin-left: 0;
            }
            
            .circle-image {
                width: ${logoScale}% !important;
                max-width: none !important;
                max-height: none !important;
            }
            
            .circle-container {
                position: relative;
                background: var(--page-bg);
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .features-container {
                flex-direction: column;
                align-items: center;
            }

            .feature {
                width: 100%;
                max-width: 320px;
            }

            .contact-info {
                flex-direction: column;
                align-items: center;
            }

            .contact-item {
                width: 100%;
                max-width: 280px;
            }

            .contact-item a {
                font-size: 0.9em;
            }
        }

        /* Make particles visible across all sections */
        #features, #contact, #hero {
            position: relative;
            z-index: 1; /* Ensure content is above particles */
        }

        /* Add a credit footer */
        .credit-footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8rem;
            opacity: 0.7;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .button-group {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 20px;
        }
        
        .accent-button {
            background: var(--accent);
            box-shadow: 0 5px 15px rgba(var(--accent-rgb), 0.5);
        }
        
        .accent-button:hover {
            background: linear-gradient(45deg, var(--accent), rgba(var(--accent-rgb), 0.8));
            box-shadow: 0 7px 20px rgba(var(--accent-rgb), 0.7);
        }
        
        .accent-button:active {
            box-shadow: 0 2px 10px rgba(var(--accent-rgb), 0.5);
        }
    </style>
    
    <!-- Highest priority styles to ensure logo scaling works in all views including inspector -->
    <style id="critical-logo-styles">
        .circle-image {
            width: ${logoScale}% !important;
            max-width: none !important;
            max-height: none !important;
        }
    </style>
</head>
<body>
    <!-- Animated particles in background -->
    <div id="particles"></div>

    <main>
    <nav class="navbar">
        <div class="logo">${escapedLawFirmName}</div>
        <div class="nav-links">
            <a href="#hero">Accueil</a>
            <a href="#features">Services</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>

    <section id="hero">
        <div id="hero-particles"></div>
        <div class="hero-background"></div>
        <div class="page-bg-container">
            <div class="hero-content">
                <h2>${escapedLawFirmName}</h2>
                <p>${escapedTagline}</p>
                    <div class="button-group">
                        <a href="#" id="downloadVCard" class="futuristic-button" onclick="downloadVCard(); return false;">
                    <i class="fas fa-address-card"></i> Ajouter aux Contacts
                </a>
                    </div>
            </div>
            <div class="hero-image-container">
                <div class="circle-container">
                    <img src="${logoSrc}" 
                        alt="${escapedLawFirmName}" 
                        class="circle-image" 
                        style="width: ${logoScale}%; max-width: none !important; max-height: none !important;"
                        onerror="this.onerror=null;this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';this.alt='${escapedLawFirmName.toUpperCase()}';">
                    <div class="circle-overlay"></div>
                    <div class="circle-pulse"></div>
                        <div class="logo-placeholder" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #555; font-size: 16px; font-weight: bold; text-align: center; width: 80%; z-index: 1; opacity: ${logoSrc === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' ? '1' : '0'};">Your Logo Here</div>
                </div>
            </div>
        </div>
    </section>

    <section id="features">
        <div id="features-particles"></div>
        <h2 class="section-title">${data.servicesTitle}</h2>
        <div class="page-bg-container">
            <div class="features-container">
                ${servicesHTML}
            </div>
        </div>
    </section>

    <section id="contact">
        <div id="contact-particles"></div>
        <h2 class="section-title">${data.contactTitle}</h2>
        <div class="page-bg-container">
            <div class="contact-container">
                <p>${data.contactSubtitle}</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <a href="https://www.google.com/maps/search/${encodeURIComponent(data.contactAddress)}" target="_blank">
                            ${escapedContactAddress}
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone-alt"></i>
                        <a href="tel:${data.contactPhone}">${data.contactPhone}</a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:${data.contactEmail}">${data.contactEmail}</a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <a href="https://${data.contactWebsite}" target="_blank">${data.contactWebsite}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
            <div class="container">
        <p>${data.footerText}</p>
                <div id="credit-footer" class="credit-footer"></div>
            </div>
    </footer>
    </main>

    <!-- WhatsApp Floating Button - Removed as requested -->

    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Particle animation
            // ... existing code ...
            
            ${antiCopyScript}
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            // Particle animation
            // ... existing code ...
            
            ${antiCopyScript}
        });
        
        // Function to download vCard directly from the template
        window.downloadVCard = function() {
            try {
                // Try parent method first (when in editor)
                if (window.parent && window.parent.downloadVCardFromEditor) {
                    window.parent.downloadVCardFromEditor();
                    return;
                }
                
                // Fallback direct implementation for standalone use
                const contactName = "${escapedContactName}";
                const contactPhone = "${data.contactPhone}";
                const contactEmail = "${data.contactEmail}";
                const contactAddress = "${escapedContactAddress}";
                const contactWebsite = "${data.contactWebsite}";
                const organization = "${escapedLawFirmName}";
                
                const nameParts = contactName.split(' ');
                const lastName = nameParts.length > 1 ? nameParts.pop() : contactName;
                const firstName = nameParts.join(' ');
                
                // Format phone number to ensure compatibility
                const formattedPhone = contactPhone.replace(/\\s+/g, '');
                
                // Get logo directly if available (for the standalone mode)
                const logoImgElement = document.querySelector('.circle-image');
                const logoData = logoImgElement && logoImgElement.src ? logoImgElement.src : '';
                
                // Function to fold base64 lines at 75 chars for vCard compatibility
                function foldBase64(base64String, lineLength = 75) {
                    let result = '';
                    for (let i = 0; i < base64String.length; i += lineLength) {
                        result += base64String.substr(i, lineLength);
                        if (i + lineLength < base64String.length) {
                            result += '\\r\\n '; // Line fold with space continuation
                        }
                    }
                    return result;
                }
                
                // vCard string with TEL formatted according to standards
                let vCardData = "BEGIN:VCARD\\r\\n" +
                    "VERSION:3.0\\r\\n" +
                    "N:" + lastName + ";" + firstName + ";;;\\r\\n" +
                    "FN:" + contactName + "\\r\\n" +
                    "ORG:" + organization + "\\r\\n" +
                    "TEL;type=CELL:" + formattedPhone + "\\r\\n" +
                    "ADR;type=WORK:;;" + contactAddress + ";;;\\r\\n" +
                    "EMAIL:" + contactEmail + "\\r\\n" +
                    "URL:" + contactWebsite + "\\r\\n";
                    
                // Try to add logo if available in the standalone mode
                if (logoData && logoData.startsWith('data:')) {
                    try {
                        // Extract image type and data
                        const matches = logoData.match(/^data:image\\/([a-zA-Z]+);base64,(.+)$/);
                        if (matches && matches.length === 3) {
                            const base64Data = matches[2];
                            
                            // Fold base64 data properly for vCard compatibility (iPhone requirement)
                            const foldedBase64 = foldBase64(base64Data);
                            
                            // Use correct vCard 3.0 format for iPhone compatibility
                            vCardData += "PHOTO;ENCODING=BASE64;TYPE=JPEG:\\r\\n " + foldedBase64 + "\\r\\n";
                        } else {
                            // Skip photo if format invalid
                            console.log('Invalid image format for vCard');
                        }
                    } catch (e) {
                        console.log('Error processing photo:', e);
                        // Skip photo on error instead of adding broken placeholder
                    }
                }
                    
                    vCardData += "END:VCARD";
                    
                // Create blob and URL
                const blob = new Blob([vCardData], { type: 'text/vcard' });
                const url = URL.createObjectURL(blob);
                
                // Create a link and trigger download
                const fileName = firstName + '-' + lastName + '-Contact.vcf';
                const link = document.createElement('a');
                    link.href = url;
                link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                
                // For mobile devices, also open in new tab
                const ua = navigator.userAgent.toLowerCase();
                const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
                if (isMobile) {
                    setTimeout(function() {
                        window.open(url, '_blank');
                    }, 1000);
                }
                
                    URL.revokeObjectURL(url);                    
            } catch (e) {
                console.error('vCard download error:', e);
                alert('Could not download contact. Please try again or contact the site owner.');
            }
        };
    </script>
</body>
</html>`;
    };

    // Add obfuscation techniques
    try {
        const _0x1a2b3c = [
            'log', 'warn', 'info', 'error',
            'exception', 'table', 'trace'
        ];
        for (const _0x4d5e6f of _0x1a2b3c) {
            console[_0x4d5e6f] = function() {};
        }
    } catch (e) {}
})(); 
