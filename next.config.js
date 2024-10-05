module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/LandingPage",
        permanent: true,
      },
    ];
  },
};
