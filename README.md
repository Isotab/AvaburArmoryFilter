# AvaburArmoryFilter
- TamperMonkey script that enhances search filtering in the clan's armory.
- If you have an idea that could improve upon the current functionality of this script, please let me now by making a bug reort explaining what you would like. If its possible I'll see about adding it in a later version! You can also whisper AwesomPants in Avabur (or AwesomePants in beta).
- Thank you everyone helping with testing
  - WinterPhoenix
  - Vysn
  - Bento
  - VBMS
  - dang
  - elnaeth


# Installation
- Make sure you have TamperMonkey extension installed. (required)
- From the GitHub repository main page click the link for AvaburArmoryFilter.user.js
- From this newly loaded page click the "Raw" button bear the top right of the page.
- This should load a new page with an install button.
- That's it! Enjoy
- Or...just click [here](https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js) if you already have TamperMonkey

# Issues
- If you come across something that doesn't seem right please report an issue through GitHub.

# v1.0
- Added new filters in the Clan's Armory. 
- You can now filter by item type (Weapons, and Armor), by item (specific type of item i.e. Bows), and by level (the actual level of the item). 
- If you want to search for something by just one of these criteria leave the input(s) blank. 
- Example: If you want just Bows then set the item select to bows and filter.

# v1.1
- When leaving the Clan modal the filters will be reset.
- This script now loads when the window is ready to help prevent undefined values.

# v1.2
- Added CSS 
- Added Power criteria
- Surprises!

# v1.3
- Added new criteria: 
  - Contains Gems, and Available to barrow 
- Added new double click autofill for level and power input
  - Double clicking on level will autofill the level input to your current level
  - Double clicking on power will autofill the power input with (depending on type and item criteria):
    - If no other criteria is selected then you get the power of your weapon currently equiped (if none then 0)
    - If type of "Weapon" is selected -> power of your weapon currently equiped (if none then 0)
    - If item is populated -> power of the item currently equiped in that slot
    - Swords, Bows, Staves -> weapon slot
    - Helmets -> helmet slot
    - Breastplates -> breastplate slot
    - Gloves -> gloves slot
    - Boots -> boots slot
    - Quivers, Shields -> offhand slot

# v1.4
- Added the search bar back (You're welcome dang)
- Added clear filter button which also clears the search bar
- Added Hide/Show button for advanced search criteria
- Added advacned search criteria
  - Item Boost
    - Select the boost you are searching for (checks for boost only on items)
  - Gem Boost
    - Select the boost you are searching for (checks for boost only on gems)
  - Level Compare
  - Power Compare
    - Both compare selects allow you to change how you want to search for items by their level or power.
    - Example: If Level input is 20 and Level compare is "<"; items with a level "less than" 20 will poplate the armory table.
    
 ## v1.4.2
 - Has Gem criteria now has three options
   - Don't Care
   - Yes
   - No
 - The filter criteria is not longer reset when closing the armory modal
