var haml = require('haml'),
    fs = require('fs'),
    path = require('path');


var Engine = function(hamlDir) {
    var viewDir = path.resolve(hamlDir),
        getView = function(name) {
            return fs.readFileSync(path.join(viewDir,name + ".haml"), 'utf8');
        },
        master = getView('layout');

    this.renderView = function(viewName, data) {
        var viewData = {
            title: "Totally Over-simplified View Engine",
            contents: haml.render(getView(viewName), {locals: data})
        };
        return haml.render(master, {locals: viewData});
    }
};

exports.HamlEngine = Engine;