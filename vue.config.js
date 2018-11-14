var debug = process.env.NODE_ENV === 'production';

module.exports = {
    baseUrl: './',
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/variables.scss";`
            }
        }
    } 
}