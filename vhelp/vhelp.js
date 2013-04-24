/* Help overlay. Requires jquery.
*/

var $_vhelp = null;
var $_vhelp_ary;
var $_vhelp_btn_exit;

var vhelp_is_showing_out = false;
var vhelp_is_showing_in  = false;
var vhelp_is_showing_sgl = false;
var vhelp_is_showing_mlt = false;
var vhelp_is_showing_pwr = false;
var vhelp_is_showing_dflt = false;
var vhelp_is_showing_chn = false;
function vhelp_is_showing_subpup() { return (vhelp_is_showing_out || vhelp_is_showing_in || vhelp_is_showing_sgl || vhelp_is_showing_mlt || vhelp_is_showing_pwr || vhelp_is_showing_dflt || vhelp_is_showing_chn); }

var $_vhelp_subup;
var $_vhelp_subup_title;
var $_vhelp_subup_info;


function vhelp_effect_set( $o, new_class )
{
	if( $o )
	{
		$o.removeClass( "vhelp-effect-none vhelp-effect-click vhelp-effect-hover" );
		if( new_class )
			$o.addClass( new_class );
	}
}

function vhelp_menter( $o )
{
	vdest_css_cursor_pointer( $o );
	vhelp_effect_set( $o.find(".vhelp-info-item"), "vhelp-effect-hover" ); // Cant get the effect to work on the $o div, so apply it only to the text
}
function vhelp_mleave( $o )
{
	vdest_css_cursor_default( $o );
	vhelp_effect_set( $o.find(".vhelp-info-item"), null );
}
function vhelp_mdown( $o )
{
	vhelp_effect_set( $o.find(".vhelp-info-item"), "vhelp-effect-click" );
	$o.css( "opacity", 0.3 );
}
function vhelp_mup( $o )
{
	vhelp_effect_set( $o.find(".vhelp-info-item"), "vhelp-effect-hover" );
	$o.css( "opacity", 1.0 );
}

