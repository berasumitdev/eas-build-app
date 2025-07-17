const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withAndroidQueries(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;

    // Ensure <queries> exists
    if (!manifest.manifest.queries) {
      manifest.manifest.queries = [];
    }

    // Check if the satelliteoracle scheme already exists
    const alreadyAdded = manifest.manifest.queries.some((q) =>
      q.intent?.some((intent) =>
        intent.action?.[0]?.['$']['android:name'] === 'android.intent.action.VIEW' &&
        intent.data?.[0]?.['$']['android:scheme'] === 'satelliteoracle'
      )
    );

    if (!alreadyAdded) {
      manifest.manifest.queries.push({
        intent: [
          {
            action: [
              {
                $: {
                  'android:name': 'android.intent.action.VIEW',
                },
              },
            ],
            data: [
              {
                $: {
                  'android:scheme': 'satelliteoracle',
                },
              },
            ],
          },
        ],
      });
    }

    return config;
  });
};
