<template>
    <div class="contact-page">
      <div class="hero-contact">
        <h1>📬 Contactez-nous</h1>
        <p>Nous sommes ravis d'échanger avec vous.</p>
      </div>
  
      <div class="info-section">
        <div class="info-box">
          <h2>📍 Adresse</h2>
          <p>123 Rue du Style, Paris, France</p>
        </div>
  
        <div class="info-box">
          <h2>📞 Téléphone</h2>
          <p>+33 1 23 45 67 89</p>
        </div>
  
        <div class="info-box">
          <h2>✉️ Email</h2>
          <p>contact@boutiquemode.fr</p>
        </div>
      </div>
  
      <div class="socials">
        <h2>🔗 Suivez-nous</h2>
        <p>
          📸 Instagram | 🧵 TikTok | 👕 Facebook
        </p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .contact-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 40px 20px;
    max-width: 900px;
    margin: auto;
    color: #333;
  }
  
  .hero-contact {
    background: linear-gradient(to right, #ff6a00, #ee0979);
    padding: 40px 20px;
    border-radius: 12px;
    color: #fff;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .info-section {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  
  .info-box {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 12px;
    flex: 1 1 250px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
  
  .info-box h2 {
    margin-bottom: 10px;
    color: #ee0979;
  }
  
  .socials {
    text-align: center;
    padding: 20px;
    border-top: 1px solid #ddd;
  }
  
  .socials h2 {
    margin-bottom: 10px;
    color: #ff6a00;
  }
  </style>
  