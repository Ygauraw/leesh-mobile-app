(function(){
	S.ui.createLinkView = function(){
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
					text: "linking phones unimplemented at this time" 
				}, //@todo get concern text from WARNING type in controller
				$$.Label
			)
		);
		//create a cancel button
		var backButton = Ti.UI.createButton(
			S.combine(
				{
					title: "Back to main window."
				},
				$$.Button
			)
		);
		//add it to the view
		view.add(
				alertText,
				backButton
				);
		return view;
	};
})();