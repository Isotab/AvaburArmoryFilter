// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      1.3.6
// @description  Enhanced Filter for Armory in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://*.avabur.com/game*
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    var WEAPONS = ["SWORDS", "BOWS", "STAVES"];
    var ARMOR = ["HELMETS", "BREASTPLATES", "GLOVES", "BOOTS", "SHIELDS", "QUIVERS"];
    var Bp = [":)",":(",":/","B)","<3",":D",":P","CLICKING!",":O","XD","More!!","Coming","Soon"];

    var filterDiv;
    var typeSelect;
    var itemSelect;
    var levelInput;
    var powerInput;
    var containsGemsInput;
    var itemAvailableInput;
    var advancedFilter;
    var filterButton;
    var clearFilterButton;
    var armorySearch;
    var itemBoosts;
    var gemBoosts;
    var levelCompare;
    var powerCompare;
    var advancedHidden = true;

    function createTypeSelect(){
        var row = $("<div>").attr("id", "armoryFilterDiv").addClass("row").css("padding","0px 15px");
        var basic = $("<div>").attr("id", "basicFilters").addClass("row");
        var criteria = $("<div>").addClass("col-md-9");
        var submit = $("<div>").addClass("col-md-3");
        var advanced = $("<div>").attr("id", "advancedFilters").addClass("row").css("padding-top","2px");

        typeSelect = $("<select>")
          .attr("id", "itemSelectTypeSelect")
          .addClass("col-md-12")
          .css({"height":"24px","text-align-last":"center"});
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");

        var temp = $("<div>").addClass("col-md-2").css({"padding-left":"0px","padding-right":"2px"});
        temp.append(typeSelect);
        criteria.append(temp);

        itemSelect = $("<select>").attr("id", "itemSelectSelect").addClass("col-md-12").css({"height":"24px","text-align-last":"center"});
        itemSelect.append("<option value=''>--Item--</option>");
        itemSelect.append("<option value='Swords' class='wep'>Swords</option>");
        itemSelect.append("<option value='Bows' class='wep'>Bows</option>");
        itemSelect.append("<option value='Staves' class='wep'>Staves</option>");
        itemSelect.append("<option value='Helmets' class='arm'>Helmets</option>");
        itemSelect.append("<option value='Breastplates' class='arm'>Breastplates</option>");
        itemSelect.append("<option value='Gloves' class='arm'>Gloves</option>");
        itemSelect.append("<option value='Boots' class='arm'>Boots</option>");
        itemSelect.append("<option value='Shields' class='arm'>Shields</option>");
        itemSelect.append("<option value='Quivers' class='arm'>Quivers</option>");

        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append(itemSelect);
        criteria.append(temp);



        levelInput = $("<input placeholder='Lvl' type='number'/>")
            .attr("id", "levelInput")
            .attr("title", "Greater than or Equals")
            .addClass("col-md-12")
            .css({"height":"24px","text-align":"center"});
        temp = $("<div>").addClass("col-md-2").css({"padding":"0px 2px"});
        temp.append(levelInput);
        criteria.append(temp);

        powerInput = $("<input placeholder='Pwr' type='number'/>")
            .attr("id", "powerInput")
            .attr("title","Greater than or Equals")
            .addClass("col-md-12")
            .css({"height":"24px","text-align":"center"});
        temp = $("<div>").addClass("col-md-2").css({"padding":"0px 2px"});
        temp.append(powerInput);
        criteria.append(temp);

        containsGemsInput = $("<input type='checkbox' id='containsGemsInput' style='vertical-align: middle;'/>")
        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append($("<label for='containsGemsInput'>Has Gems:</label>"));
        temp.append(containsGemsInput);
        criteria.append(temp);

        itemAvailableInput = $("<input type='checkbox' id='itemAvailableInput' style='vertical-align: middle;'/>")
        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append($("<label for='itemAvailableInput'>Can Barrow:</label>"));
        temp.append(itemAvailableInput);
        criteria.append(temp);

        advancedFilter = $("<button>Show</button>")
          .attr("id","advancedFilterButton")
          .attr("title","Advanced Filter Options")
          .addClass("col-md-12")
          .css("height","24px");
        temp = $("<div>").addClass("col-md-4").css({"padding":"0px 2px"});
        temp.append(advancedFilter);
        submit.append(temp);

        clearFilterButton = $("<button>Clear</button>")
          .attr("id","clearFilterButton")
          .attr("title","Clear Filter Criteria")
          .addClass("col-md-12")
          .css("height","24px");
        temp = $("<div>").addClass("col-md-4").css({"padding":"0px 2px"});
        temp.append(clearFilterButton);
        submit.append(temp);
        temp = $("<div>").addClass("col-md-4").css({"padding-left":"2px","padding-right":"0px"});
        filterButton = $("<button>Filter</button>").attr("id", "armoryFilterButton").addClass("col-md-12").css("height","24px");
        temp.append(filterButton);
        submit.append(temp);
        basic.append(criteria);
        basic.append(submit);
        row.append(basic);

        /*
        Action Time Reduction (Chronokinesis)
        Agility (Agility)
        Armor Penetration (Piercing)
        Battle Exp Boost (Wisdom)
        Carving Boost (Etching)
        Coordination (Coordination)
        Counter Attack (Retaliation )
        Counter Attack Damage (Retribution)
        Crafting Boost (Smithing)
        Crit Hit Chance (Potency)
        Crit Hit Damage (Recklessness)
        Drop Boost (Luck)
        Evasion (Elusion)
        First Hit Chance (Celerity)
        Gold Boost (Greed)
        Healing (Restoration)
        Healing Boost (Recovery)
        Health (Health)
        Magical Weapons (Sorcery)
        Maximum Stamina (Endurance)
        Melee Weapons (Dueling)
        Multistrike Chance (Swiftness)
        Ranged Weapons (Sniping)
        Resource Boost (Harvesting)
        Stat Drop Boost (Mastery)
        Strength (Strength)
        Toughness (Resilience)
        Unarmed Combat (Brawling)
        */


        itemBoosts = $("<select>").attr("id","itemBoostSelect");
        itemBoosts.append($("<option value=''>--Item Boost--</option>"));
        itemBoosts.append($("<option value='Agility'>Agility</option>"));
        itemBoosts.append($("<option value='Unarmed Combat'>Brawling</option>"));
        itemBoosts.append($("<option value='First Hit Chance'>Celerity</option>"));
        itemBoosts.append($("<option value='Action Time Reduction'>Chronokinesis</option>"));
        itemBoosts.append($("<option value='Coordination'>Coordination</option>"));
        itemBoosts.append($("<option value='Melee Weapons'>Dueling</option>"));
        itemBoosts.append($("<option value='Maximum Stamina'>Endurance</option>"));
        itemBoosts.append($("<option value='Carving Boost'>Etching</option>"));
        itemBoosts.append($("<option value='gold per kill'>Greed</option>"));
        itemBoosts.append($("<option value='Resource Boost'>Harvesting</option>"));
        itemBoosts.append($("<option value='Health'>Health</option>"));
        itemBoosts.append($("<option value='Drop Boost'>Luck</option>"));
        itemBoosts.append($("<option value='Stat Drop Boost'>Mastery</option>"));
        itemBoosts.append($("<option value='Armor Penetration'>Piercing</option>"));
        itemBoosts.append($("<option value='Crit Hit Chance'>Potency</option>"));
        itemBoosts.append($("<option value='Crit Hit Damage'>Recklessness</option>"));
        itemBoosts.append($("<option value='Healing Boost'>Recovery</option>"));
        itemBoosts.append($("<option value='Toughness'>Resilience</option>"));
        itemBoosts.append($("<option value='Healing'>Restoration</option>"));
        itemBoosts.append($("<option value='Counter Attack'>Retaliation</option>"));
        itemBoosts.append($("<option value='Counter Attack Damage'>Retribution</option>"));
        itemBoosts.append($("<option value='Crafting Boost'>Smithing</option>"));
        itemBoosts.append($("<option value='Ranged Weapons'>Sniping</option>"));
        itemBoosts.append($("<option value='Magical Weapons'>Sorcery</option>"));
        itemBoosts.append($("<option value='Strength'>Strength</option>"));
        itemBoosts.append($("<option value='Multistrike Chance'>Swiftness</option>"));
        itemBoosts.append($("<option value='Battle Exp Boost'>Wisdom</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding-left":"0px","padding-right":"2px"});
        temp.append(itemBoosts);
        advanced.append(temp);

        gemBoosts = $("<select>").attr("id","gemBoostSelect");
        gemBoosts.append($("<option value=''>--Gem Boost--</option>"));
        gemBoosts.append($("<option value='Agility'>Agility</option>"));
        gemBoosts.append($("<option value='Unarmed Combat'>Brawling</option>"));
        gemBoosts.append($("<option value='First Hit Chance'>Celerity</option>"));
        gemBoosts.append($("<option value='Action Time Reduction'>Chronokinesis</option>"));
        gemBoosts.append($("<option value='Coordination'>Coordination</option>"));
        gemBoosts.append($("<option value='Melee Weapons'>Dueling</option>"));
        gemBoosts.append($("<option value='Maximum Stamina'>Endurance</option>"));
        gemBoosts.append($("<option value='Carving Boost'>Etching</option>"));
        gemBoosts.append($("<option value='gold per kill'>Greed</option>"));
        gemBoosts.append($("<option value='Resource Boost'>Harvesting</option>"));
        gemBoosts.append($("<option value='Health'>Health</option>"));
        gemBoosts.append($("<option value='Drop Boost'>Luck</option>"));
        gemBoosts.append($("<option value='Stat Drop Boost'>Mastery</option>"));
        gemBoosts.append($("<option value='Armor Penetration'>Piercing</option>"));
        gemBoosts.append($("<option value='Crit Hit Chance'>Potency</option>"));
        gemBoosts.append($("<option value='Crit Hit Damage'>Recklessness</option>"));
        gemBoosts.append($("<option value='Healing Boost'>Recovery</option>"));
        gemBoosts.append($("<option value='Toughness'>Resilience</option>"));
        gemBoosts.append($("<option value='Healing'>Restoration</option>"));
        gemBoosts.append($("<option value='Counter Attack'>Retaliation</option>"));
        gemBoosts.append($("<option value='Counter Attack Damage'>Retribution</option>"));
        gemBoosts.append($("<option value='Crafting Boost'>Smithing</option>"));
        gemBoosts.append($("<option value='Ranged Weapons'>Sniping</option>"));
        gemBoosts.append($("<option value='Magical Weapons'>Sorcery</option>"));
        gemBoosts.append($("<option value='Strength'>Strength</option>"));
        gemBoosts.append($("<option value='Multistrike Chance'>Swiftness</option>"));
        gemBoosts.append($("<option value='Battle Exp Boost'>Wisdom</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding":"0px 2px"});
        temp.append(gemBoosts);
        advanced.append(temp);

        levelCompare = $("<select>").attr("id","levelCompareSelect");
        levelCompare.append($("<option value='ge'>>=</option>"));
        levelCompare.append($("<option value='g'>></option>"));
        levelCompare.append($("<option value='e'>=</option>"));
        levelCompare.append($("<option value='l'><</option>"));
        levelCompare.append($("<option value='le'><=</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding":"0px 2px"});
        temp.append($("<label for='levelCompareSelect'>Level Compare: </label>"));
        temp.append(levelCompare);
        advanced.append(temp);

        powerCompare = $("<select>").attr("id","powerCompareSelect");
        powerCompare.append($("<option value='ge'>>=</option>"));
        powerCompare.append($("<option value='g'>></option>"));
        powerCompare.append($("<option value='e'>=</option>"));
        powerCompare.append($("<option value='l'><</option>"));
        powerCompare.append($("<option value='le'><=</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding-left":"2px","padding-right":"0px"});
        temp.append($("<label for='powerCompareSelect'>Power Compare: </label>"));
        temp.append(powerCompare);
        advanced.append(temp);
        advanced.hide();

        row.append(advanced);
        return row;
    }

    function insertHtml(){
        filterDiv = createTypeSelect();
        armorySearch = $("#clanInventoryTable_filter");
        armorySearch.after(filterDiv);
        //armoryOldFilter.hide();
    };

    function setupWatches(){
        filterButton.on("click", function(){
            //console.log("Filtering Armory Selection for Type: " + typeSelect.val() + ", Item: " + itemSelect.val() + ", Level: " + levelInput.val());
            $("#clanInventoryTable").DataTable().draw();
        });

        typeSelect.change(function(event){
            var selection = $(this).val();
            if(selection != ''){
                if(selection == 'weapon'){
                    hideArmor();
                    showWeapons();
                }else{
                    showArmor();
                    hideWeapons();
                }
                resetItems();
            }else{
                showItems();
            }
        });

        $(".closeModal, #modalBackground").on("click", function(e){
            e.preventDefault();
            resetFilter();
        });

        advancedFilter.on("click", function() {
            advancedHidden = !advancedHidden;
            if(advancedHidden){
              $('#advancedFilters').slideUp();
              advancedFilter.text("Show");
            }else{
              $('#advancedFilters').slideDown();
              advancedFilter.text("Hide");
            }
        });

        levelInput.dblclick(function(){
            //get current level
            levelInput.val($("#level").html());
        });

        powerInput.dblclick(function(){
            //get current power
            var id = powerForWhat();
            var json = $("#"+id).data("json");
            if($.isEmptyObject(json)){
                powerInput.val("0");
            }else{
                powerInput.val(json.p);
            }
        });

        clearFilterButton.on("click", function(){
            resetFilter();
            $("#clanInventoryTable").DataTable().settings()["0"].oPreviousSearch.sSearch = "";
            $("#clanInventoryTable").DataTable().draw();
        });


    };

    function hideWeapons(){
        itemSelect.children(".wep").hide();
    }

    function showWeapons(){
        itemSelect.children(".wep").show();
    }

    function hideArmor(){
        itemSelect.children(".arm").hide();
    }

    function showArmor(){
        itemSelect.children(".arm").show();
    }

    function showItems(){
        showArmor();
        showWeapons();
        resetItems();
    }

    function resetItems(){
        if(itemSelect.val() != ''){
            itemSelect.val('');
        }
    }

    function resetFilter(){
        if(typeSelect.val() != ''){
            typeSelect.val("");
        }
        if(itemSelect.val() != ''){
            itemSelect.val("");
        }
        if(levelInput.val() != ''){
            levelInput.val("");
        }
        if(powerInput.val() != ''){
            powerInput.val("");
        }
        if(containsGemsInput[0].checked){
            containsGemsInput[0].checked = false;
        }
        if(itemAvailableInput[0].checked){
            itemAvailableInput[0].checked = false;
        }
        if(armorySearch.find("input").val() != ''){
            armorySearch.find("input").val('');
        }
        if(itemBoosts.val() != ''){
            itemBoosts.val("");
        }
        if(gemBoosts.val() != ''){
            gemBoosts.val("");
        }
        if(levelCompare.val() != ''){
            levelCompare.val("ge");
        }
        if(powerCompare.val() != ''){
            powerCompare.val("ge");
        }
    }

    function powerForWhat(){
        var type = typeSelect.val() == '' ? false : typeSelect.val();
        var item = itemSelect.val() == '' ? false : itemSelect.val();

        if(item != false){
            var itemType = itemSelectIsWeapon(item) ? "weapon" : "armor";
            if("armor"){
                switch(item){
                    case "Helmets":
                        return "helmet";
                    case "Breastplates":
                        return "breastplate";
                    case "Gloves":
                        return "gloves";
                    case "Boots":
                        return "boots";
                    case "Shields":
                    case "Quivers":
                        return "shield"
                }
            }
            return itemType;
        }

        if(type != false){
            if(type == "weapon"){
                return "weapon";
            }else{
                return "helmet";
            }
        }

        return "weapon";

    }

    function itemSelectIsWeapon(itemSelectType){
        return WEAPONS.indexOf(itemSelectType.toUpperCase()) > -1;
    }

    function itemSelectIsArmor(itemSelectType){
        return ARMOR.indexOf(itemSelectType.toUpperCase()) > -1;
    }

    function init() {
        //console.log("Initializing Armory Filter");
        insertHtml();
        setupWatches();
    };

    $(window).on("load", function(){
        init();
    });


    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex){
            if(settings.sInstance != "clanInventoryTable"){
                return true;
            }else{
                /*
                data[0] name
                data[1] levelInput
                data[2] powerInput
                data[3] gems
                data[4] bonuses
                data[5] holder
                data[6] type
                */
                if(noFilter()){
                    return true;
                }

                var gems = containsGemsInput[0].checked ? data[3] != "0" : true;
                if(!gems) { return false; }

                var available = itemAvailableInput[0].checked ? data[5] == "None" : true;
                if(!available) { return false; }

                var isLevel = levelInput.val() != '' ? parseInt(levelInput.val()) <= parseInt(data[1]) : true;
                if(!isLevel){ return false; }

                var isPower = powerInput.val() != '' ? parseInt(powerInput.val()) <= parseInt(data[2]) : true ;
                if(!isPower){ return false; }

                var isItem = itemSelect.val() != '' ? itemSelect.val() == data[6] : true;
                var isType = typeSelect.val() != '' ? typeSelect.val() == 'weapon' ? itemSelectIsWeapon(data[6]) : itemSelectIsArmor(data[6]) : true;

                var hasItemBoost = false;
                var hasGemBoost = false;
                var checkForGems = gemBoosts.val() != '';
                var checkForItems = itemBoosts.val() != '';
                var boosts = data[4].split(",");
                for(var i = 0; i < boosts.length; i++){
                  if(!hasItemBoost && boosts[i].includes(itemBoosts.val())){
                   hasItemBoost = true;
                  }
                  if(!hasGemBoost && boosts[i].includes(gemBoosts.val())){
                   hasGemBoost = true;
                  }
                }
                if(checkForGems){
                  if(!hasGemBoost){
                    return false;
                  }
                }
                if(checkForItems){
                  if(!hasItemBoost){
                    return false;
                  }
                }

                return isLevel && isItem && isType && gems && available && hasItemBoost && hasGemBoost;
            }
        }
    );

    function noFilter(){

        if(typeof typeSelect === 'undefined'){
            return true;
        }

        return typeSelect.val() == '' &&
          itemSelect.val() == '' &&
          levelInput.val() == '' &&
          powerInput.val() == '' &&
          !containsGemsInput[0].checked &&
          !itemAvailableInput[0].checked &&
          itemBoosts.val() == '' &&
          gemBoosts.val() == '';
    }

})(jQuery);
