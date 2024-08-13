import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { invoke } from "@tauri-apps/api";

function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}


(async () => {
  const gtk = await invoke<string>("get_gtk_theme");
  const { properties } = JSON.parse(gtk);

  const colors = {
    "--primary-color": `rgb(${hexToRgb(properties.base_color)})`,
    "--text-color": `rgba(${hexToRgb(properties.text_color)}, 1)`,
    "--secondary-color": `rgb(${hexToRgb(properties.bg_color)})`,
    "--secondary-color-rgb": hexToRgb(properties.bg_color)
  };

  Object.entries(colors).forEach(([key, value]) =>
    document.documentElement.style.setProperty(key, value)
  );
})();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

