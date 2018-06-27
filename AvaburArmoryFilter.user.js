// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @required     https://github.com/theCanadianHat/AvaburArmoryFilter/raw/test/img/search_filter_white.png
// @version      1.0.1
// @description  Filter armory items in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://*.avabur.com/game*
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    var WEAPONS = ["SWORDS", "BOWS", "STAVES"];
    var ARMOR = ["HELMETS", "BREASTPLATES", "GLOVES", "BOOTS", "SHIELDS", "QUIVERS"];

    var filterDiv;
    var typeSelect;
    var item;
    var level;
    var filterButton;

    function createTypeSelect(){
        var type = $("<div>").attr("id", "armoryFilter").addClass("row").css("padding","0px 15px");
        typeSelect = $("<select>").attr("id", "type").addClass("col-md-3").css({"height":"24px","text-align-last":"center"});
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");
        type.append(typeSelect);

        item = $("<select>").attr("id", "item").addClass("col-md-3").css({"height":"24px","text-align-last":"center"});
        item.append("<option value=''>--Item--</option>");
        item.append("<option value='sword' class='wep'>Swords</option>");
        item.append("<option value='bow' class='wep'>Bows</option>");
        item.append("<option value='staff' class='wep'>Staves</option>");
        item.append("<option value='helmet' class='arm'>Helmets</option>");
        item.append("<option value='breastplate' class='arm'>Breastplates</option>");
        item.append("<option value='gloves' class='arm'>Gloves</option>");
        item.append("<option value='boots' class='arm'>Boots</option>");
        item.append("<option value='shield' class='arm'>Shields</option>");
        item.append("<option value='quiver' class='arm'>Quivers</option>");
        type.append(item);

        level = $("<input placeholder='Level' type='number'/>").attr("id", "level").addClass("col-md-3").css({"height":"24px","text-align":"center"});
        type.append(level);

        // filterButton = $("<input type='button' value='Filter'/>").attr("id", "armoryFilterButton").addClass("col-md-3").css("height","24px");
        filterButton = $("<a role='button' img='')
        type.append(filterButton);


        return type;
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

                if(noFilter()){
                    return true;
                }

                var itemLevel = data[1];
                var itemPower = data[2];
                var itemGems = date[3];
                var itemBoosts = data[4];
                var itemAvailable = data[5];
                var itemType = data[6];

                var isLevel = false;
                if(level.val() != ''){
                    isLevel = level.val() == data[1];
                }else{
                    isLevel = true;
                }
                if(!isLevel){
                    return false;
                }

                var isItem = false;
                if(item.val() != ''){
                    isItem = item.val().toUpperCase() == data[6].toUpperCase();
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
        return level.val() == '' && typeSelect.val() == '' && level.val() == '';
    }

})(jQuery);
