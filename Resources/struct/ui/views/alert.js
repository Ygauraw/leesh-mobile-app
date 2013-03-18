(function(){
	S.ui.createAlertView = function(){
		var view = Ti.UI.createView(
			{ 
				backgroundColor: "red",
				layout: 'vertical' 
			} 
		);
		//display information regarding concern
		var alertText = Ti.UI.createLabel(
			S.combine(
				{ 
					text: "This text needs to come from controller, but needs to inform what app is doing" 
				}, //@todo get concern text from WARNING type in controller
				$$.Label
			)
		);
		//create a cancel button
		var cancelButton = Ti.UI.createButton(
			S.combine(
				{
					text: "Contact Authorities"
				},
				$$.Button
			)
		);
		//add it to the view
		view.add(
				alertText,
				cancelButton
				);
		return view;
	};
})();