// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Filter armory items in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://beta.avabur.com/game
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    function createTypeSelect(){
        var type = $("<div>").attr("id", "armoryFilter");
        var typeSelect = $("<select>").attr("id", "type");
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");
        type.append(typeSelect);

        var item = $("<select>").attr("id", "item");
        item.append("<option value=''>--Item--</option>");
        item.append("<option value='sword' class='wep'>Swords</option>");
        item.append("<option value='bow' class='wep'>Bows</option>");
        item.append("<option value='staff' class='wep'>Staves</option>");
        item.append("<option value='helmet' class='arm'>Helmets</option>");
        item.append("<option value='plate' class='arm'>Breastplates</option>");
        item.append("<option value='glove' class='arm'>Gloves</option>");
        item.append("<option value='boot' class='arm'>Boots</option>");
        item.append("<option value='sheild' class='arm'>Shields</option>");
        item.append("<option value='quiver' class='arm'>Quivers</option>");
        type.append(item);

        var level = $("<input placeholder='Level' type='number'/>").attr("id", "level");
        type.append(level);

        var button = $("<input type='button' value='Filter'/>").attr("id", "armoryFilterButton");
        type.append(button);
        return type;
    }

    function insertHtml(){
        var filterDiv = $("<div>").attr("id","armoryFilter");
        filterDiv.append(createTypeSelect());
        var clanArmoryTable = $("#clanInventoryTable_filter");
        clanArmoryTable.after(filterDiv);
        clanArmoryTable.hide();
    };

    function setupWatches(){

    };

    function init() {
        console.log("In init()");
        insertHtml();
    };

    window.addEventListener('load', init, {once: true});

})(jQuery);
