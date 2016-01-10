# JSON Resume

### Social Profiles
The profiles are shown in the order in which they are specified in the `basics.profiles` array. By default, only 5 profiles are shown & others are revealed on demand.


#### Supported Profiles
* angellist
* behance
* bitbucket
* codepen
* dribbble
* dribble
* exercism
* facebook
* foursquare
* instagram
* github
* googleplus
* gratipay
* hackernews
* lastfm
* linkedin
* pinterest
* reddit
* skype
* soundcloud
* spotify
* stackexchange
* stackoverflow
* tumblr
* twitter
* vimeo
* youtube

### Credits
* Floating Menu: inspired by [Smart Fixed Navigation](http://codyhouse.co/demo/smart-fixed-navigation/index.html)

### Contributing
```
$ git clone https://github.com/sheehamj13/jsonresume-theme-elegant.git
$ cd jsonresume-theme-elegant
$ npm install
$ grunt build
$ grunt watch // watches for less file changes
$ grunt exec:run_server
```

Visit [http://localhost:8000](http://localhost:8000) to see the theme in action.

##### Testing JSON changes
You can test your changes by updating `resume.json` file.
You might want to rerun `grunt build` whenever you make any changes to `resume.json`

##### Updating Styles
All the LESS files are organized under the folder `assets/less/`. Please go through the comments inside `theme.less` to find out which file to put your LESS changes. Grunt compiles `assets/less/theme.less` to `assets/css/theme.css` which is used eventually in the theme.

##### Updating Javascript
All the javascript changes go into `index.js` which is responsible for rendering the theme.
