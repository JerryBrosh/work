module.exports={
    devServer: {
        proxy: {
            '/api': {
                target: "http://localhost:1111",
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
};