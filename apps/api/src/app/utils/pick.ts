const pick = <T extends Record<string, unknown>, k extends keyof T>(object: T, keys: k[]) => {
  // Initialize an empty object to store the selected properties
  const finalObject: Partial<T> = {};

  // Iterate over each key in the provided keys array
  for (const key of keys) {
    // Check if the object contains the specified key to avoid undefined properties
    if (object && Object.hasOwnProperty.call(object, key)) {
      // Add the key-value pair to finalObject if the key exists in the object
      finalObject[key] = object[key];
    }
  }

  // Return the new object containing only the selected properties
  return finalObject;
};

export default pick;
