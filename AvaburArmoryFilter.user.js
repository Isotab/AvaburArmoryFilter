// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      1.0.0
// @description  Filter armory items in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://*.avabur.com/game*
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    var WEAPONS = ["SWORDS", "BOWS", "STAVES", "SWORD", "BOW", "STAFF"];
    var ARMOR = ["HELMETS", "BREASTPLATES", "GLOVES", "BOOTS", "SHIELDS", "QUIVERS",
                 "HELMET", "BREASTPLATE", "SHIELD", "QUIVER"];

    var filterDiv;
    var typeSelect;
    var item;
    var level;
    var filterButton;

    function createTypeSelect(){
        var type = $("<div>").attr("id", "armoryFilter");
        typeSelect = $("<select>").attr("id", "type");
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");
        type.append(typeSelect);

        item = $("<select>").attr("id", "item");
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

        level = $("<input placeholder='Level' type='number'/>").attr("id", "level");
        type.append(level);

        filterButton = $("<input type='button' value='Filter'/>").attr("id", "armoryFilterButton");
        type.append(filterButton);
        return type;
    }

    function insertHtml(){
        filterDiv = $("<div>").attr("id","armoryFilter");
        filterDiv.append(createTypeSelect());
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
                var itemType = data[0].split(" ").pop();
                var itemLevel = data[1];

                var isLevel = false;
                if(level.val() != ''){
                    isLevel = level.val() == itemLevel;
                }else if(level.val() == ''){
                    isLevel = true;
                }
                if(!isLevel){
                    return false;
                }

                var isType = false;
                if(typeSelect.val() != ''){
                    isType = typeSelect.val() == 'weapon' ? itemIsWeapon(itemType) : itemIsArmor(itemType);
                }else if(typeSelect.val() == ''){
                    isType = true;
                }
                if(!isType){
                    return false;
                }

                var isItem = false;
                if(item.val() != ''){
                    isItem = item.val().toUpperCase() == itemType.toUpperCase();
                }else{
                    return true;
                }

                return isLevel && isType && isItem;
            }
        }
    );

})(jQuery);
