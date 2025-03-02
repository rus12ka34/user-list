import webpack from 'webpack';
import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildPaths, BuildMode } from './config/buildTypes/types';

interface EnvVariables {
	mode: BuildMode;
	port: number;
}

export default (env: EnvVariables) => {
	const mode: BuildMode = env.mode ?? 'development';
	const port: Number = env.port ?? 4444;

	const isDev: Boolean = mode === 'development';
	const isProd: Boolean = mode === 'production';

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src'),
	};

	const plugins: webpack.Configuration['plugins'] = [new htmlWebpackPlugin({ template: paths.html })];

	if (isDev) {
		plugins.push(new webpack.ProgressPlugin());
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[id].[contenthash:8].css',
			})
		);
	}

	const cssLoader = {
		test: /\.s?css$/,
		sideEffects: true,
		use: [
			isProd ? { loader: MiniCssExtractPlugin.loader, options: {} } : 'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
				},
			},
			'sass-loader',
		],
	};

	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	return {
		mode,
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[fullhash].js',
			clean: true,
		},
		plugins,
		module: {
			rules: [cssLoader, tsLoader],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'@/src': paths.src,
			},
		},
		devtool: isDev ? 'inline-source-map' : undefined,
		devServer: isDev
			? {
					port,
					open: true,
					historyApiFallback: true,
			  }
			: undefined,
	};
};
