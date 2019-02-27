module.exports = {
  plugin: (schema, documents, config) => {
    const typesMap = schema.getQueryType();

    return Object.keys(typesMap).join('\n');
  }
};