// $Id$

/**
 * @file jquery_slider.js
 * Transform the two textfields output by the Form API via the jquery
 * slider module into a fully fledged slider.
 */

Drupal.behaviors.jQuerySlider = function () {
  var id_matcher = new RegExp("jquery-slider-(\\d+)");
  $(".jquery-slider:not(.has-slider):visible").each(function (i) {
    var slider_id = id_matcher.exec($(this).attr('id'))[1];
    var from_field = $(this).find("input.from-value");
    var to_field = $(this).find("input.to-value");

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
        } else if (ui.handle.hasClass('to')) {
          to_field.val(ui.value);
        }
      },
      animate: true
    });

    $(this).children(".form-item").hide();
    $(this).addClass("has-slider");
  });
}

