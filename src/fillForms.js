function f(){
	
    var utils = {
        randomText: 
            function(len) {
                var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                var output = "";
                for (var i = 0; i < len; i++) {
                    output = output + characters.charAt(Math.random()*54);
                }
                return output;
            },
        randomNumber:
            function() {
                return Math.floor((Math.random()*99) +1);
            },
        getTimestamp:
            function() {
                var date = new Date();
                return date.getTime();
            }
    };

    var getDefaultValue = function(inputType, maxLength) {
        if (!maxLength) {
            maxLength = 7;
        }

        /*The default object with which the fields will be filled up*/
        var defaults = {
            "EMAIL"    : {value:'f@ke.com'},
            "PASSWORD" : {value:'Password123'},
            "CARD_NO"  : {value:'4444333322221111'},
            "CVV"      : {value:'123'},
            "PHONE"    : {value:'79797979'},
            "TEXT"     : {value: utils.randomText(maxLength)},
            "USERNAME" : {value: 'u' + utils.getTimestamp()},
            "URL"      : {value: "http://www.fakeaddresshere.com"},
            "NUMBER"   : {value: utils.randomNumber()}
        };
        return defaults[inputType].value;
    }

    /*Checker text which the inputs should be matched to
        The values which are assigned have a priority. The first in the list
        has the most priority over the others in the list
    */
    var inputChecker = {
        defaults: [
            {includes: ["mail"], type:"EMAIL"},
            {includes: ["pass"], type:"PASSWORD"},
            {includes: ["card"], excludes: ["name", "code"], type:"CARD_NO"},
            {includes: ["cvv"],  type:"CVV"},
            {includes: ["phone", "tel", "mobile"], type:"PHONE"},
            {includes: ["url", "site"], type:"URL"},
            {includes: ["username", "userId", "user"], type:"USERNAME"},
            {includes: ["number"], type:"NUMBER"},
            {includes: ["text"],  type:"TEXT"}],

        isEmpty: function(variable) {
            if (!variable || variable === '' || variable === 'undefined') {
                return true;
            }
        },

        checkText: function(text) {

            if (this.isEmpty(text)){
                return;
            }

            var inputType;
            var excluded = false;

            /*First we try to match the text we have with one of the default includes*/
            for (var i = this.defaults.length - 1; i >= 0; i--) {
                if (this.isEmpty(this.defaults[i].includes)) {
                    continue;
                }
                for (var j = this.defaults[i].includes.length - 1; j >= 0; j--) {

                    if (text.toLowerCase().indexOf(this.defaults[i].includes[j]) != -1) {
                        inputType = this.defaults[i].type;

                        /*If we find a match with one of the includes we then check that the text
                        does not also match one of the exluded of the same type*/

                        if (this.isEmpty(this.defaults[i].excludes)) {
                            continue;
                        }

                        for (var j = this.defaults[i].excludes.length - 1; j >= 0; j--) {
                            if (text.toLowerCase().indexOf(this.defaults[i].excludes[j]) != -1) {
                                excluded = true;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            if (!excluded) {
                return inputType;
            }
        },

        checkInput: function(input) {

            var identifiedTextType;

            //check input id
            var inputId = input.id;
            if (inputId) {
                identifiedTextType = this.checkText(inputId);
            }

            //check input name
            var inputName = input.name;
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputName)) {
                identifiedTextType = this.checkText(inputName);
            }

            //Check input label
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputId)) {
                var labels = document.getElementsByTagName('LABEL');
                for (var i = 0; i < labels.length; i++) {
                    if (!this.isEmpty(labels[i].htmlFor) && labels[i].htmlFor === inputId) {
                        identifiedTextType = this.checkText(labels[i].innerHTML);
                        break;
                    }
                }
            }

            //check input type
            var inputType = input.type;
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputType)) {
                identifiedTextType = this.checkText(inputType);
            }

            return identifiedTextType;
        }
    };

	/*A function that given an array of input elements would fill them up
	with the respective values*/
	var processInputElements = function(inputs) {

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

			/*Only the supported input types are considered for prefilling
			skip any others*/
			if (input.type === 'checkbox' || input.type === 'text' || input.type === 'number' || input.type === 'password') {
			
				if (input.type === 'checkbox') {
					/*tick all checkboxes found*/
					input.checked = true;
				} else if (input.value && input.value.length > 0) {
					/*we do not alter the value in the text box if it is not empty*/
				} else {
					var inputCheckerResult = inputChecker.checkInput(input);

					/**Checking for the max length that is allowed by this input
					 if not defined the value is very large and therefore we do not want to use it **/
					var maxLength = 7;

					if (input.maxLength && input.maxLength < 7) {
						maxLength = input.maxLength;
					}

					var defaultValue = getDefaultValue(inputCheckerResult, maxLength);

					if (inputCheckerResult && defaultValue) {
						input.value = defaultValue;
					}
				}
			}
			
		}
	};
	
	/*function which given an array of selects would choose a random option*/
	var processSelectElements = function(selects) {
		for(var i = 0; i < selects.length; i++){
			var dd = selects[i];
            /*Only change select elements which are not disabled*/
            if (!dd.disabled) {
    			dd.selectedIndex = Math.random() * (selects.length - 1) + 1;
                // Triggers the change event
                dd.dispatchEvent(new Event('change'));
            }
		}
	};
	
	/*lookup for the form elements to fill*/
    processInputElements(document.getElementsByTagName('input'));
    processSelectElements(document.getElementsByTagName('select'));
}f();