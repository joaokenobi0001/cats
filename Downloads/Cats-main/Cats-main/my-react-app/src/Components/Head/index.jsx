import React, { useEffect } from 'react';

function Head({ title, description }) {
  useEffect(() => {
    // Definindo o título do documento
    document.title = `${title} | Cats`;

    // Atualizando a meta descrição
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '');
    } else {
      // Caso a meta tag não exista, você pode criá-la
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = description || '';
      document.head.appendChild(newMetaDescription);
    }
  }, [title, description]);

  return <></>;
}

export default Head;
