export default ({ body, title, initialState, path, isSsr }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>
          window.__APP_INITIAL_STATE__ = ${initialState};
          window.__FROM_SSR_FLAG__ = ${isSsr};
        </script>
        <title>${title}</title>
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      <script src=${path}></script>
    </html>
  `;
};
