// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://codealign.co',
    generateRobotsTxt: true,      // <-- this creates robots.txt
    changefreq: 'daily',          // optional
    priority: 0.7,                // optional
    sitemapSize: 5000,            // split if you have >5k URLs
    exclude: [
        '/orifine-admin',
        '/orifine-admin/*',
        '/admin',
        '/admin/*',
        '/admin/**',
      ],
    // additional robots.txt options:
    robotsTxtOptions: {
        policies: [
            // everything else is allowed
            { userAgent: '*', allow: '/' },
            // block any admin paths
            {
                userAgent: '*',
                disallow: [
                '/orifine-admin',
                '/orifine-admin/*',
                '/admin',
                '/admin/*',
                '/admin/**',
                ],
            },
        ],
      additionalSitemaps: [],
    },
  }
  