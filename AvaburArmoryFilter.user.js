// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      1.0.2
// @description  Filter armory items in Avabur
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
    var item;
    var level;
    var power;
    var filterButton;
    var comingSoon;

    function createTypeSelect(){
        var row = $("<div>").attr("id", "armoryFilterDiv").addClass("row").css("padding","0px 15px");
        var criteria = $("<div>").addClass("col-md-9").css("padding","0");
        var submit = $("<div>").addClass("col-md-3").css("padding","0");

        typeSelect = $("<select>")
          .attr("id", "itemTypeSelect")
          .addClass("col-md-12")
          .css({"height":"24px","text-align-last":"center","padding-left":"0px"});
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");

        var temp = $("<div>").addClass("col-md-4").css({"padding-left":"0px","padding-right":"2px"});
        temp.append(typeSelect);
        criteria.append(temp);

        item = $("<select>").attr("id", "itemSelect").addClass("col-md-12").css({"height":"24px","text-align-last":"center"});
        item.append("<option value=''>--Item--</option>");
        item.append("<option value='Swords' class='wep'>Swords</option>");
        item.append("<option value='Bows' class='wep'>Bows</option>");
        item.append("<option value='Staves' class='wep'>Staves</option>");
        item.append("<option value='Helmets' class='arm'>Helmets</option>");
        item.append("<option value='Breastplates' class='arm'>Breastplates</option>");
        item.append("<option value='Gloves' class='arm'>Gloves</option>");
        item.append("<option value='Boots' class='arm'>Boots</option>");
        item.append("<option value='Shields' class='arm'>Shields</option>");
        item.append("<option value='Quivers' class='arm'>Quivers</option>");

        temp = $("<div>").addClass("col-md-4").css("padding","0px 2px");
        temp.append(item);
        criteria.append(temp);



        level = $("<input placeholder='Lvl' type='number'/>")
                  .attr("id", "level")
                  .attr("title", "Equals")
                  .addClass("col-md-12")
                  .css({"height":"24px","text-align":"center"});
        temp = $("<div>").addClass("col-md-2").css({"padding":"0px 2px"});
        temp.append(level);
        criteria.append(temp);

        power = $("<input placeholder='Pwr' type='number'/>")
                  .attr("id", "power")
                  .attr("title","Greater than or Equals")
                  .addClass("col-md-12")
                  .css({"height":"24px","text-align":"center"});
        temp = $("<div>").addClass("col-md-2").css({"padding":"0px 2px"});
        temp.append(power);
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
            //console.log("Filtering Armory Selection for Type: " + typeSelect.val() + ", Item: " + item.val() + ", Level: " + level.val());
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
        item.children(".wep").hide();
    }

    function showWeapons(){
        item.children(".wep").show();
    }

    function hideArmor(){
        item.children(".arm").hide();
    }

    function showArmor(){
        item.children(".arm").show();
    }

    function showItems(){
        showArmor();
        showWeapons();
        resetItems();
    }

    function resetItems(){
        if(item.val() != ''){
            item.val('');
        }
    }

    function resetFilter(){
        if(typeSelect.val() != ''){
            typeSelect.val("");
        }
        if(item.val() != ''){
            item.val("");
        }
        if(level.val() != ''){
            level.val("");
        }
        if(power.val() != ''){
            power.val("");
        }
    }

    function itemIsWeapon(itemType){
        return WEAPONS.indexOf(itemType.toUpperCase()) > -1;
    }

    function itemIsArmor(itemType){
        return ARMOR.indexOf(itemType.toUpperCase()) > -1;
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
                data[1] level
                data[2] power
                data[3] gems
                data[4] bonuses
                data[5] holder
                data[6] type
                */
                if(noFilter()){
                    return true;
                }

                var isLevel = false;
                if(level.val() != ''){
                    isLevel = level.val() == data[1];
                }else{
                    isLevel = true;
                }
                if(!isLevel){
                    return false;
                }

                var isPower = false;
                if(power.val() != ''){
                    isPower = parseInt(power.val()) <= parseInt(data[2]);
                }else{
                    isPower = true;
                }
                if(!isPower){
                    return false;
                }

                var isItem = false;
                if(item.val() != ''){
                    isItem = item.val() == data[6];
                }else{
                    return true;
                }

                var isType = false;
                if(typeSelect.val() != ''){
                    isType = typeSelect.val() == 'weapon' ? itemIsWeapon(data[6]) : itemIsArmor(data[6]);
                }else{
                    isType = true;
                }
                return isLevel && isItem && isType;
            }
        }
    );

    function noFilter(){
        return typeSelect.val() == '' &&
          item.val() == '' &&
          level.val() == '' &&
          power.val() == '';
    }

})(jQuery);
