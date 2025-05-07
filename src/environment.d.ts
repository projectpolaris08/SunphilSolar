interface ImportMetaEnv {
    readonly VITE_WEATHER_API_KEY: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    readonly VITE_GOOGLE_SCRIPT_URL?: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }