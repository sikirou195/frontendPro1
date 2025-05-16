<template>
    <footer class="footer-bar">
      <div class="footer-content">
        <div class="left">
          <h3>🌟 Boutique Mode</h3>
          <p>Merci pour votre visite ! À bientôt pour plus de style ✨</p>
        </div>
        <div class="center">
          <p>📍 Cotonou, 🇧🇯 Bénin & 🇫🇷 France</p>
          <p>📧 contact@boutiquemode.com</p>
          <p>📞 +229 01 67 77 97 71</p>
        </div>
        <div class="right">
          <p>Suivez-nous :</p>
          <div class="socials">
            <a href="#" title="Instagram">📸</a>
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="WhatsApp">💬</a>
          </div>
        </div>
      </div>
      <div class="copyright">
        © 2025 Boutique Mode | Conçu par OTOROU Sikirou 🌍
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterBar'
  }
  </script>
  
  <style scoped>
  .footer-bar {
    background: linear-gradient(to right, #232526, #414345);
    color: #fff;
    padding: 40px 20px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    text-align: left;
  }
  
  .footer-content > div {
    flex: 1;
    min-width: 200px;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #ffcc70;
  }
  
  .socials a {
    margin-right: 10px;
    font-size: 1.4em;
    text-decoration: none;
    color: #fff;
    transition: transform 0.2s;
  }
  
  .socials a:hover {
    transform: scale(1.2);
  }
  
  .center p, .left p, .right p {
    margin: 5px 0;
  }
  
  .copyright {
    text-align: center;
    margin-top: 30px;
    font-size: 0.9em;
    color: #ccc;
  }
  </style>
  