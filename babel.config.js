module.exports = {
  "env": {
    "test": {
      "presets": [["env", { "targets": { "node": "current" } }]]
    },
    "dev":{
      "presets":['@vue/cli-plugin-babel/preset']
    }
  }
}
