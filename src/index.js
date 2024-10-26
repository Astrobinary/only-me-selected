// import BasicApplication from './view/BasicApplication.js';


// Hooks.once('init', () => {
// game.settings.register("only-me-selected", "onlyTarget", {
//    name: "Target Only",
//    hint: "Limit the restriction to when the player has a target selected",
//    scope: "client", // "world" is accessible by all players; "client" is per-user
//    config: true,   // Shows this setting in the module's settings menu
//    type: Boolean,
//    default: false,  // Default value
//    onChange: value => {
//       // Optionally: Code to execute when the setting is changed
//       console.log("Only Me Selected! - Only forces if target is selected", value);
//    }
// });

// });


// Hooks.once('ready', () => {
//    new BasicApplication().render(true, { focus: true });
// });

Hooks.on('updateCombat', (combat) => {
   const token = canvas.tokens.get(combat.current.tokenId);

   if (token.isOwner) {
      token.control();
   }
});

Hooks.on("controlToken", (token, controlled) => {
   const isTargetOnlySetting = game.settings.get("only-me-selected", "onlyTarget");

   if (!controlled) { // Triggered when attempting to deselect
      const user = game.user;

      // Check if the user is a player and has the token as a controlled actor
      if (user.isGM) return;  // Allow GMs to bypass this restriction

      if (!token || !token.actor) return;
      // if (!token || !token.actor || token.actor.id !== user.character?.id) return;

      // Check if the player is in combat and has a target selected
      const inCombat = game.combats.some(combat => combat.combatants.some(combatant => combatant.actor.id === token.actor.id && combatant.initiative !== null));

      // const hasTarget = user.targets.size > 0;

      // if (isTargetOnlySetting) {
      //    // If in combat and has a target, prevent deselection
      //    if (inCombat && hasTarget) {
      //       token.control({ releaseOthers: false });
      //       return false;
      //    }
      // } else {

      // }

      if (inCombat) {
         // ui.notifications.warn("You cannot deselect your token while in combat and with a target selected.");
         token.control({ releaseOthers: false });
         return false;
      }

   }


});


