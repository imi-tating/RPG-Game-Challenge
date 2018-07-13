var mainCharacterActive = false;
var mainFrenemieActive = false;
var mainCharacterHP
var mainCharacterAP
var mainFrenemieHP
var mainFrenemieCAP

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

function attackSequence () {
  mainFrenemieHP -= mainCharacterAP;
  mainCharacterAP += mainCharacterAP;
  mainCharacterHP -= $
}

$(document).ready(function () {
  setCharacterPowers();

  $(".character").on("click", function(){
    if (mainCharacterActive == false) {
      $("#main-character").empty();
      $(this).detach().appendTo($("#main-character")).removeClass("float-left").addClass("float-right");
      mainCharacterActive = true;
      mainCharacterHP = parseInt($(this).attr("data-health-points"));
      mainCharacterAP = parseInt($(this).attr("data-attack-power"));
      mainFrenemieCAP = parseInt($(this).attr("data-counter-attack-power"));
      $("#available-friends-title").text("Available Frenemies");
      $("#available-characters-container").find(".character").removeClass("text-white").addClass("text-danger");
    } else if (mainFrenemieActive == false) {
      $("#current-frenemie").empty();
      $(this).detach().appendTo($("#current-frenemie"));
      mainFrenemieActive = true;
      mainFrenemieHP = parseInt($(this).attr("data-health-points"));
    }
  });

  //Activate the Button
  $("#attack-button").on("click", function(){
    if (mainCharacterActive == true && mainFrenemieActive == true) {

    }
  });









});
