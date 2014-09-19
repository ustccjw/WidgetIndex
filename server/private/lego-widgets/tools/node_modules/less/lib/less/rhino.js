var name;

// see https://github.com/cloudhead/less.js/pull/625
function writeError(e) {
    print("[ERROR] " + e.message + " (line:" + e.line + ", column:" + e.column + ")");
}
function loadStyleSheet(sheet, callback, reload, remaining) {
    //var sheetName = name.slice(0, name.lastIndexOf('/') + 1) + sheet.href;
    var sheetName = sheet.href;
    var input = readFile(sheetName, 'utf-8');
    var parser = new less.Parser({
        paths: [sheet.href.replace(/[\w\.-]+$/, '')]
    });
    parser.parse(input, function (e, root) {
        if (e) {
            // see https://github.com/cloudhead/less.js/pull/625
            //print("Error: " + e);
            writeError(e);
            quit(1);
        }
        // see https://github.com/cloudhead/less.js/pull/625
        //callback(root, sheet, { local: false, lastModified: 0, remaining: remaining });
        callback(null, root, sheet, { local: false, lastModified: 0, remaining: remaining });
    });

    // callback({}, sheet, { local: true, remaining: remaining });
}

function writeFile(filename, content) {
    //var fstream = new java.io.FileWriter(filename);
    var fstream = new java.io.OutputStreamWriter(new java.io.FileOutputStream(filename), 'utf-8')
    var out = new java.io.BufferedWriter(fstream);
    out.write(content);
    out.close();
}

// Command line integration via Rhino
(function (args) {
    var options = {
        compress: false,
        yuicompress: false,
        optimization: 1,
        silent: false,
        paths: [],
        color: true,
        strictImports: false
    };

    args = args.filter(function (arg) {
        var match;

        if (match = arg.match(/^-I(.+)$/)) {
            options.paths.push(match[1]);
            return false;
        }

        if (match = arg.match(/^--?([a-z][0-9a-z-]*)(?:=([^\s]+))?$/i)) { arg = match[1] }
        else { return arg }

        switch (arg) {
            case 'v':
            case 'version':
                sys.puts("lessc " + less.version.join('.') + " (LESS Compiler) [JavaScript]");
                quit(0);
            case 'verbose':
                options.verbose = true;
                break;
            case 's':
            case 'silent':
                options.silent = true;
                break;
            case 'strict-imports':
                options.strictImports = true;
                break;
            case 'h':
            case 'help':
                sys.puts("usage: lessc source [destination]");
                quit(0);
            case 'x':
            case 'compress':
                options.compress = true;
                break;
            case 'yui-compress':
                options.yuicompress = true;
                break;
            case 'no-color':
                options.color = false;
                break;
            case 'include-path':
                options.paths = match[2].split(java.lang.System.getProperty('os.name').match(/Windows/) ? ';' : ':')
                    .map(function(p) {
                        if (p) {
                            //return path.resolve(process.cwd(), p);
                            //return new java.io.File(p).getAbsolutePath();
                            return p + (/\/$/.test(p) ? '' : '/');
                        }
                    });
                break;
            case 'O0': options.optimization = 0; break;
            case 'O1': options.optimization = 1; break;
            case 'O2': options.optimization = 2; break;
        }
    });
    name = args[0];
    var output = args[1];

    if (!name) {
        print('No files present in the fileset; Check your pattern match in build.xml');
        quit(1);
    }
    path = name.split("/");path.pop();path=path.join("/")
    options.paths.length <= 0 && options.paths.push(path + '/');

    var input = readFile(name, 'utf-8');

    if (!input) {
        print('lesscss: couldn\'t open file ' + name);
        quit(1);
    }

    var result;
    var parser = new less.Parser({
        //paths: [new java.io.File(name).getAbsoluteFile().getParent()].concat(options.paths),
        paths: options.paths,
        optimization: options.optimization,
        filename: name,
        strictImports: options.strictImports
    });
    parser.parse(input, function (e, root) {
        if (e) {
            // see https://github.com/cloudhead/less.js/pull/625
            writeError(e);
            quit(1);
        } else {
            result = root.toCSS();
            if (output) {
                writeFile(output, result);
                print("Written to " + output);
            } else {
                print(result);
            }
            quit(0);
        }
    });
    print("done");
}(arguments));
