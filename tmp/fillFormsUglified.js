javascript:function f(){var utils={randomText:function(len){for(var characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",output="",i=0;len>i;i++)output+=characters.charAt(54*Math.random());return output},randomNumber:function(){return Math.floor(99*Math.random()+1)},getDateFormat:function(format){return"function"==typeof moment?moment().format(format):void 0}},getDefaultValue=function(inputType,maxLength){maxLength||(maxLength=7);var defaults={EMAIL:{value:"f@ke.com"},PASSWORD:{value:"Password123"},CARD_NO:{value:"4444333322221111"},CVV:{value:"123"},PHONE:{value:"79797979"},TEXT:{value:utils.randomText(maxLength)},USERNAME:{value:"u"+utils.getDateFormat("X")},URL:{value:"http://www.fakeaddresshere.com"},NUMBER:{value:utils.randomNumber()},DATETIME:{value:utils.getDateFormat("YYYY-MM-DDTHH:mm")},DATE:{value:utils.getDateFormat("YYYY-MM-DD")},TIME:{value:utils.getDateFormat("HH:mm")},WEEK:{value:utils.getDateFormat("GGGG-[W]WW")},MONTH:{value:utils.getDateFormat("YYYY-MM")}};return defaults[inputType].value},inputChecker={defaults:[{includes:["mail"],type:"EMAIL"},{includes:["pass"],type:"PASSWORD"},{includes:["card"],excludes:["name","code"],type:"CARD_NO"},{includes:["cvv"],type:"CVV"},{includes:["phone","tel","mobile"],type:"PHONE"},{includes:["url","site"],type:"URL"},{includes:["username","userId"],type:"USERNAME"},{includes:["datetime"],type:"DATETIME"},{includes:["date"],type:"DATE"},{includes:["time"],type:"TIME"},{includes:["month"],type:"MONTH"},{includes:["week"],type:"WEEK"},{includes:["number","amount","range"],type:"NUMBER"},{includes:["text"],type:"TEXT"}],isEmpty:function(variable){return variable&&""!==variable&&"undefined"!==variable?void 0:!0},checkText:function(text){if(!this.isEmpty(text)){for(var inputType,excluded=!1,i=this.defaults.length-1;i>=0;i--)if(!this.isEmpty(this.defaults[i].includes))for(var j=this.defaults[i].includes.length-1;j>=0;j--)if(-1!=text.toLowerCase().indexOf(this.defaults[i].includes[j])){if(inputType=this.defaults[i].type,this.isEmpty(this.defaults[i].excludes))continue;for(var j=this.defaults[i].excludes.length-1;j>=0;j--)if(-1!=text.toLowerCase().indexOf(this.defaults[i].excludes[j])){excluded=!0;break}break}return excluded?void 0:inputType}},checkInput:function(input){var identifiedTextType,inputId=input.id;inputId&&(identifiedTextType=this.checkText(inputId));var inputName=input.name;this.isEmpty(identifiedTextType)&&!this.isEmpty(inputName)&&(identifiedTextType=this.checkText(inputName));var inputPlaceholder=input.placeholder;if(this.isEmpty(identifiedTextType)&&!this.isEmpty(inputPlaceholder)&&(identifiedTextType=this.checkText(inputPlaceholder)),this.isEmpty(identifiedTextType)&&!this.isEmpty(inputId))for(var labels=document.getElementsByTagName("LABEL"),i=0;i<labels.length;i++)if(!this.isEmpty(labels[i].htmlFor)&&labels[i].htmlFor===inputId){identifiedTextType=this.checkText(labels[i].innerHTML);break}var inputType=input.type;return this.isEmpty(identifiedTextType)&&!this.isEmpty(inputType)&&(identifiedTextType=this.checkText(inputType)),this.isEmpty(identifiedTextType)&&(identifiedTextType="TEXT"),identifiedTextType}},processInputElements=function(inputs){for(var i=0;i<inputs.length;i++){var input=inputs[i];if("radio"===input.type||"hidden"===input.type);else if("checkbox"===input.type)input.checked=!0;else if(input.value&&input.value.length>0);else{var inputCheckerResult=inputChecker.checkInput(input),maxLength=7;input.maxLength&&input.maxLength<7&&(maxLength=input.maxLength);var defaultValue=getDefaultValue(inputCheckerResult,maxLength);inputCheckerResult&&defaultValue&&(input.value=defaultValue)}}},processRadioButtonGroupElements=function(radios){for(var i=0;i<radios.length;i++){var group=radios[i].name,groupRadios=document.querySelectorAll("input[name="+group+"]:checked");groupRadios.length<1&&(radios[i].checked=!0)}},processSelectElements=function(selects){for(var i=0;i<selects.length;i++){var dd=selects[i];dd.selectedIndex=dd.querySelector('option[value]:not([value=""])').index,dd.dispatchEvent(new Event("change"))}},processTextAreaElements=function(textAreas){for(var i=0;i<textAreas.length;i++){var txtArea=textAreas[i];txtArea.value=utils.randomText(20)}};processRadioButtonGroupElements(document.querySelectorAll("input[type=radio]:not([disabled])")),processInputElements(document.querySelectorAll('input:not([disabled]):not([type="radio"])')),processSelectElements(document.querySelectorAll("select:not([disabled])")),processTextAreaElements(document.querySelectorAll("textarea:not([disabled])"))}f();