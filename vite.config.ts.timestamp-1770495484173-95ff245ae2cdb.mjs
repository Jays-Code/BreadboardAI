// vite.config.ts
import { defineConfig } from "file:///workspaces/BreadboardAI/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  root: "ui",
  publicDir: "../public",
  define: {
    "ASSET_PACK_ICONS": JSON.stringify({})
  },
  resolve: {
    modules: ["node_modules", "tools/editor/node_modules"]
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api/run": "http://localhost:3000",
      "/api/run-stream": "http://localhost:3000",
      "/api/results": "http://localhost:3000",
      "/api/result": "http://localhost:3000",
      "/api/render": "http://localhost:3000",
      "/api/render-status": "http://localhost:3000"
    }
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9CcmVhZGJvYXJkQUlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2VzL0JyZWFkYm9hcmRBSS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlcy9CcmVhZGJvYXJkQUkvdml0ZS5jb25maWcudHNcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJvb3Q6ICd1aScsXG4gICAgcHVibGljRGlyOiAnLi4vcHVibGljJyxcbiAgICBkZWZpbmU6IHtcbiAgICAgICAgJ0FTU0VUX1BBQ0tfSUNPTlMnOiBKU09OLnN0cmluZ2lmeSh7fSlcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgbW9kdWxlczogWydub2RlX21vZHVsZXMnLCAndG9vbHMvZWRpdG9yL25vZGVfbW9kdWxlcyddXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcG9ydDogNTE3MyxcbiAgICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICcvYXBpL3J1bic6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICAgICAgJy9hcGkvcnVuLXN0cmVhbSc6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICAgICAgJy9hcGkvcmVzdWx0cyc6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICAgICAgJy9hcGkvcmVzdWx0JzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgICAgICAnL2FwaS9yZW5kZXInOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgICAgICcvYXBpL3JlbmRlci1zdGF0dXMnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXI6ICcuLi9kaXN0JyxcbiAgICAgICAgZW1wdHlPdXREaXI6IHRydWVcbiAgICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsSUFDSixvQkFBb0IsS0FBSyxVQUFVLENBQUMsQ0FBQztBQUFBLEVBQ3pDO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxTQUFTLENBQUMsZ0JBQWdCLDJCQUEyQjtBQUFBLEVBQ3pEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSCxZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixzQkFBc0I7QUFBQSxJQUMxQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxFQUNqQjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