// Generate the html for numpad
function vhelp_create( fn_exit )
{
	$(document.body).append( '\
		<div id="vhelp-cntnr-mn" class="vhelp-cntnr vhelp-bkg">\
			<img id="vhelp-btn-x"  src="vhelp/img/vhelp-btn-x.png">\
			<div class="vhelp-title vhelp-bkg"><i><span style="font-size:larger;">A</span>bout the <span style="font-size:larger;">D</span>isplay <span style="font-size:larger;">C</span>ontrol...</i></div>\
			<div class="vhelp-info-cntnr">\
				<img class="info-icon newln" src="vhelp/img/vhelp-info-lg.png">\
				<div class="vhelp-info-intro">\
					This tool provides a user the ability to control the inputs being displayed on the outputs in the Ops Suite 1.<br/>\
					Click on any of the following for more information\
				</div>\
				<div id="h-cap-about-out" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">About Outputs,</span>\
				</div>\
				<div id="h-cap-about-in" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">About Inputs,</span>\
				</div>\
				<div id="h-cap-input-single" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">Change the Input Source for a single display,</span>\
				</div>\
				<div id="h-cap-input-multi" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">Change the Input Source for multiple displays at once,</span>\
				</div>\
				<div id="h-cap-power" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">Turn a display on or off,</span>\
				</div>\
				<div id="h-cap-default" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">Reset to the default configuration,</span>\
				</div>\
				<div id="h-cap-tvchan" class="newln indent">\
					<img src="vhelp/img/vhelp-bullet.png">\
					<span class="vhelp-info-item vhelp-cap-bkg">Change the cable-TV channel.</span>\
				</div>\
			</div>\
		</div>\
		<div id="vhelp-cntnr-subup" class="vhelp-cntnr vhelp-bkg">\
			<img id="vhelp-subup-x"  src="vhelp/img/vhelp-btn-x.png">\
			<div class="vhelp-title vhelp-bkg"></div>\
			<div class="vhelp-info-cntnr">\
				<img class="info-icon newln" src="vhelp/img/vhelp-info.png">\
				<div class="vhelp-info-intro">\
				</div>\
				<div id="vhelp-subup-back" class="newln indent">\
					<img class="back-icon" src="vhelp/img/vhelp-back.png">\
					<i>Go Back</i>\
				</div>\
			</div>\
		</div>'	);

	$_vhelp = $( "#vhelp-cntnr-mn" );

	$_vhelp_ary = new Array ( $( "#h-cap-about-out" ), $( "#h-cap-about-in" ), $( "#h-cap-input-single" ), $( "#h-cap-input-multi" ), $( "#h-cap-power" ), $( "#h-cap-default" ), $( "#h-cap-tvchan" ) );

	for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
	{
		$_vhelp_ary[bx].mousedown( function()
		{
			vhelp_mdown( $(this) );
			return false;
		} ).mouseup( function()
		{
			vhelp_mup( $(this) );
			return false;
		} );
	}//for bx

	$_vhelp_ary[0].click( function()              // ABOUT OUTPUTS
	{
		vhelp_subup_create_out( function()//exit 'out'
		{
			vhelp_is_showing_out = false;
			for( var dx = 0; dx < $_vdestinations.length; dx++ )
				$_vdestinations[dx].removeClass( "vhelp-vdest-effect-bigger" );
			_vhelp_show();
		} );
		
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );

		vhelp_is_showing_out = true;
		_vhelp_hide();
		vhelp_subup_show();
		for( var dx = 0; dx < $_vdestinations.length; dx++ )
			$_vdestinations[dx].addClass( "vhelp-vdest-effect-bigger" );
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_out )
		{
			vhelp_menter( $(this) );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_out )
		{
			vhelp_mleave( $(this) );
		}
		return false;
	} );

	$_vhelp_ary[1].click( function()              // ABOUT INPUTS
	{
		vhelp_subup_create_in( function()//exit 'in'
		{
			vhelp_is_showing_in = false;
			_vhelp_show();
		} );
		
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );
		
		vhelp_is_showing_in = true;
		_vhelp_hide();
		vhelp_subup_show();
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_pwr )
		{
			vhelp_menter( $(this) );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_pwr )
		{
			vhelp_mleave( $(this) );
		}
		return false;
	} );

	$_vhelp_ary[2].click( function()              // OUTPUT SINGLE SELECT
	{
		vhelp_subup_create_sgl( function()//exit sgl
		{
			vhelp_is_showing_sgl = false;
			_vhelp_show();
			$_vdestinations[3].removeClass( "vhelp-vdest-effect-bigger" );
		} );
		
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );
		
		vhelp_is_showing_sgl = true;
		_vhelp_hide();
		vhelp_subup_show();
		for( var dx = 0; dx < $_vdestinations.length-2; dx++ )
			$_vdestinations[dx].removeClass( "vhelp-vdest-effect-bigger" );
		$_vdestinations[3].addClass( "vhelp-vdest-effect-bigger" );
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_sgl )
		{
			vhelp_menter( $(this) );
			for( var dx = 0; dx < $_vdestinations.length; dx++ )
				$_vdestinations[dx].addClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_sgl )
		{
			vhelp_mleave( $(this) );
			for( var dx = 0; dx < $_vdestinations.length; dx++ )
				$_vdestinations[dx].removeClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} );

	$_vhelp_ary[3].click( function()              // CHECKBOX MULTI SELECT
	{
		vhelp_subup_create_mlt( function()//exit mlt
		{
			vhelp_is_showing_mlt = false;
			_vhelp_show();
			vdest_cbox_uncheck( $_vdestinations[0], null );
			vdest_cbox_uncheck( $_vdestinations[2], null );
			vdest_cbox_uncheck( $_vdestinations[4], null );
			$_vdest_btn_selected.removeClass( "vhelp-vdest-effect-bigger" );
			vdest_btn_selected_hide();
		} );
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );
		vhelp_is_showing_mlt = true;
		_vhelp_hide();
		vhelp_subup_show();
		for( var dx = 0; dx < $_vdestinations.length; dx++ )
			$_vdestinations[dx].find( ".vdest-tvbtn-cbox" ).attr( "src", "img/cbox_clr.png" );
		vdest_cbox_check( $_vdestinations[0], null );
		vdest_cbox_check( $_vdestinations[2], null );
		vdest_cbox_check( $_vdestinations[4], null );
		vdest_btn_selected_show();
		$_vdest_btn_selected.addClass( "vhelp-vdest-effect-bigger" );
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_mlt )
		{
			vhelp_menter( $(this) );
			for( var dx = 0; dx < $_vdestinations.length; dx++ )
				$_vdestinations[dx].find( ".vdest-tvbtn-cbox" ).attr( "src", "img/cbox_chk.png" );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_mlt )
		{
			vhelp_mleave( $(this) );
			for( var dx = 0; dx < $_vdestinations.length; dx++ )
				$_vdestinations[dx].find( ".vdest-tvbtn-cbox" ).attr( "src", "img/cbox_clr.png" );
		}
		return false;
	} );

	$_vhelp_ary[4].click( function()              // POWER TOGGLE
	{
		vhelp_subup_create_pwr( function()//exit pwr
		{
			vhelp_is_showing_pwr = false;
			_vhelp_show();
			$_vdestinations[5].find( ".vdest-tvbtn-power" ).removeClass( "vhelp-vdest-effect-bigger" );
		} );
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );
		vhelp_is_showing_pwr = true;
		_vhelp_hide();
		vhelp_subup_show();
		for( var dx = 0; dx < $_vdestinations.length-2; dx++ )
			$_vdestinations[dx].find( ".vdest-tvbtn-power" ).removeClass( "vhelp-vdest-effect-bigger" );
		$_vdestinations[5].find( ".vdest-tvbtn-power" ).addClass( "vhelp-vdest-effect-bigger" );
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_pwr )
		{
			vhelp_menter( $(this) );
			for( var dx = 0; dx < $_vdestinations.length-2; dx++ )
				$_vdestinations[dx].find( ".vdest-tvbtn-power" ).addClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_pwr )
		{
			vhelp_mleave( $(this) );
			for( var dx = 0; dx < $_vdestinations.length-2; dx++ )
				$_vdestinations[dx].find( ".vdest-tvbtn-power" ).removeClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} );

	$_vhelp_ary[5].click( function()              // DEFAULT SETUP
	{
		vhelp_subup_create_dflt( function()//exit dflt
		{
			vhelp_is_showing_dflt = false;
			_vhelp_show();
			$( ".vdest-btn-default" ).removeClass( "vhelp-vdest-effect-bigger" );
		} );
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );
		vhelp_is_showing_dflt = true;
		_vhelp_hide();
		vhelp_subup_show();
		$( ".vdest-btn-default" ).addClass( "vhelp-vdest-effect-bigger" );
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_dflt )
		{
			vhelp_menter( $(this) );
			$( ".vdest-btn-default" ).addClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_dflt )
		{
			vhelp_mleave( $(this) );
			$( ".vdest-btn-default" ).removeClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} );

	$_vhelp_ary[6].click( function()              // CHANGE CHANNEL
	{
		vhelp_subup_create_chn( function()//exit chn
		{
			vhelp_is_showing_chn = false;
			_vhelp_show();
			$( ".vdest-btn-numpad" ).removeClass( "vhelp-vdest-effect-bigger" );
		} );
		for( var bx = 0; bx < $_vhelp_ary.length; bx++ )
			vhelp_mleave( $_vhelp_ary[bx] );
		vhelp_is_showing_chn = true;
		_vhelp_hide();
		vhelp_subup_show();
		$( ".vdest-btn-numpad" ).addClass( "vhelp-vdest-effect-bigger" );
		return false;
	} ).mouseenter( function()
	{
		if( !vhelp_is_showing_chn )
		{
			vhelp_menter( $(this) );
			$( ".vdest-btn-numpad" ).addClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} ).mouseleave( function()
	{
		if( !vhelp_is_showing_chn )
		{
			vhelp_mleave( $(this) );
			$( ".vdest-btn-numpad" ).removeClass( "vhelp-vdest-effect-bigger" );
		}
		return false;
	} );

	$_vhelp_btn_exit = $( "#vhelp-btn-x" ).click( function()   // EXIT
	{
			// clear off any residual effects
		for( var dx = 0; dx < $_vdestinations.length; dx++ )
		{
			$_vdestinations[dx].removeClass( "vhelp-vdest-effect-bigger" );
			$_vdestinations[dx].find( ".vdest-tvbtn-cbox" ).attr( "src", "img/cbox_clr.png" );
			$_vdestinations[dx].find( ".vdest-tvbtn-power" ).removeClass( "vhelp-vdest-effect-bigger" );
		}
		$( ".vdest-btn-default" ).removeClass( "vhelp-vdest-effect-bigger" );
		$( ".vdest-btn-numpad" ).removeClass( "vhelp-vdest-effect-bigger" );

		_vhelp_hide( os1_is_small_device() ? 0 : 300 );
		fn_exit();
		return false;
	} ).mouseenter( function()
	{
		$(this).css( "cursor", "pointer" );
		return false;
	} ).mouseleave( function()
	{
		vdest_css_cursor_default( $(this) );
		return false;
	} ).mousedown( function()
	{
		vhelp_mdown( $(this) );
		return false;
	} ).mouseup( function()
	{
		vhelp_mup( $(this) );
		vhelp_effect_set( $(this), null );
		return false;
	} );


													/*******************  SUBUP's ***/

	$_vhelp_subup = $( "#vhelp-cntnr-subup" );
	$_vhelp_subup_title = $_vhelp_subup.find( ".vhelp-title" );
	$_vhelp_subup_info = $_vhelp_subup.find( ".vhelp-info-intro" );

	$( "#vhelp-subup-x, #vhelp-subup-back" )
	 .click(      function() { vhelp_subup_hide(); vhelp_subup_fn_exit(); return false; } )
	 .mouseenter( function() { $(this).css( "cursor", "pointer" ); return false; } )
	 .mouseleave( function() { vdest_css_cursor_default( $(this) ); return false; } )
	 .mousedown(  function() { vhelp_mdown( $(this) ); return false; } )
	 .mouseup(    function() { vhelp_mup( $(this) ); vhelp_effect_set( $(this), null ); return false; } );

}// _create()


