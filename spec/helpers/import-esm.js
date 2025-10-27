// helper to load ES module default in jasmine (node)
module.exports = async function(path){
  const mod = await import(path);
  return mod.default || mod;
};
