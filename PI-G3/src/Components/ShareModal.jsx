import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Modal from "react-modal";

const ShareModal = ({ isOpen, onRequestClose, product }) => {
  const [message, setMessage] = useState("");


  const handleShare = (platform) => {
    const url = window.location.href; // URL actual del producto
    const shareMessage = message || product.descripcionCorta; // Usa el mensaje personalizado o la descripción del producto

    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareMessage)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareMessage)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(product.nombre)}&summary=${encodeURIComponent(shareMessage)}`;
        break;
      case "instagram":
        // Instagram no tiene una API pública para compartir, así que se redirige al perfil de Instagram
        shareUrl = `https://www.instagram.com/`;
        break;
      case "tiktok":
        // TikTok tampoco tiene una API pública para compartir, así que se redirige al perfil de TikTok
        shareUrl = `https://www.tiktok.com/`;
        break;
      default:
        return;
    }

    // Abrir en una nueva ventana
    window.open(shareUrl, "_blank");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Compartir Producto"
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: { padding: '20px', maxWidth: '500px', margin: 'auto' }
      }}
    >
      <h2>Compartir {product.nombre}</h2>
      <img src={product.imagenUrl} alt={product.nombre} style={{ maxWidth: "100%" }} />
      <p>{product.descripcion}</p>
      <textarea
        placeholder="Agrega un mensaje personalizado"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: "10px" }}
      />

<div className="share-buttons">
        <button onClick={() => handleShare("facebook")} className="share-button-modal-fb">
          <FontAwesomeIcon icon={faFacebook}/>
        </button>
        <button onClick={() => handleShare("twitter")} className="share-button-modal-tw">
          <FontAwesomeIcon icon={faTwitter} />
        </button>
        <button onClick={() => handleShare("linkedin")} className="share-button-modal-ln">
          <FontAwesomeIcon icon={faLinkedin} />
        </button>
        <button onClick={() => handleShare("instagram")} className="share-button-modal-ig">
          <FontAwesomeIcon icon={faInstagram}/>
        </button>
        <button onClick={() => handleShare("tiktok")} className="share-button-modal-tt">
          <FontAwesomeIcon icon={faTiktok} />
        </button>
        </div>

    </Modal>
  );
};

export default ShareModal;