function vhelp_mouseclick_emul( $o )
{
	$o.mousedown().click();
	setTimeout( function()
	{
		$o.mouseup();
		vhelp_effect_set( $o, null );
	}, 40 );
}

function vhelp_keyup( evt )
{
	if( evt.keyCode === 27/*escape*/ )
	{
		if( $_vhelp.is(":visible") )
			vhelp_mouseclick_emul( $_vhelp_btn_exit );
		else if( vhelp_is_showing_subpup() )
			vhelp_mouseclick_emul( $("#vhelp-subup-x") );
	}
}//_keyup()


var font_size;
var font_size_title;

function $_vhelp_size_and_offset_set( $o, height, proportions, offset )
{
	if( $o )
	{
		$o.height( height );
		$o.width( height * proportions ); // ratio of the dimensions of the img
		$o.css( "font-size", font_size );
		$o.find( ".vhelp-title" ).css( "font-size", font_size_title );
		$o.css( { top:offset.top, left:offset.left } );
	}
}

var hlp_posn      = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_out  = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_in   = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_sgl  = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_mlt  = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_pwr  = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_dflt = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_posn_chn  = { hide:{ top:0, left:0 }, show:{ top:0, left:0 } };
var hlp_size_out  = { height:100, props:1.4 };
var hlp_size_in   = { height:100, props:1.4 };
var hlp_size_sgl  = { height:100, props:1.4 };
var hlp_size_mlt  = { height:100, props:1.4 };
var hlp_size_pwr  = { height:100, props:1.4 };
var hlp_size_dflt = { height:100, props:1.4 };
var hlp_size_chn  = { height:100, props:1.4 };


