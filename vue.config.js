module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Fifty_assistant/'
    : '/',

  pwa: {
    name: '五十音助手',
    short_name: '五十音',
    description: '日语五十音与单词学习助手',
    themeColor: '#3f51b5',
    msTileColor: '#3f51b5',
    backgroundColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',

    manifestOptions: {
      name: '五十音助手',
      short_name: '五十音',
      description: '日语五十音与单词学习助手',
      start_url: '/Fifty_assistant/index.html',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#3f51b5',
      lang: 'zh-Hans-CN',
      icons: [
        {
          src: '/Fifty_assistant/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/Fifty_assistant/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      shortcuts: [
        {
          name: "快速练习",
          short_name: "练习",
          description: "直接开始五十音练习",
          url: "/Fifty_assistant/index.html#/practise"
        },
        {
          name: "错题回顾",
          short_name: "错题",
          description: "查看容易出错的假名",
          url: "/Fifty_assistant/index.html#/practise/review"
        },
        {
          name: "五十音表",
          short_name: "音表",
          description: "查看完整五十音表",
          url: "/Fifty_assistant/index.html#/table"
        }
      ]
    },

    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/Fifty_assistant/index.html',
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gojuuon-images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        },
        {
          urlPattern: /\.(?:m4a|mp3|wav)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gojuuon-audio',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 60
            }
          }
        },
        {
          urlPattern: /\.(?:woff|woff2|ttf)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gojuuon-fonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 90
            }
          }
        }
      ]
    }
  }
}