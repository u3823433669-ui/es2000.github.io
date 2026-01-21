
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 确保 DOM 加载后再挂载
const renderApp = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
