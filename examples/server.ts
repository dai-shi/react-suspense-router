import fs from 'fs';
import { Readable, PassThrough } from 'stream';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import express from 'express';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import requireFromString from 'require-from-string';
import fetch from 'node-fetch';

const { PORT, DIR, EXT = 'ts' } = process.env;

const publicPath = '/';
const outputLibraryEntry = '__entry__';
const template = `./examples/${DIR}/public/index.html`;
const templateChunks = fs.readFileSync(template, 'utf8').split(/(<div id="app">|<\/body>)/);

const concatStreams = (streams: NodeJS.ReadableStream[]) => {
  const passThrough = new PassThrough();
  const next = (index: number) => {
    if (index < streams.length) {
      streams[index].pipe(passThrough, { end: false });
      streams[index].once('end', () => next(index + 1));
    } else {
      passThrough.end();
    }
  };
  next(0);
  return passThrough;
};

const compiler = webpack({
  mode: 'development',
  entry: {
    main: `./examples/${DIR}/src/index.${EXT}`,
    ssr: `./examples/${DIR}/src/ssr.${EXT}`,
  },
  output: {
    publicPath,
    libraryTarget: 'var',
    library: outputLibraryEntry,
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template,
      excludeChunks: ['ssr'],
    }) as any /* FIXME */,
  ],
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    }],
  },
  stats: {
    warningsFilter: /export '.*' was not found in/,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-suspense-router': `${__dirname}/../src`,
      'react-dom/server': `${__dirname}/../node_modules/react-dom/server.node.js`,
    },
  },
});

const instance = middleware(compiler as any /* FIXME */, {
  publicPath,
  serverSideRender: true,
});

const app = express();

app.use(instance);

app.use((req, res) => {
  const {
    assetsByChunkName,
    outputPath,
  } = res.locals.webpackStats.toJson();
  const memFs = res.locals.fs;

  const jsAssets = `<script type="text/javascript" src="${publicPath}${assetsByChunkName.main}"></script>`;

  const userAgent = 'react-suspense-router (ServerSideRendering)';
  const routeDataMapCache = {};
  const windowMock = {
    navigator: { userAgent },
    __ROUTE_DATA_MAP_CACHE__: routeDataMapCache,
  };
  const documentMock = {
    createElement() {
      return {};
    },
    head: {
      appendChild(ele: { src: string; onload: () => void }) {
        const chunkCode = memFs.readFileSync(`${outputPath}/${ele.src}`, 'utf8');
        const loadChunk = requireFromString(`module.exports=function(window,document,fetch){${chunkCode}}`);
        loadChunk(windowMock, documentMock, fetch);
        ele.onload();
      },
    },
  };

  const ssrCode = memFs.readFileSync(`${outputPath}/${assetsByChunkName.ssr}`, 'utf8');
  // fs.writeFileSync('./ssrcode.js', ssrCode, 'utf8');
  // const ssrCode = fs.readFileSync('./ssrcode.js', 'utf8');
  const ssrFactory = requireFromString(`module.exports=function(window,document,fetch){${ssrCode};return ${outputLibraryEntry}}`);
  const ssr = ssrFactory(windowMock, documentMock, fetch).default;

  const getAppStream = () => {
    const htmlStream = new PassThrough();
    const dataStream = new PassThrough();
    let readable = false;
    const loop = (repeat: number) => {
      if (repeat > 5) {
        htmlStream.destroy(new Error('max render loop reached'));
        return;
      }
      const stream: NodeJS.ReadableStream = ssr(req.url);
      const onReadable = () => {
        readable = true;
        stream.pipe(htmlStream);
      };
      const onEnd = () => {
        // inject routeDataMapCache
        const data = `<script>window.__ROUTE_DATA_MAP_CACHE__=${JSON.stringify(routeDataMapCache)}</script>`;
        Readable.from(data).pipe(dataStream);
      };
      stream.once('readable', onReadable);
      stream.once('end', onEnd);
      stream.once('error', (err: Error) => {
        console.log('error while ssr', err.message);
        if (!readable && /not yet support lazy-loaded|invariant=295/.test(err.message)) {
          const timeout = 200 * repeat ** 2;
          // HACK until react-dom/server supports lazy and suspense
          console.log('retrying in', timeout, 'ms...');
          setTimeout(() => loop(repeat + 1), timeout);
        } else {
          htmlStream.destroy(err);
        }
      });
    };
    loop(0);
    return [htmlStream, dataStream];
  };

  const [htmlStream, dataStream] = getAppStream();
  const stream = concatStreams([
    Readable.from(templateChunks[0]),
    Readable.from(templateChunks[1]), // <div id="app">
    htmlStream,
    Readable.from(templateChunks[2]),
    dataStream,
    Readable.from(jsAssets),
    Readable.from(templateChunks[3]), // </body>
    Readable.from(templateChunks[4]),
  ]);
  res.type('html');
  stream.pipe(res);
});

app.use(express.static(`./examples/${DIR}/public`));

app.listen(PORT || 8080, () => {
  console.log(`Example app listening on port ${PORT || 8080}!`);
});
