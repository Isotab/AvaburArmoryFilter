// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      1.0.2
// @description  Filter armory itemSelects in Avabur
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
    var comingSoon;
    var filterButton;

    function createTypeSelect(){
        var row = $("<div>").attr("id", "armoryFilterDiv").addClass("row").css("padding","0px 15px");
        var criteria = $("<div>").addClass("col-md-9").css("padding","0");
        var submit = $("<div>").addClass("col-md-3").css("padding","0");

        typeSelect = $("<select>")
          .attr("id", "itemSelectTypeSelect")
          .addClass("col-md-12")
          .css({"height":"24px","text-align-last":"center","padding-left":"0px"});
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
                  .attr("title", "Equals")
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

        containsGemsInput = $("<input type='checkbox' id='containsGemsInput'/>")
        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append($("<label for='containsGemsInput'>Has Gems:</label>"));
        temp.append(containsGemsInput);
        criteria.append(temp);

        itemAvailableInput = $("<input type='checkbox' id='itemAvailableInput'/>")
        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append($("<label for='itemAvailableInput'>Can Barrow:</label>"));
        temp.append(itemAvailableInput);
        criteria.append(temp);

        comingSoon = $("<button>:)</button>").attr("id","comingSoonButton").attr("title","Updates coming!!!").addClass("col-md-12").css("height","24px");
        temp = $("<div>").addClass("col-md-6").css({"padding":"0px 2px"});
        temp.append(comingSoon);
        submit.append(temp);

        temp = $("<div>").addClass("col-md-6").css({"padding-left":"2px","padding-right":"0px"});
        filterButton = $("<button>Filter</button>").attr("id", "armoryFilterButton").addClass("col-md-12").css("height","24px");
        temp.append(filterButton);
        submit.append(temp);

        row.append(criteria);
        row.append(submit);

        return row;
    }

    function insertHtml(){
        filterDiv = createTypeSelect();
        var armoryOldFilter = $("#clanInventoryTable_filter");
        armoryOldFilter.after(filterDiv);
        armoryOldFilter.hide();
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

        comingSoon.on("click", function() {
          var i = Math.floor((Math.random() * Bp.length));
          comingSoon.text(Bp[i]);
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

                var isLevel = false;
                if(levelInput.val() != ''){
                    isLevel = levelInput.val() == data[1];
                }else{
                    isLevel = true;
                }
                if(!isLevel){
                    return false;
                }

                var isPower = false;
                if(powerInput.val() != ''){
                    isPower = parseInt(powerInput.val()) <= parseInt(data[2]);
                }else{
                    isPower = true;
                }
                if(!isPower){
                    return false;
                }

                var isItem = false;
                if(itemSelect.val() != ''){
                    isItem = itemSelect.val() == data[6];
                }else{
                    return true;
                }

                var isType = false;
                if(typeSelect.val() != ''){
                    isType = typeSelect.val() == 'weapon' ? itemSelectIsWeapon(data[6]) : itemSelectIsArmor(data[6]);
                }else{
                    isType = true;
                }
                return isLevel && isItem && isType;
            }
        }
    );

    function noFilter(){
        return typeSelect.val() == '' &&
          itemSelect.val() == '' &&
          levelInput.val() == '' &&
          powerInput.val() == '' &&
          !containsGemsInput.checked &&
          !itemAvailableInput.checked;
    }

})(jQuery);