function vhelp_size_and_offset_set( height, l_top, l_left )
{
	font_size = height * 0.0480;
	font_size_title = height * 0.062;
	var hlp_props_default = 876 / 512; // Dimensions of the background image
	$( "#vhelp-subup-x" ).width( height * 0.065 ).height( height * 0.065 );


	hlp_posn.show = { top:l_top, left:l_left };
	$_vhelp_size_and_offset_set( $_vhelp, height, hlp_props_default, hlp_posn.show );

	var hlp_width_max = $_vhelp.width();

	hlp_posn_out.show  = hlp_posn_out.hide = { top:l_top + (height * 0.20), left:l_left + (hlp_width_max * 0.42) };
	hlp_size_out.height = height * 0.63;
	hlp_size_out.props = hlp_props_default * 0.9;

	hlp_posn_in.show   = hlp_posn_in.hide = { top:l_top + (height * 0.25), left:l_left + (hlp_width_max * 0.10) };
	hlp_size_in.height = height * 0.75;
	hlp_size_in.props = hlp_props_default;

	hlp_posn_sgl.show  = hlp_posn_sgl.hide = { top:l_top + (height * 0.25), left:l_left * 0.80 };
	hlp_size_sgl.height = height * 0.75;
	hlp_size_sgl.props = hlp_props_default;

	hlp_posn_mlt.show  = hlp_posn_mlt.hide = { top:l_top + (height * 0.035), left:l_left * 0.20 };
	hlp_size_mlt.height = height * 0.85;
	hlp_size_mlt.props = hlp_props_default;

	hlp_posn_pwr.show  = hlp_posn_pwr.hide = { top:l_top + (height * 0.28), left:l_left + (hlp_width_max * 0.07) };
	hlp_size_pwr.height = height * 0.5;
	hlp_size_pwr.props = hlp_props_default;

	hlp_posn_dflt.show = hlp_posn_dflt.hide = { top:l_top + (height * 0.02), left:l_left * 0.85 };
	hlp_size_dflt.height = height * 0.57;
	hlp_size_dflt.props = hlp_props_default;

	hlp_posn_chn.show  = hlp_posn_chn.hide = { top:l_top + (height * 0.11), left:l_left * 1.0 };
	hlp_size_chn.height = height * 0.5;
	hlp_size_chn.props = hlp_props_default;

	if( vhelp_is_showing_subpup() )
		vhelp_subup_size_and_offset_set();
}

