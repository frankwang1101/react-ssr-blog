import express from 'express'
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webConfig from '../webpack.config'

const app = express();
const compiler = webpack(webConfig)
const port = 3001;

compiler.plugin('compilation',compilation=>{
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb)=> {
        webpackHotMiddleware(compiler).publish({ action: 'reload' });
        cb();
    });
});


const options = {
    publicPath:webConfig.output.publicPath,
    hot: true,
    stats: {
            colors: true,
            chunks: false
        },
     headers: {
         'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
    },
    historyApiFallback: true
}
app.use(webpackDevMiddleware(compiler,options));
app.use(require('webpack-hot-middleware')(compiler,{
    path:'/__webpack_hmr'
}));
app.use('/assets',express.static(path.join(__dirname,'../dist/assets')));
app.use('*',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})
app.listen(port,err=>{
    if(err){
        console.error(err);
    } else {
        console.info(`the webpack server has been listened at port: ${port}`)
    }
})
