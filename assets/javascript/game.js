function setCharacterPowers () {
  $(".progress-bar").attr("aria-valuenow", "100").css("width", "100%");
  $("#character-ellie-cat").attr({"data-health-points":"140", "data-attack-power":"19", "data-counter-attack-power":"12"});
  $("#ellie-cat-hp-text").text("140");
  $("#character-fuzzy-ball").attr({"data-health-points":"100", "data-attack-power":"21", "data-counter-attack-power":"18"});
  $("#fuzzy-ball-hp-text").text("100");
  $("#character-the-leaping-fish").attr({"data-health-points":"160", "data-attack-power":"18", "data-counter-attack-power":"10"});
  $("#leaping-fish-hp-text").text("160");
  $("#character-dr-red-laser").attr({"data-health-points":"200", "data-attack-power":"11", "data-counter-attack-power":"9"});
  $("#red-laser-hp-text").text("200");
}

$(document).ready(function () {

  setCharacterPowers();






});
