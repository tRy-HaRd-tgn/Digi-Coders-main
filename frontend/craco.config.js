module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      // Отключаем source-map-loader для node_modules
      if (config.module && config.module.rules) {
        config.module.rules.forEach((rule) => {
          if (
            rule.enforce === "pre" &&
            rule.use &&
            rule.use.some(
              (use) => use.loader && use.loader.includes("source-map-loader")
            )
          ) {
            rule.exclude = /node_modules/;
          }
        });
      }

      // Игнорируем предупреждения о source map
      config.ignoreWarnings = [
        /Failed to parse source map/,
        /Can't resolve .* in .*node_modules/,
      ];

      return config;
    },
  },
};