function _vhelp_show() // internal
{
	os1_popup_show( $_vhelp, 400, hlp_posn.hide, hlp_posn.show );
}

function vhelp_show( offset ) // external
{
	hlp_posn.hide = offset;
	os1_popup_show( $_vhelp, 400, hlp_posn.hide, hlp_posn.show );
}

function _vhelp_hide()
{
	os1_popup_hide( $_vhelp, 400, hlp_posn.hide );
}


										/**************************** SUB-POPUPs
                                         ****************************/

var vhelp_subup_fn_exit;
var vhelp_subup_posn;
var vhelp_subup_size;

function vhelp_subup_size_and_offset_set()
{
	if( vhelp_is_showing_out )
	{
		vhelp_subup_posn = hlp_posn_out;
		vhelp_subup_size = hlp_size_out;
	} else if( vhelp_is_showing_in )
	{
		vhelp_subup_posn = hlp_posn_in;
		vhelp_subup_size = hlp_size_in;
	} else if( vhelp_is_showing_sgl )
	{
		vhelp_subup_posn = hlp_posn_sgl;
		vhelp_subup_size = hlp_size_sgl;
	} else if( vhelp_is_showing_mlt )
	{
		vhelp_subup_posn = hlp_posn_mlt;
		vhelp_subup_size = hlp_size_mlt;
	} else if( vhelp_is_showing_pwr )
	{
		vhelp_subup_posn = hlp_posn_pwr;
		vhelp_subup_size = hlp_size_pwr;
	} else if( vhelp_is_showing_dflt )
	{
		vhelp_subup_posn = hlp_posn_dflt;
		vhelp_subup_size = hlp_size_dflt;
	} else if( vhelp_is_showing_chn )
	{
		vhelp_subup_posn = hlp_posn_chn;
		vhelp_subup_size = hlp_size_chn;
	}

	$_vhelp_size_and_offset_set( $_vhelp_subup, vhelp_subup_size.height, vhelp_subup_size.props, vhelp_subup_posn.show );
}

