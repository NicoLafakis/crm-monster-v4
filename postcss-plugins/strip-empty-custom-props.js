module.exports = function stripEmptyCustomProps() {
  return {
    postcssPlugin: 'strip-empty-custom-props',
    Declaration(decl) {
      // Remove declarations that are custom properties with empty value, e.g. --tw-pan-x: ;
      if (decl.prop && decl.prop.startsWith('--') && (!decl.value || decl.value.trim() === '')) {
        decl.remove();
      }
    }
  };
};
module.exports.postcss = true;
