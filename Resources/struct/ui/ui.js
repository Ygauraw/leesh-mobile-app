//root window generated and pullled here...
//this may need to be rebuilt as it is decidedly a ui helper...
(function(){
	S.ui = {};
	
	//create a film strip like view 
	S.ui.createFilmStripView = function( _args ) {
		var root = Ti.UI.createView( S.combine( $$.stretch, _args ) ),
		views = _args.views,
		container = Ti.UI.createView({
			top:0,
			left:0,
			bottom:0,
			width:$$.platformWidth*_args.views.length
		});
			
		for( var i = 0, l = views.length; i < l; i++ ){
			var newView = Ti.UI.createView({
				top:0,
				bottom:0,
				left:$$.platformWidth*i,
				width:$$.platformWidth
			});
			newView.add(views[i]);
			container.add(newView);
		}
		root.add(container);
		
		//set the currently visible index
		root.addEventListener('changeIndex', function(e) {
			var leftValue = $$.platformWidth*e.idx*-1;
			container.animate({
				duration:$$.animationDuration,
				left:leftValue
			});
		});
		
		return root;
	};
}());

Ti.include("/struct/ui/views/styles.js");
Ti.include("/struct/ui/views/map.js");
Ti.include("/struct/ui/views/concern.js");
Ti.include("/struct/ui/views/alert.js");
Ti.include("/struct/ui/views/link.js");
Ti.include("/struct/ui/views/applicationwindow.js");