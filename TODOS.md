# Styling 
* Make styling for every resource IE. winning dying background transition for when certian conditions or actions are needed just change the className/id to inact those on that element 



```js
  var battleSetup = function(opt) {
    var battle = opt.battle;
    
    BattleCommands.init(battle);
    
    // party UI setup
    $party.find(".char").remove();
    $stats.empty();
    
    $.each(battle.party, function(i, char) {
      $party.append(createCharUI(char));
      $stats.append(createCharStatsUI(char));
      resetCharStats(char);
    });
    
    if (battle.background) {
      $battle.find(".background").attr("class", "background " + battle.background.cssClass);
    }
    
    // enemy UI setup
    var $enemies = $(".enemies", $battle); 
    var $column = null, numColumns = 0;
    var mixed = battle.isMixedSize();
    var restrictions = battle.getRestrictions();
    var enemiesBySize = battle.enemiesBySize;
    
    $enemies.find(".column").remove();
    
    for (var size in enemiesBySize) {
      var enemies = enemiesBySize[size].enemies;
      $.each(enemies, function(i, name) {
        if (i % enemiesPerColumn[size] == 0) {
          $column = $("<div/>").addClass("column").addClass(size).addClass(AnimationUtil.ORDINALS[numColumns++]);
          if (mixed) {
            $column.addClass("mixed");
          }
          $enemies.append($column);
        }
        
        $column.append(createEnemyUI(Monster.lookup(name)));
      });
      
      if (size == "small" && enemiesBySize.length % enemiesPerColumn[size] == 1) {
        $column.addClass("single");
      }
    }
    
    // enemy list setup
    var enemiesByName = battle.enemiesByName;
    var $enemyList = $battle.find(".enemy.list");
    $enemyList.empty();
    for (var name in enemiesByName) {
      $enemyList.append(Message.create(name));
    }
    
    gatherCommands(battle);
  };

  var newBattle = function(charClasses, enemies, opt) {
    opt = $.extend(true, {doNotMove:true}, opt);
    for (var c in charClasses) {
      var charName = "";
      for (var i = 0; i < 4; i++) {
        charName += String.fromCharCode(65 + +c);
      }
      Party.addChar(Party.createNewChar(charName, charClasses[c], c));
    }

    if (opt.party) {
      opt.party.call();
    }

    var battle = null;
    if (typeof enemies === "string") {
      var encounter = Encounter.formationToEncounter(Encounter.lookupFormation(enemies));
      battle = Battle.create({
        party : Party.getChars()
       ,enemies : encounter.enemies
       ,surprise : encounter.surprise
       ,runnable : encounter.runnable
       ,background : MapConstants.BattleBackgrounds.Forest
       ,doNotMove : opt.doNotMove
      });
    } else {
      battle = Battle.create({
        party : Party.getChars()
       ,enemies : $.isArray(enemies) ? enemies : [enemies]
       ,background : MapConstants.BattleBackgrounds.Forest
       ,doNotMove : opt.doNotMove
      });
    }
    if (opt.monster) {
      opt.monster.call();
    }

    Event.transmit(Event.Types.BattleSetup, {battle:battle});
    return battle;
  };
  
```