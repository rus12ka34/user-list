import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/src/App';

const root = document.querySelector('#root');
if (!root) {
	throw new Error('Not found root!');
}

const container = createRoot(root);
container.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
