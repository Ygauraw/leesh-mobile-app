(function() {	
	//Globally available theme object to hold theme colors/constants
	S.ui.theme = {
		textColor:'#000000',
		grayTextColor:'#888888',
		headerColor:'#333333',
		lightBlue:'#006cb1',
		darkBlue:'#93caed',
		fontFamily: S.os({
			iphone:'Helvetica Neue',
			android:'Droid Sans'
		})
	};

	//All shared property sets are declared here.
	S.ui.properties = {
		//grab platform dimensions only once to save a trip over the bridge
		platformWidth: Ti.Platform.displayCaps.platformWidth,
		platformHeight: Ti.Platform.displayCaps.platformHeight,
		animationDuration: 300,
		//we use these for default components
		Button: {
			height:50,
			width:250,
			color:'#000',
			title: 'unimplemented',
			font: {
				fontSize:18,
				fontWeight:'bold'
			}
		},
		Label: {
			color:S.ui.theme.textColor,
			font: {
				fontFamily:S.ui.theme.fontFamily,
				fontSize:15
			},
			textAlign: "center",
			height:'auto'
		},
		TextField: {
			height:55,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			color:'#000000',
			clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		},
		headerView: {
			backgroundColor:'#CCC',
			height:40
		}
	};
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $$ = S.ui.properties;
