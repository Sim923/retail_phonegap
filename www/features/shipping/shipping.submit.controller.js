/**
 * @fileOverview
 * @name shipping.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller("shipping.submit.controller", [
    'sale',
    'addresses',
    'parcelTemplates',
    'shippingSubmitService',
    function (sale, addresses, parcelTemplates, shippingSubmitService) {
      var oSale=angular.copy(sale.data);
      var id=oSale._id;
      var trackingNumbers=oSale.trackingNumbers;
      var sellerAddress = typeof(oSale.addresses.shipping.seller)==='undefined' ? {} : angular.copy(oSale.addresses.shipping.seller);
      var sellerAddresses = angular.copy(addresses.data);
      var shippingOptions = [];
      var shippingOption = null;

      var today = new Date();
      var validateSellerMessage = "";
      var ratesError = "";
      var manualMessage = "";
      var weight = "";
      var distance_unit = "in";
      var weight_unit = "lb";
      var parcel_templates = angular.copy(parcelTemplates.data);
      var shippingLabels = [];
      var isAddingShipping = false;

      var selectedSellerAddress = null;
      var selectedSubmissionType = null;
      var selectedShippingOption = null;
      var selectedLabelCarrier = null;
      var selectedLabelTemplate = null;

      var carriers = [
        {
          id: "fedex",
          text: "FedEx"
        }, {
          id: "usps",
          text: "USPS"
        }, {
          id: "ups",
          text: "UPS"
        }
      ];
      var tracking = {};
      var isAddingTrackingNumber = false;

      var shippingLabel = {
        carrier: "",
        template: "",
        length: "",
        width: "",
        height: "",
        distance_unit: "in",
        weight_unit: "lb",
        submission_type: "DROPOFF",
        weight: ""
      };

      var $this=this;

      /**
       * addressChanged
       * @param {object} address
       */
      var addressChanged = function(address) {
        console.log('addressChanged', address);
        if (address==="") {
          $this.address={};
        } else {
          $this.address=angular.copy(address);
        }
      };

      /**
       * saveAddress
       */
      var saveAddress = function() {
        if ($this.selectedSellerAddress) {
          console.log('selectedSellerAddress', $this.selectedSellerAddress);
          if ($this.selectedSellerAddress.shippoId) {
            shippingSubmitService.address.set($this.selectedSellerAddress);
            shippingSubmitService.address.save().then(
              function(resp) {
                console.log('shippingSubmitService.address.save.resp: ', resp);
                var seller = angular.copy(resp.data);
                oSale.addresses.shipping.seller=seller;
                var addresses = {
                  shipping : {
                    buyer:oSale.addresses.shipping.buyer._id,
                    seller:$this.selectedSellerAddress._id
                  },
                  billing : {
                    buyer:oSale.addresses.billing.buyer._id
                  }
                };
                console.log('addresses: ', addresses);
                shippingSubmitService.sale.addresses.update(id, addresses).then(
                  function(resp) {
                    $this.sellerAddress = shippingSubmitService.address.get();
                    console.log('selectedSellerAddress updated: ', $this.sellerAddress);
                    console.log(resp);
                  },
                  function(resp) {
                    console.log(resp);
                  }
                );
              },
              function(resp) {
              }
            );
          } else {
            console.log('Missing shippoId');
          }
        } else {
          shippingSubmitService.address.set(sellerAddress);
          shippingSubmitService.address.validate().then(
            function(resp) {
              sellerAddress.shippoId=resp.data.address.address.shippoId;
              sellerAddress.zipCode=resp.data.address.address.zip_code;
              shippingSubmitService.address.set(sellerAddress);
              shippingSubmitService.address.save().then(
                function(resp) {
                  var seller = angular.copy(resp.data);
                  oSale.addresses.shipping.seller=seller;
                  var addresses = {
                    shipping : {
                      buyer:oSale.addresses.shipping.buyer._id,
                      seller:seller._id
                    },
                    billing : {
                      buyer:oSale.addresses.billing.buyer._id
                    }
                  };
                  shippingSubmitService.sale.addresses.update(id, addresses).then(
                    function(resp) {
                      console.log(resp);
                    },
                    function(resp) {
                      console.log(resp);
                    }
                  );
                },
                function(resp) {
                }
              );
            },
            function(resp) {
            }
          );
        }
      };

      /**
       * getSelectedShippingOption
       * @returns {string}
       */
      var getSelectedShippingOption = function() {
        var option = $this.selectedShippingOption;
        return (typeof(option)==='undefined' || option===null) ? "" : option.trim();
      };

      /**
       * goToSummary
       */
      var goToSummary = function() {
        shippingSubmitService.goToSummary(id);
      };

      /**
       * changeShippingOption
       */
      var changeShippingOption = function() {
        var id = $this.selectedShippingOption;
        var arr = $this.shippingOptions;

        for (var i = 0; i < arr.length; i++) {
          if (id == arr[i].object_id) {
            $this.shippingOption = angular.copy(arr[i]);
          }
        }
      };

      /**
       * changeSubmissionType
       */
      var changeSubmissionType = function() {
        if (shippingLabel.submission_type == "DROPOFF") {
          shippingLabel.submission_date = "";
        }
      };

      /**
       * createShippingLabel
       */
      var createShippingLabel = function() {
        console.log('createShippingLabel');
        $this.isAddingShipping = true;
      };

      /**
       * showShippingLabel
       * @param {object} label
       */
      var showShippingLabel = function(label) {
        shippingSubmitService.showShippingLabel(label);
      };

      /**
       * showReturnLabel
       * @param {object} label
       */
      var showReturnLabel = function(label) {
        shippingSubmitService.showReturnLabel(label);
      };

      /**
       * refundLabel
       * @param {object} label
       */
      var refundLabel = function(label) {
        console.log('void label: ', label);
        shippingSubmitService.labels.refund(label).then(
          function(resp) {
            console.log(resp.data);
          },
          function(resp) {
            console.log(resp);
          }
        );
      };

      /**
       * guid
       *
       * @returns {string}
       */
      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
      }

      /**
       * saveShippingLabel
       */
      var saveShippingLabel = function() {
        console.log('shipping.controller.saveShippingLabel');
        var sale = oSale;
        var now = new Date();
        var shippo = shippingSubmitService.gateway.get();
        var currentShipmentId = shippingSubmitService.shipment.get().shipmentId;

        var po = {
          carrier: $this.selectedLabelCarrier,
          shippo: shippo,
          option: $this.shippingOption,
          shipmentId: currentShipmentId,
          guid: guid()
        };
        $this.shippingLabels.push(po);
        shippingSubmitService.labels.add(po);
        $this.isAddingShipping = false;
      };

      /**
       * cancelShippingLabel
       */
      var cancelShippingLabel = function() {
        $this.isAddingShipping = false;
      };

      /**
       * changeDistanceUnit
       * @param {number} distance_unit
       * @returns {null}
       */
      var changeDistanceUnit = function(distance_unit) {
        return null;
      };

      /**
       * changeWeightUnit
       * @param {number} weight_unit
       * @returns {null}
       */
      var changeWeightUnit = function(weight_unit) {
        return null;
      };

      /**
       * changeShippingTemplate
       * @param {object} template
       */
      var changeShippingTemplate = function(template) {
        console.log('shipping.controller.changeShippingTemplate', template);
        shippingLabel.template = template;

        for (var i = 0; i < parcel_templates.length; i++) {
          var id = parcel_templates[i].id;

          if (id == template) {
            shippingLabel.length = parseFloat(parcel_templates[i].length);
            shippingLabel.width = parseFloat(parcel_templates[i].width);
            shippingLabel.height = parseFloat(parcel_templates[i].height);
            shippingLabel.distance_unit = parcel_templates[i].distance_unit;
            shippingLabel.weight = parseFloat(parcel_templates[i].weight);
            shippingLabel.weight_unit = parcel_templates[i].mass_unit;
          }
        }

        if (typeof(template)==="undefined") {
          shippingLabel.length = "";
          shippingLabel.width = "";
          shippingLabel.height = "";
          weight = "";
          distance_unit = "in";
          weight_unit = "lb";
        }
      };

      /**
       * changeShippingCarrier
       */
      var changeShippingCarrier = function() {
        console.log('shipping.controller.changeShippingCarrier');
      };

      /**
       * addTrackingNumber
       */
      var addTrackingNumber = function() {
        $this.isAddingTrackingNumber = true;
      };

      /**
       * cancelTrackingNumber
       */
      var cancelTrackingNumber = function() {
        $this.tracking = {};
        $this.isAddingTrackingNumber = false;
      };

      /**
       * saveTrackingNumber
       * @param {string} trackingNumber
       */
      // var saveTrackingNumber = function(trackingNumber) {
      //   trackingNumber.id = id;
      //   trackingNumber.purchaserId = oSale.soldToUserId._id;
      //   shippingSubmitService.tracking.get(trackingNumber).then(
      //     function(data) {
      //       var result = data.data.result;
      //       if (result) {
      //         var status = data.data.status;
      //         trackingNumber.status = status;
      //         shippingSubmitService.tracking.save(trackingNumber).then(
      //           function(data) {
      //             var result = data.data.result;
      //             oSale.trackingNumbers.push(trackingNumber);
      //             cancelTrackingNumber();
      //           },
      //           function(resp) {
      //             console.log(resp);
      //           }
      //         );
      //       } else {
      //         console.log("There was a problem with that tracking number.", 'danger');
      //       }
      //     },
      //     function(resp) {
      //       console.log(resp.data.message, 'danger');
      //     }
      //   );
      // };
      var saveTrackingNumber = function(trackingNumber) {
      trackingNumber.saleId = id;
      trackingNumber.purchaserId = oSale.soldToUserId._id;
      shippingSubmitService.tracking.get(trackingNumber).then(
        function(data) {
          var result = data.data.result;
          if (result) {
            var status = data.data.status;
            trackingNumber.status = status;
            shippingSubmitService.tracking.save(trackingNumber).then(
              function(data) {
                var result = data.data.result;
                oSale.trackingNumbers.push(trackingNumber);
                cancelTrackingNumber();
              },
              function(resp) {
                console.log(resp);
              }
            );
          } else {
            console.log("There was a problem with that tracking number.", 'danger');
          }
        },
        function(resp) {
          console.log(resp.data.message, 'danger');
        }
      );
    };

      /**
       * removeShippingLabel
       * @param {string} label
       */
      var removeShippingLabel = function(label) {
        for (var i = 0; i < $this.shippingLabels.length; i++) {
          if (label.guid == $this.shippingLabels[i].guid) {
            $this.shippingLabels.splice(i, 1);
          }
        }
      };

      /**
       * removeTrackingNumber
       * @param {string} trackingNumber
       */
      var removeTrackingNumber = function(trackingNumber) {
        trackingNumber.id = id;
        trackingNumber._id = oSale.soldToUserId._id;
        shippingSubmitService.tracking.remove(trackingNumber).then(
          function(data) {
            var result = data.data.result;
            if (result) {
              var index = -1;
              for (var i = 0; i < trackingNumbers.length; i++) {
                var o = trackingNumbers[i];
                if (o.tracking_number == trackingNumber.tracking_number) {
                  index = i;
                  break;
                }
              }
              if (index == -1) {
                alert("Something went wrong.");
              }
              trackingNumbers.splice(index, 1);
            }
          },
          function(resp) {
            console.log(resp.data.message, 'danger');
          }
        );
      };

      /**
       * savedAddressChange
       * @param {object} addressObject
       */
      var savedAddressChanged = function(addressObject) {
        if (addressObject) {
        } else {
        }
      };

      /**
       * getRates
       * @param {string} label
       * @param {object} sale
       */
      var getRates = function(label, sale) {
        console.log('label: ', label);
        console.log('sale: ', sale);
        //
        // Initialize the shipping options structures each time a rate request is made
        //
        $this.shippingOptions = [];
        $this.selectedShippingOption = null;
        shippingOption = null;
        shippingSubmitService.rates.get(label, sale).then(
          function(response) {
            var rates = response.data.result;
            var shippo = angular.copy(response.data.shippo);
            shippingSubmitService.gateway.set(shippo);
            $this.shippingOptions = angular.copy(rates);
            $this.selectedShippingOption = rates[0].object_id;
            $this.shippingOption = rates[0];
            shippingSubmitService.shipment.set(shippo);
          },
          function(resp) {
            console.log(resp.data, "danger");
          }
        );
      };

      var build = function() {
        var tracking = angular.copy(oSale.trackingNumbers);
        for (var i = 0; i < tracking.length; i++) {
          var o = tracking[i];
          if (typeof(o.shippoId)==="undefined") {
            trackingNumbers.push(o);
          } else {
            $this.shippingLabels.push(o);
          }
        }
      };

      /**
       * getShippingLabelTotalAmount
       * @returns {float}
       */
      var getShippingLabelTotalAmount = function() {
        var total = 0.0;
        for (var i = 0; i < $this.shippingLabels.length; i++) {
          var text = $this.shippingLabels[i].option.amount;
          total += parseFloat(text);
        }
        return total.toFixed(2);
      };

      /**
       * init
       */
      var init = function() {
        console.log("shipping.submit.controller.init");
      };

      init();

      angular.extend(this, {
        sale:oSale,
        trackingNumbers:trackingNumbers,
        tracking:tracking,
        sellerAddress:sellerAddress,
        shippingLabels:shippingLabels,
        shippingLabel:shippingLabel,
        parcel_templates:parcel_templates,
        id:id,
        sellerAddresses:sellerAddresses,
        saveAddress:saveAddress,
        addressChanged:addressChanged,
        goToSummary:goToSummary,
        getShippingLabelTotalAmount:getShippingLabelTotalAmount,
        removeShippingLabel:removeShippingLabel,
        addTrackingNumber:addTrackingNumber,
        getSelectedShippingOption:getSelectedShippingOption,
        selectedLabelCarrier:selectedLabelCarrier,
        selectedLabelTemplate:selectedLabelTemplate,
        carriers:carriers,
        shippingOptions:shippingOptions,
        shippingOption:shippingOption,
        getRates:getRates,
        today:today,
        ratesError:ratesError,
        manualMessage:manualMessage,
        isAddingShipping:isAddingShipping,
        isAddingTrackingNumber:isAddingTrackingNumber,
        saveShippingLabel:saveShippingLabel,
        createShippingLabel:createShippingLabel,
        changeShippingCarrier:changeShippingCarrier,
        changeShippingTemplate:changeShippingTemplate,
        changeShippingOption:changeShippingOption,
        saveTrackingNumber:saveTrackingNumber,
        cancelTrackingNumber:cancelTrackingNumber,
        cancelShippingLabel:cancelShippingLabel,
        refundLabel:refundLabel
      });
    }
  ]);
})(console, angular);
