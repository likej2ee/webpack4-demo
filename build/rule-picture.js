module.exports = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'staticimg/[name].[hash:7].[ext]',
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        // disable: true, // webpack@2.x and newer
        mozjpeg: {
          progressive: true,
          quality: 75,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75,
        },
      },
    },
  ],
}
