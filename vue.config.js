module.exports = {
    configureWebpack: {
        devServer: {
            port: 8082,
            headers: { "Access-Control-Allow-Origin": "*" },
        },  
    }, 
    lintOnSave: false,
}
