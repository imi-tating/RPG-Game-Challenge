var mainCharacterActive = false;
var mainFrenemieActive = false;
var mainCharacterHP
var mainCharacterAP
var mainFrenemieHP
var mainFrenemieCAP
var mainCharacter
var currentFrenemie
var characterCounter = 3;
var defeatedCharacters = []
var wins = 0;
var losses = 0;

function setCharacterPowers() {
  $(".progress-bar").attr("aria-valuenow", "100").css("width", "100%");
  $("#character-ellie-cat").attr({"data-health-points":"140", "data-attack-power":"7", "data-counter-attack-power":"18"});
  $("#ellie-cat-hp-text").text("140");
  $("#character-fuzzy-ball").attr({"data-health-points":"100", "data-attack-power":"8", "data-counter-attack-power":"24"});
  $("#fuzzy-ball-hp-text").text("100");
  $("#character-the-leaping-fish").attr({"data-health-points":"160", "data-attack-power":"6", "data-counter-attack-power":"16"});
  $("#leaping-fish-hp-text").text("160");
  $("#character-dr-red-laser").attr({"data-health-points":"200", "data-attack-power":"4", "data-counter-attack-power":"15"});
  $("#red-laser-hp-text").text("200");
}

function createCharacter(element) {
  return {
    name : $(element).find(".card-header").text(),
    originalPower : $(element).attr("data-health-points")
  }
}

function attackSequence() {
  mainFrenemieHP -= mainCharacterAP;
  mainCharacterHP -= mainFrenemieCAP;
  updateProgressBar ("#main-character", mainCharacter.originalPower, mainCharacterHP);
  $("#attack-updates").prepend("<hr><p> You attacked " + currentFrenemie.name + " for " + mainCharacterAP + " damage.</p>" + "<p class='text-muted'>" + currentFrenemie.name + " attacked you for " + mainFrenemieCAP + " damage.</p>");
  updateProgressBar ("#current-frenemie", currentFrenemie.originalPower, mainFrenemieHP);
  mainCharacterAP += mainCharacterAP;

  if (mainFrenemieHP <= 0) {
    var defeated = $("#current-frenemie").find(".character").removeClass("text-danger").addClass("text-white").detach()
    defeatedCharacters.push(defeated);

    $("#current-frenemie").empty().text("You have defeated " + currentFrenemie.name + ".");
    mainFrenemieActive = false;
    characterCounter--;
    $("#attack-updates").prepend("<hr><p><strong>You have defeated " + currentFrenemie.name + ".</strong></p>");

    if (mainCharacterHP <= 0) {
      losses++;
      $(".btn").removeClass("btn-danger").addClass("btn-warning").text("Play Again");
      $("#attack-updates").prepend("<hr><p><strong>" + currentFrenemie.name + " has defeated you.</strong></p>");
      $("#attack-updates").prepend("<hr><p class='alert-danger'><strong>You have lost " + losses + " times and won " + wins + " times.</strong></p>");
      var losser = $("#main-character").find(".character").removeClass("float-right").addClass("float-left").detach()
      defeatedCharacters.push(losser);
      $("#main-character").text(currentFrenemie.name + " has defeated you.");
      $(".btn-warning").on("click", resetGame);
    } else {
      if(characterCounter == 0) {
        $("#current-frenemie").append("<p><strong>You have defeated all your frenemies!</strong></p>");
        $(".btn").removeClass("btn-danger").addClass("btn-warning").text("Play Again");
        wins++;
        $("#attack-updates").prepend("<hr><p class='alert-success'><strong>You have won " + wins + " times and lost " + losses + " times.</strong></p>");
        $(".btn-warning").on("click", resetGame);
      } else {
        $("#current-frenemie").append("<p class='text-muted'>Please choose another Frenemie.</p>");
      }
    }
  }

}

function updateProgressBar(characterName, characterOriginalHP, characterUpdatedHP) {
  var progressBarPercentage = Math.floor(characterUpdatedHP / characterOriginalHP * 100);
  $(characterName).find(".progress-bar").attr("aria-valuenow", progressBarPercentage).css("width", progressBarPercentage + "%");
  $(characterName).find(".progressbarText").text(characterUpdatedHP + " HP");
}


function resetGame() {
  $("#available-friends-title").text("Available Friends");
  var winner = $("#main-character").find(".character").removeClass("float-right").addClass("float-left").detach()
  defeatedCharacters.push(winner);
  defeatedCharacters.forEach(function(character){
    $("#available-characters-container").append(character);
  });
  mainCharacterActive = false;
  mainFrenemieActive = false;
  characterCounter = 3;
  mainCharacterHP = 0;
  mainCharacterAP = 0;
  mainFrenemieHP = 0;
  mainFrenemieCAP = 0;
  mainCharacter = "";
  currentFrenemie = "";
  setCharacterPowers();
  $("#main-character").html('<p class="text-muted">First:<br>Choose Your Character</p>');
  $("#current-frenemie").html('<p class="text-muted">Second:<br>Choose Your Frenemie</p>');
  $(".btn").removeClass("btn-warning").addClass("btn-danger").text("Attack");
}

$(document).ready(function () {
  setCharacterPowers();

  $(".character").on("click", function(){
    if (mainCharacterActive == false) {
      $("#main-character").empty();
      mainCharacter = createCharacter(this);
      $(this).detach().appendTo($("#main-character")).removeClass("float-left").addClass("float-right");
      mainCharacterActive = true;
      mainCharacterHP = parseInt($(this).attr("data-health-points"));
      mainCharacterAP = parseInt($(this).attr("data-attack-power"));
      mainFrenemieCAP = parseInt($(this).attr("data-counter-attack-power"));
      $("#available-friends-title").text("Available Frenemies");
      $("#available-characters-container").find(".character").removeClass("text-white").addClass("text-danger");
    } else if (mainFrenemieActive == false) {
      $("#current-frenemie").empty();
      currentFrenemie = createCharacter(this);
      $(this).detach().appendTo($("#current-frenemie"));
      mainFrenemieActive = true;
      mainFrenemieHP = parseInt($(this).attr("data-health-points"));
      mainFrenemieCAP = parseInt($(this).attr("data-counter-attack-power"));
    }
  });
  //Activate the Button
  $("#attack-button").on("click", function(){
    if (mainCharacterActive == true && mainFrenemieActive == true) {
      attackSequence();
    }
  });

});
