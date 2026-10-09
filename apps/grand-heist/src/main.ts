import App from './App.svelte';
import './app.css';
import { mount } from 'svelte';
import { installMockPlayApi } from './lib/client/mock-play-api.js';

installMockPlayApi();

const app = mount(App, {
  target: document.getElementById('app') as HTMLElement,
});

export default app;
