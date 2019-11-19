const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
    [
        withImages,
        [
            withLess,
            {
                cssModules: true,
                moduleOptions: {
                    // its easy to add this kind of option with this plugins api
                    exclude: /node_modules/,
                },
                cssLoaderOptions: {
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                },
            },
        ],
    ],
    {
        pageExtensions: ['mdx', 'jsx', 'js'],
    },
);
