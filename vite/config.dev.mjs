import { defineConfig } from "vite";

export default defineConfig({
	base: "./",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					phaser: ["phaser"],
				},
			},
		},
	},
	server: {
		allowedHosts: ["bagsunhyeong-ui-macbookpro.netbird.cloud"],
		host: true,
		port: 8080,
	},
});
