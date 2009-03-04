// $Id$

/**
 * @file jquery_slider.js
 * Transform the two textfields output by the Form API via the jquery
 * slider module into a fully fledged slider.
 */
function livetown_format_value(ui) {
	number = ui.value
	if (number > 1000000) {
		mill = parseInt(ui.value/1000000);
		kilo = parseInt((ui.value - mill*1000000)/1000);
		if (kilo < 10) {
			kilo = '0' + kilo;
		}
		else if (kilo > 99) {
			kilo = parseInt(kilo/10)
		}
		value = mill + ',' + kilo + ' mio.'
	}
	else if (number > 1000) {
		kilo = parseInt(ui.value/1000);
		ones = parseInt(ui.value - kilo*1000);
		if (ones < 10) {
			ones = '00' + ones;
		}
		else if (ones < 100) {
			ones = '0' + ones
		}
		value = kilo + '.' + ones
	}
	else {
		value = number
	}
	if (ui['handle'].attr('id') == 'ui-from-slider-handle-3' || ui['handle'].attr('id') == 'ui-to-slider-handle-3') {
		if (number == Drupal.settings.jQuerySlider[3].minimum_value && $("#edit-to-3").val() == Drupal.settings.jQuerySlider[3].maximum_value) {
			$("#livetown-slider-suffix-3").text(' dag');
		}
		else if (number == Drupal.settings.jQuerySlider[3].maximum_value && $("#edit-from-3").val() == Drupal.settings.jQuerySlider[3].minimum_value) {
			$("#livetown-slider-suffix-3").text(' dag');
		}
		else {
			$("#livetown-slider-suffix-3").text(' dage');
		}
	}
	return value
}

function livetown_initial_value_suffix(i) {
	if (i == 0) {
		return ' kr.'
	}
	else if (i == 1) {
		return ''
	}
	else if (i == 2) {
		return 'm²'
	}
	else {
		return ' dag'
	}
}


Drupal.behaviors.jQuerySlider = function () {
  var id_matcher = new RegExp("jquery-slider-(\\d+)");
  $(".jquery-slider:not(.has-slider):visible").each(function (i) {
		var slider_id = id_matcher.exec($(this).attr('id'))[1];
    var from_field = $(this).find("input.from-value");
    var to_field = $(this).find("input.to-value");
		if ($(this).hasClass('processed') == false) {
			$(this).addClass('processed');
			$(this).append('<div class="label">Fra <span class="from-slider-span">' + Drupal.settings.jQuerySlider[slider_id].minimum_value + '</span><span class="optional-to-slider"> til <span class="to-slider-span">' + Drupal.settings.jQuerySlider[slider_id].maximum_value + '</span></span><span id="livetown-slider-suffix-' + i + '">' + livetown_initial_value_suffix(i) +'</span></div>');
		}
		var from_span = $(this).find(".from-slider-span");
		var to_span = $(this).find(".to-slider-span");
		var optional_span = $(this).find(".optional-to-slider");
		optional_span.hide()
    $(this).children(".slider").slider({
      range: true,
      min: Drupal.settings.jQuerySlider[slider_id].minimum_value,
      max: Drupal.settings.jQuerySlider[slider_id].maximum_value,
      handles: [{start: Drupal.settings.jQuerySlider[slider_id].minimum_value},
                {start: Drupal.settings.jQuerySlider[slider_id].maximum_value}],
      stepping: Drupal.settings.jQuerySlider[slider_id].slide_step,
      values: [from_field.val(), to_field.val()],
			slide: function (e, ui) {
        if (ui['handle'].hasClass('from')) {
          from_field.val(ui.value);
					from_span.text(livetown_format_value(ui));
        }
				else if (ui.handle.hasClass('to')) {
          to_field.val(ui.value);
					to_span.text(livetown_format_value(ui));
					if (ui.value == Drupal.settings.jQuerySlider[slider_id].maximum_value) {
						optional_span.hide();
					}
					else {
						optional_span.show();
					}
        }
      },
      animate: true
    });

    $(this).children(".form-item").hide();
    $(this).addClass("has-slider");
  });
}

