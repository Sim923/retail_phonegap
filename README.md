# ReelTrail Mobile App

## Development stack
- Cordova
- Angular 1

## Installation

```
$ git clone http://{{username}}@gitlab.reeltrail.com/Mobile/app.git

$ cd app

$ cordova add platform ios

$ cordova add platform android

$ cordova build

```

## Installation notes

- `app/plaforms` directory now holds the xcode and android projects
- `app/www` is the source directory of the app. The code needs to be updated here, then when ready to test, just do a ` $ cordova build ` command again to build the ios and android version.

## Optimization

- Once the apps are ready to be released, you can optimize the code, basically it integrates all the code on one file only for faster loading.

```
$ cd optimization

$ npm install

$ grunt

```

- This will bundle all the Javascripts into one file and it will be copy over each platform. Please see the Gruntfile.js for more details.

## Version Control
  - Git - https://git-scm.com

## References

- https://cordova.apache.org
- https://angular.io
