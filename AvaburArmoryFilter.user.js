// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      0.0.1
// @description  Filter armory items in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://*.avabur.com/game*
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';
    var WEAPONS = ["SWORDS", "BOWS", "STAVES"];
    var ARMOR = ["HEMLETS", "BREASTPLATES", "GLOVES", "BOOTS", "SHIELDS", "QUIVERS"];

    var filterDiv;
    var typeSelect;
    var item;
    var level;
    var filterButton;
    var armoryTable = $("#clanInventoryTable");

    function createTypeSelect(){
        var type = $("<div>").attr("id", "armoryFilter");
        typeSelect = $("<select>").attr("id", "type");
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");
        type.append(typeSelect);

        item = $("<select>").attr("id", "item");
        item.append("<option value=''>--Item--</option>");
        item.append("<option value='swords' class='wep'>Swords</option>");
        item.append("<option value='bows' class='wep'>Bows</option>");
        item.append("<option value='staves' class='wep'>Staves</option>");
        item.append("<option value='helmets' class='arm'>Helmets</option>");
        item.append("<option value='breastplates' class='arm'>Breastplates</option>");
        item.append("<option value='gloves' class='arm'>Gloves</option>");
        item.append("<option value='boots' class='arm'>Boots</option>");
        item.append("<option value='shields' class='arm'>Shields</option>");
        item.append("<option value='quivers' class='arm'>Quivers</option>");
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
        var clanArmoryTable = $("#clanInventoryTable_filter");
        clanArmoryTable.after(filterDiv);
        clanArmoryTable.hide();
    };

    function setupWatches(){
        filterButton.on("click", function(){
            filterArmory(typeSelect.val(), item.val(), level.val());
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

    function filterArmory(type, item, level){
        console.log("Filtering Armory Selection for Type: " + type + ", Item: " + item + ", Level: " + level);
        //get table contents
        var tableRows = armoryTable.dataTable().api().rows().data();
        //hide rows that don't meet criteria
        tableRows.each( function(element, index){
            if(!checkRow(element, index, type, item, level)){
                armoryTable.dataTable().api().row($(element)).remove();
            }
        });

        armoryTable.dataTable().filter(function(row){
            var x=0;
        });

        armoryTable.dataTable().api().draw();
    }

    function checkRow(element, index, type, item, level){
        var isLevel = false;
        var isType = false;
        var isItem = false;

        
        //check element for level
        if(level != ''){
            var numLevel = parseInt(level, 10);
            isLevel = numLevel == element.l;
        }else if(level == ''){
            isLevel = true;
        }

        //check element for item
        if(type != ''){
            isType = type == 'weapon' 
                        ? itemIsWeapon(element.group_name.toUpperCase()) : 
                          itemIsArmor(element.group_name.toUpperCase());
        }else if(type == ''){
            isType = true;
        }

        if(item != ''){
            isItem = item.toUpperCase() === element.group_name.toUpperCase();
        }else if(item == ''){
            isItem = true;
        }

        return isLevel && isType && isItem;
    }

    function itemIsWeapon(group_name){
        return WEAPONS.indexOf(group_name) > -1;
    }

    function itemIsArmor(group_name){
        return ARMOR.indexOf(group_name) > -1;
    }

    function init() {
        console.log("In init()");
        insertHtml();
        setupWatches();
    };

    window.addEventListener('load', init, {once: true});

})(jQuery);
