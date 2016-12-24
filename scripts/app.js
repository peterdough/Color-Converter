(function(){
	var colorValues = [
		{
			rgb: "rgb(255, 255, 255)",
			hex: "#FFFFFF",
			updatedColor: "rgb(255, 255, 255)"
		},
		{
			rgb: "rgb(255, 255, 255)",
			hex: "#FFFFFF",
			updatedColor: "rgb(255, 255, 255)"
		}
	];
	
	var app = angular.module("colorConverterTwo", []);
	
	app.controller("ConverterController", function() {
		this.colors = colorValues;
		
		// RETURNS TRUE IF color.rgb IS A VALID RGB VALUE
		this.isValidRgb = function(color) {
			var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color.rgb);
			if(digits === null) {
				color.updatedColor = "rgb(255, 255, 255)";
				return false;
			}
			else {
				return true;
			}
		};
		
		// RETURNS TRUE IF color.hex IS A VALID HEX VALUE
		this.isValidHex = function(color) {
			var digits = /^#[0-9A-F]{6}$/i.exec(color.hex);
			if(digits === null){
				// RESETS THE SWATCH
				color.updatedColor = "rgb(255, 255, 255)";
				return false;
			}
			else {
				return true;
			}
		};
		
		// CONVERTS RGB VALUES INTO HEX
		// ONLY GETS CALLED IF color.rgb == true
		this.rgbConvert = function(color) {
			var newHex = rgbToHex(color.rgb).toUpperCase();
			if(newHex != "") {
				isUpdated = true;
				color.hex = newHex;
				color.updatedColor = color.rgb;
			}
			else {
				console.log("Not a valid RGB!");
				color.updatedColor = "rgb(255, 255, 255)";
			}
		};
		
		function rgbToHex(rgbValue) {
			var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(rgbValue);
			if(digits === null) {
				return "";
			}
			else {		
				var red = zeroPad(parseInt(digits[2]).toString(16));
				var green = zeroPad(parseInt(digits[3]).toString(16));
				var blue = zeroPad(parseInt(digits[4]).toString(16));
				
				return "#" + red + green + blue;
			}
		};
		
		// ADDS ZERO PADDING FOR HEX VALUES
		// RETURNS A STRING
		function zeroPad(value) {
			return ('00' + value).slice(-2);
		}
		
		// CONVERTS HEX VALUES INTO RGB
		this.hexConvert = function(color) {
			color.hex = color.hex.toUpperCase();
			var newHex = hexToRgb(color.hex);
			color.rgb = newHex;
			color.updatedColor = color.rgb;
		};
		
		function hexToRgb(hexIn) {
			var red;
			var green;
			var blue;
			if(hexIn.charAt(0) == "#" ) {
				hexIn = hexIn.substr(1);
			}

			red = hexIn.charAt(0) + '' + hexIn.charAt(1);
			green = hexIn.charAt(2) + '' + hexIn.charAt(3);
			blue = hexIn.charAt(4) + '' + hexIn.charAt(5);

			red = parseInt(red, 16);
			green = parseInt(green, 16);
			blue = parseInt(blue, 16);

			if(isNaN(blue)) {
				return "";
			}
			else {
				return "rgb(" + red + ", " + green + ", " + blue + ")";
			}
		};
	});
})();