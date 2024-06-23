// next.config.js
module.exports = {
    // Configurations spécifiques à Next.js
    // ...
    // Exemple de configuration de l'icône de favicon
    // Assurez-vous que public/ est correctement configuré pour servir les fichiers statiques
    async headers() {
      return [
        {
          source: '/favicon.ico',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=43200', // 12 heures
            },
          ],
        },
      ];
    },
  };
  