//function vhelp_subup_show() { os1_popup_show( $_vhelp_subup, 400, vhelp_subup_posn.hide, vhelp_subup_posn.show ); }
function vhelp_subup_hide() { os1_popup_hide( $_vhelp_subup, 400, vhelp_subup_posn.hide ); }

function vhelp_subup_show()
{
	vhelp_subup_size_and_offset_set();
	os1_popup_show( $_vhelp_subup, 400, vhelp_subup_posn.hide, vhelp_subup_posn.show );
}

										/**************************** ABOUT OUTPUTS POPUP */

function vhelp_subup_create_out( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">A</span>bout <span style="font-size:larger;">O</span>utputs</i>' );
	$_vhelp_subup_info.html(
		'Highlighted here are the six Displays in Ops Suite 1. Also highlighted are the two Outputs that will direct an input source back to the Main MCC video switch.' );
}

										/**************************** ABOUT INPUTS POPUP */

function vhelp_subup_create_in( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">A</span>bout <span style="font-size:larger;">I</span>nputs</i>' );
	$_vhelp_subup_info.html(
		'Once an Output has been selected, the Input Source Panel <img class="vsrc-icon" src="vhelp/img/vsrc.jpg"> will pop up listing the eight Inputs from which the user \
		can select to display on the selected Output.' );
}

										/**************************** SINGLE SELECTED POPUP */

function vhelp_subup_create_sgl( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">S</span>ingle <span style="font-size:larger;">O</span>utput <span style="font-size:larger;">S</span>election </i>' );
	$_vhelp_subup_info.html(
		'When a single Output has been selected, the Input Source Panel <img class="vsrc-icon" src="vhelp/img/vsrc.jpg"> is used to connect \
		an Input source to the Output. Power and volume for the Output can be controlled using the buttons on the right.' );
}

										/**************************** MULTIPLE SELECTED POPUP */

function vhelp_subup_create_mlt( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">M</span>ultiple <span style="font-size:larger;">O</span>utput <span style="font-size:larger;">S</span>election </i>' );
	$_vhelp_subup_info.html(
		'<img class="vhelp-arrow" src="vhelp/img/vhelp-arrow-20.png">\
		Clicking on the checkbox in the upper right-hand corner of the Output device allows the user to control more than one Output. \
		Click on "Process Selected Devices" to get the Input Source Panel so that an Input source can be connected <img class="vsrc-icon-mlt" src="vhelp/img/vsrc-mlt.jpg"> \
		to each Output device. The power and volume buttons will perform their respective functions on \
		each Output device.' );
}

										/**************************** POWER TOGGLE */

function vhelp_subup_create_pwr( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">P</span>ower <span style="font-size:larger;">D</span>isplay</i>' );
	$_vhelp_subup_info.html(
		'Click on the power button in the lower right-hand corner of the Display to turn it on or off.\
		<img class="vhelp-arrow-pwr newln" src="vhelp/img/vhelp-ltarrow.png">' );
}

										/**************************** DEFAULT CONFIG */

function vhelp_subup_create_dflt( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">R</span>eset <span style="font-size:larger;">C</span>onfiguration</i>' );
	$_vhelp_subup_info.html(
		'Click on the "Default Configuration" button to reset all the Displays to have their default Inputs.\
		<img class="vhelp-arrow-dflt newln" src="vhelp/img/vhelp-rtarrow.png">' );
}

										/**************************** CHANNEL */

function vhelp_subup_create_chn( fn_exit )
{
	vhelp_subup_fn_exit = fn_exit;
	$_vhelp_subup_title.html( '<i><span style="font-size:larger;">C</span>hange <span style="font-size:larger;">C</span>hannel</i>' );
	$_vhelp_subup_info.html(
		'Click on the "Change TV Channel" button to change the channel on the Cable TV Input source.\
		<img class="vhelp-arrow-chn newln" src="vhelp/img/vhelp-rtarrow.png">' );
}
