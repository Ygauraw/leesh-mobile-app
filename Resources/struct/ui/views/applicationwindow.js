//main application window
(function() {
	var platformWidth = Ti.Platform.displayCaps.platformWidth;
	
	//create the main application window
	S.ui.createApplicationWindow = function( _args ) {
		var win = Ti.UI.createWindow(S.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		})),
		headerView = Ti.UI.createView(
			S.combine(
				$$.headerView,
				{
					top: 0
				}
			)
		),
		tabHeight = 60,
		tabWidth = platformWidth / 4,//@todo magic ui 3... correct this to actual tabs placed
		tabView = Ti.UI.createView(
				{
					bottom: 0,
					height: tabHeight,
					backgroundColor: "#ccc",
					width: platformWidth
				}
			),
			tabs = [];
			headerView.add(
				Ti.UI.createLabel(
					S.combine(
						{
							text:"Structure test"
						},
						$$.Label
					)
				)
			);
		
		//Add the main app 'filmstrip'	
		var appFilmStrip = S.ui.createFilmStripView(
			{
				top: 40,
				left: 0,
				right: 0,
				bottom: tabHeight - 10, //@todo tabheight adjusted here
				views: [
					S.ui.createAlertView(),
					S.ui.createConcernView(),
					S.ui.createLinkView(),
					S.ui.createMapView()
				]
			}
		);
		
		//create the 'tab' view, which we will animate back and forth along the tab bar
		var tab = Ti.UI.createView(
			{
				left:0,
				top:15,
				height:45,
				width:tabWidth,
				bottom:0
			}
		);
		
		tab.add(Ti.UI.createView({
			right:10,
			left:10,
			backgroundColor:S.ui.theme.darkBlue
		}));
		
		tabView.add(tab);
		
		//create clickable tab images
		function createTab(word,_cb,_on) {
			var view = Ti.UI.createView({width:tabWidth}),
			    label = Ti.UI.createLabel({text:word,textAlign:"center"}),
				dimension = 40;
			
			view.on = _on||false; //ivar for 'on' state
			
			//assemble view
			view.add(label);
			view.addEventListener('click',_cb);
			
			//'instance' method
			view.toggle = function() {
				view.on = !view.on;
				//label.text = label.text[view.on ? "toUpperCase" : "toLowerCase"]();
			};
			
			return view;
		}
		
		//toggle view state of application to the relevant tab
		function selectIndex( _idx ){
			for( var i = 0, l = tabs.length; i < l; i++ ){
				//select the tab and move the tab 'cursor'
				if ( _idx === i ){
					//if the tab is already selected, do nothing
					if ( !tabs[ i ].on ) {
						//animate the tab
						tab.animate({
							duration:$$.animationDuration,
							left:tabWidth*i,
							bottom:0
						},function(idx) { //use closure to retain value of i in idx
							return function() {
								if (!tabs[idx].on) {
									tabs[idx].toggle();
								}
							};
						}( i ));
						
						//set the current film strip index
						appFilmStrip.fireEvent('changeIndex',{idx:i});
					}
				}
				else if (tabs[i].on && (_idx !== i)) {
					tabs[i].toggle();
				}
			}
		}
		
		//assemble main app tabs
		// HACK: need to use anonymous functions to wrap selectIndex as a view event handler
		tabs.push(
				createTab( 
					'alert', 
					function() {
						selectIndex( 0 );
					},
					true 
				)
		);
		tabs.push(
				createTab( 
					'concern', 
					function() {
						selectIndex(1);
					}
				)
		);
		tabs.push(
			createTab(
				'link', 
				function() {
					selectIndex(2);
				}
			)
		);
		
		tabs.push(
			createTab(
				'map', 
				function() {
					selectIndex(3);
				}
			)
		);
		
		//add tabs to layout
		for( var i = 0, l = tabs.length; i < l; i++ ){
			tabs[ i ].left = tabWidth * i;
			tabView.add( tabs[ i ] );
		}
		
		//App app-level event listener to change tabs
		Ti.App.addEventListener(
			'app:change.tab',
			function( e ){
				selectIndex(e.tabIndex);
			}
		);
		
		// add msg view
		var msgview = Ti.UI.createView(
			{
				opacity: 0,
				zIndex: 10,
				width:platformWidth - 100,
				left: 50,
				top: 230,
				height: 100
			}
			);
			
		var msglabel = Ti.UI.createLabel( $$.Label );
			
		msgview.add( msglabel );
		
		Ti.App.addEventListener(
			"app:msg",
			function( e ){
				Ti.API.log( e );
				msglabel.text = e.msg;
				msgview.backgroundColor = e.error ? "red" : "white";
				msgview.opacity = 1;
				msgview.animate(
					{
						opacity: 0,
						duration: 1500
					}
				);
			}
		);
		
		win.add( msgview );
		
		//assemble main app window
		win.add( tabView );
		win.add( appFilmStrip );
		win.add( headerView );

		return win;
	};
})();