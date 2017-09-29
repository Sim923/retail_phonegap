module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      vendors: {
        src: ['../www/vendors/client.js',
          '../www/vendors/hosted-fields.js',
          '../www/vendors/moment.min.js',
          '../www/vendors/underscore-min.js',
          '../www/vendors/angular.js',
          '../www/vendors/angular-sanitize.min.js',
          '../www/vendors/angular-messages.min.js',
          '../www/vendors/angular-ui-router.min.js',
          '../www/vendors/angular-animate.min.js',
          '../www/vendors/sockjs.min.js',
          '../www/vendors/angular-sockjs.js',
          '../www/vendors/angular-moment.min.js',
          '../www/vendors/angular-underscore.min.js',
          '../www/vendors/ui-scroll-jqlite.min.js',
          '../www/vendors/ui-scroll.min.js',
          '../www/vendors/ng-infinite-scroll.min.js',
          '../www/vendors/angular-sanitize.min.js',
          '../www/vendors/angular-strap.min.js',
          '../www/vendors/angular-strap.tpl.min.js',
          '../www/vendors/angular-aria.min.js',
          '../www/vendors/angular-material.min.js',
          '../www/vendors/jk-carousel.js',
          '../www/vendors/ng-pinch-zoom.min.js',
          '../www/vendors/flow.js',
          '../www/vendors/ng-flow.js',
          '../www/vendors/ng-sortable.js',
          '../www/vendors/fabric.all.min.js',
          '../www/vendors/darkroom.js',
          '../www/vendors/angular-darkroom.min.js',
          '../www/vendors/ng-map.debug.js',
          '../www/vendors/angular-zendesk-widget.min.js',
          '../www/vendors/ng-cordova.js'
        ],
        dest: './vendors.js'
      },
      app_source: {
        src: ['../www/app.js',
          '../www/app.routes.js',
          '../www/app.services.js',
          '../www/app.controllers.js',
          '../www/shared/**/*.js',
          '../www/common/directives/feedbackDirective.js',
          '../www/common/directives/passwordValidator.js',
          '../www/common/directives/usernameAvailabilityValidator.js',
          '../www/common/directives/emailAvailabilityValidator.js',
          '../www/common/directives/compareToDirective.js',
          '../www/common/directives/stepperDirective.js',
          '../www/common/directives/cordovaKeyboard.js',
          '../www/features/login/login.controller.js',
          '../www/features/login/login.service.js',
          '../www/features/login/login.routes.js',
          '../www/common/navigation/bottom/bottom.controller.js',
          '../www/common/navigation/bottom/bottom.service.js',
          '../www/common/navigation/top/top.controller.js',
          '../www/common/navigation/top/top.item.controller.js',
          '../www/common/navigation/top/top.service.js',
          '../www/features/details/item/item.controller.js',
          '../www/features/details/item/item.routes.js',
          '../www/features/details/item/item.offer.controller.js',
          '../www/features/details/item/item.offer.service.js',
          '../www/features/details/adventure/adventure.controller.js',
          '../www/features/details/adventure/adventure.routes.js',
          '../www/features/edit/item/item.edit.controller.js',
          '../www/features/edit/item/item.routes.js',
          '../www/features/edit/adventure/adventure.edit.controller.js',
          '../www/features/edit/adventure/adventure.routes.js',
          '../www/features/browse/browse.controller.js',
          '../www/features/browse/browse.service.js',
          '../www/features/browse/category/category.controller.js',
          '../www/features/browse/category/category.service.js',
          '../www/features/browse/category/category.routes.js',
          '../www/features/cart/cart.controller.js',
          '../www/features/cart/cart.service.js',
          '../www/features/cart/cart.success.controller.js',
          '../www/features/cart/cart.shipping.controller.js',
          '../www/features/cart/cart.shipping.service.js',
          '../www/features/cart/cart.payment.controller.js',
          '../www/features/cart/cart.payment.service.js',
          '../www/features/cart/cart.routes.js',
          '../www/features/checklist/checklist.controller.js',
          '../www/features/checklist/checklist.service.js',
          '../www/features/confirm-reminder/confirm.controller.js',
          '../www/features/confirm-reminder/confirm.service.js',
          '../www/features/profile/profile.referrals.controller.js',
          '../www/features/profile/profile.notifications.controller.js',
          '../www/features/profile/profile.notifications.service.js',
          '../www/features/profile/profile.referrals.service.js',
          '../www/features/register/register.quick.controller.js',
          '../www/features/register/register.quick.service.js',
          '../www/features/register/register.controller.js',
          '../www/features/register/register.step2.controller.js',
          '../www/features/register/register.step3.controller.js',
          '../www/features/register/register.confirmation.controller.js',
          '../www/features/register/register.success.controller.js',
          '../www/features/register/register.service.js',
          '../www/features/register/register.routes.js',
          '../www/features/refund/refund.controller.js',
          '../www/features/refund/refund.service.js',
          '../www/features/refund/refund.routes.js',
          '../www/features/search/search.service.js',
          '../www/features/search/search.controller.js',
          '../www/features/shipping/shipping.routes.js',
          '../www/features/shipping/shipping.service.js',
          '../www/features/shipping/shipping.submit.controller.js',
          '../www/features/shipping/shipping.submit.service.js',
          '../www/features/shipping/shipping.summary.controller.js',
          '../www/features/shipping/shipping.summary.service.js',
          '../www/features/messaging/messaging.service.js',
          '../www/features/messaging/messaging.controller.js',
          '../www/features/sell/sell.landing.service.js',
          '../www/features/sell/sell.landing.controller.js',
          '../www/features/sell/sell.landing.routes.js',
          '../www/features/listing/item/item.routes.js',
          '../www/features/listing/item/item.step.1.controller.js',
          '../www/features/listing/item/item.step.2.controller.js',
          '../www/features/listing/item/item.step.3.controller.js',
          '../www/features/listing/item/item.step.4.controller.js',
          '../www/features/listing/item/item.step.5.controller.js',
          '../www/features/listing/item/item.options.payment.controller.js',
          '../www/features/listing/item/item.options.payment.service.js',
          '../www/features/listing/item/item.success.controller.js',
          '../www/features/listing/adventure/adventure.routes.js',
          '../www/features/listing/adventure/adventure.step.1.controller.js',
          '../www/features/listing/adventure/adventure.step.2.controller.js',
          '../www/features/listing/adventure/adventure.step.3.controller.js',
          '../www/features/listing/adventure/adventure.step.4.controller.js',
          '../www/features/listing/adventure/adventure.payment.controller.js',
          '../www/features/listing/adventure/adventure.payment.service.js',
          '../www/features/listing/adventure/adventure.success.controller.js',
          '../www/features/profile/profile.service.js',
          '../www/features/profile/profile.routes.js',
          '../www/features/profile/profile.controller.js',
          '../www/features/profile/profile.adventures.service.js',
          '../www/features/profile/profile.adventures.controller.js',
          '../www/features/profile/profile.address.controller.js',
          '../www/features/profile/profile.address.service.js',
          '../www/features/profile/profile.address.edit.controller.js',
          '../www/features/profile/profile.items.service.js',
          '../www/features/profile/profile.items.controller.js',
          '../www/features/profile/profile.watchlist.service.js',
          '../www/features/profile/profile.watchlist.controller.js',
          '../www/features/profile/profile.details.service.js',
          '../www/features/profile/profile.details.controller.js',
          '../www/features/profile/profile.feedback.service.js',
          '../www/features/profile/profile.feedback.controller.js',
          '../www/features/profile/profile.messages.controller.js',
          '../www/features/messaging/messaging.threads.controller.js',
          '../www/features/profile/profile.messages.service.js',
          '../www/features/profile/profile.sales.service.js',
          '../www/features/profile/profile.sales.controller.js',
          '../www/features/profile/profile.feedback.submit.service.js',
          '../www/features/profile/profile.feedback.submit.controller.js',
          '../www/features/profile/profile.seller.settings.controller.js',
          '../www/features/profile/profile.seller.settings.service.js',
          '../www/features/profile/profile.purchased.controller.js',
          '../www/features/profile/profile.purchased.service.js',
          '../www/features/profile/profile.support.controller.js',
          '../www/features/profile/profile.support.service.js',
          '../www/features/messaging/messaging.controller.js',
          '../www/features/messaging/messaging.service.js',
          '../www/features/subscription/subscription.routes.js',
          '../www/features/subscription/subscription.controller.js',
          '../www/features/subscription/subscriptions.payment.controller.js',
          '../www/features/subscription/subscriptions.payment.service.js',
          '../www/features/subscription/subscriptions.signup.controller.js',
          '../www/features/subscription/subscriptions.signup.service.js',
          '../www/features/subscription/subscriptions.successful.controller.js',
          '../www/features/subscription/subscriptions.successful.service.js',
          '../www/features/subscription/subscriptions.summary.controller.js',
          '../www/features/subscription/subscriptions.summary.service.js',
          '../www/features/subscription/subscriptions.select.controller.js',
          '../www/features/subscription/subscriptions.select.service.js',
          '../www/features/recovery/recovery.routes.js',
          '../www/features/recovery/recovery.check.controller.js',
          '../www/features/recovery/recovery.check.service.js',
          '../www/features/recovery/recovery.enter.controller.js',
          '../www/features/recovery/recovery.enter.service.js',
          '../www/features/recovery/recovery.new.controller.js',
          '../www/features/recovery/recovery.new.service.js',
          '../www/features/recovery/recovery.success.controller.js',
          '../www/features/recovery/recovery.success.service.js'
        ],
        dest: './app_source.js'
      },
      build: {
        src: ['./vendors.js', './app_source.js'],
        dest: './<%= pkg.name %>.min.js'
      },
      css: {
        src: ['../www/css/darkroom.css',
          '../www/css/bootstrap.min.css',
          '../www/css/bootstrap-theme.min.css',
          '../www/css/ng-sortable.min.css',
          '../www/css/main.css',
          '../www/css/jk-carousel.css',
          '../www/css/angular-material.min.css'
        ],
        dest: './<%= pkg.name %>.min.css'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './app_source.js',
        dest: './app_source_ugly.js'
      }
    },

    clean: {
      temp: {
        src: ['./vendors.js', './app_source.js', './<%= pkg.name %>.min.js']
      }
    },

    copy: {
      optimized: {
        files: [

          // includes files within path and its sub-directories
          {
            expand: true,
            src: ['./index.html'],
            dest: '../platforms/ios/www/'
          },
          {
            expand: true,
            src: ['./index.html'],
            dest: '../platforms/android/assets/www/'
          },
          {
            expand: true,
            src: ['./<%= pkg.name %>.min.js'],
            dest: '../platforms/ios/www/'
          },
          {
            expand: true,
            src: ['./<%= pkg.name %>.min.js'],
            dest: '../platforms/android/assets/www/'
          }
        ]
      }

    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['concat:vendors', 'concat:app_source', 'concat:build', 'copy:optimized', 'clean:temp']);

};
