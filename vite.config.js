import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import mongoose from 'mongoose';
import pluginRewriteAll from "vite-plugin-rewrite-all";


const {Connection} = mongoose;



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    pluginRewriteAll()],
    resolve:{
      alias:{
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server:{
      proxy:{
        '/api':{
          target:'http://localhost:3000',//The backend URL
          changeOrigin:true,
          secure:false,
          headers:{
           Connection: 'keep-alive'
          }
        }
      }
    }
});
