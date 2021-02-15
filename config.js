export const VersionStatus = Object.freeze({
  latest: `latest`,
  preview: `preview`,
  obsolete: `obsolete`,
});

export const config = {
  githubDemosBasePath: `https://github.com/FACT-Finder-Web-Components/demos/blob/release`,
  demosBasePath: `https://search-web-components.fact-finder.de/demos`,
  factFinder: {
    url: `https://search-web-components.fact-finder.de/FACT-Finder-7.2`,
    channel: `webc-doku-text`,
    version: `7.2`
  },
  downloadToolUrl: `https://search-web-components.fact-finder.de/webcomponents-build-tool`,
  versions: [
    { name: `4.x`, displayName: `4.x (latest)`, status: VersionStatus.latest },
    { name: `3.x`, displayName: `3.x`, status: VersionStatus.obsolete },
    { name: `1.x`, displayName: `1.x`, status: VersionStatus.obsolete },
  ]
};

export function getLatestVersion() {
  return config.versions.find(ver => ver.status === VersionStatus.latest);
}
