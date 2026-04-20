import React from 'react';

// Fungsi untuk mendeteksi URL dan mengubahnya menjadi Link (<a> tag) yang bisa diklik
export const renderText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      // Hilangkan tanda baca di akhir URL jika ada (seperti titik atau koma) yang terbawa oleh regex
      const trailingPunc = part.match(/[.,!?]+$/);
      const cleanUrl = trailingPunc ? part.slice(0, -trailingPunc[0].length) : part;
      const punctuation = trailingPunc ? trailingPunc[0] : '';

      return (
        <React.Fragment key={i}>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#93c5fd', textDecoration: 'underline', fontWeight: 500 }}
          >
            {cleanUrl}
          </a>
          {punctuation}
        </React.Fragment>
      );
    }
    return <span key={i}>{part}</span>;
  });
};
