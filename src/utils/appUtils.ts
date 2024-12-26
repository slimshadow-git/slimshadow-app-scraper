export function getAppNameAndVersion(filename: string): { name: string; version: string } {
  // Remove file extension
  const withoutExt = filename.replace('.apk', '');
  
  // Split by version identifier
  const parts = withoutExt.split(' - v');
  
  if (parts.length !== 2) {
    return {
      name: filename,
      version: 'Unknown'
    };
  }

  const [name, versionWithSuffix] = parts;
  
  // Remove "Premium" or other suffixes from version
  const version = versionWithSuffix.split(' - ')[0];

  return {
    name: name.trim(),
    version: version.trim()
  };
}