(function(){
	S.ui.createConcernView = function(){
		var view = Ti.UI.createView( 
			{ 
				backgroundColor: "orange",
				layout: 'vertical' 
			} 
		);
		//display information regarding concern
		var concernText = Ti.UI.createLabel(
			S.combine(
				{ 
					text: "This text needs to come from controller... What concern?" 
				}, //@todo get concern text from WARNING type in controller
				$$.Label
			)
		);
		//create a contact authorities button
		var contactAuthorities = Ti.UI.createButton(
			S.combine(
				{
					title: "Contact Authorities"
				},
				$$.Button
			)
		);
		//create a cancel button
		var cancelButton = Ti.UI.createButton(
			S.combine(
				{
					title: "Contact Authorities"
				},
				$$.Button
			)
		);
		//add it to the view
		view.add(
				concernText,
				contactAuthorities,
				cancelButton
				);
		return view;
	};
})();