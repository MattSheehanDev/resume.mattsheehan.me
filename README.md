This is a slightly modified -- and very out of date -- version of the [Elegant Theme for JsonResume](https://github.com/mudassir0909/jsonresume-theme-elegant)

__This fork is deprecated and no longer supported__


#### Building

```sh
npm install
npm run build
npm run watch   # watches for .less file changes
npm run serve
```

Visit [http://localhost:8000](http://localhost:8000) to see it in action.
The build output is located in the `./build` directory.

#### Updating resume.json changes
You can test your changes by updating `resume.json` file.
You might want to rerun `grunt build` whenever you make any changes to `resume.json`

#### Updating Styles
All the LESS files are organized under the folder `assets/less/`. Please go through the comments inside `theme.less` to find out which file to put your LESS changes. Grunt compiles `assets/less/theme.less` to `assets/css/theme.css` which is used eventually in the theme.

#### Updating Javascript
All the javascript changes go into `index.js` which is responsible for rendering the theme.


